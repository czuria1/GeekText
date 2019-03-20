<?php
	header("Access-Control-Allow-Origin: *");
	
    //Info to connect to DB
	$servername = "localhost";
	$dbusername = "root";
	$dbpassword = "password";
	$dbname = "geektext_db";

	//what method to execute
	$method = urldecode($_POST['method']);
	
	//used to create json objects
	$myObj = new \stdClass();
	
	// Create connection
	$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

	// Check connection
	if ($conn->connect_error) 
	{
	    die("connection failed");
	}

	//Gets and returns the book info the user searched for
	function getSearchInfo()
	{
		
		//Global allows variables outside the function scope to be used here
		global $conn;
		global $myObj;
		
		
		$keyword = urldecode($_POST['searchParam']);
		
		$sql = "SET @SEARCH_TERM = '%$keyword%';";
		
		if ($conn->query($sql) === TRUE) 
		{
			//echo "New record created successfully";
		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

		$sql = "SELECT  books.COVER, books.TITLE, books.GENRE, books.PUBLISHER, authors.FIRST_NAME, authors.LAST_NAME, books.PUB_DATE,
			  		    books.DESCRIPTION, books.RATING, authors.BIO, books.ISBN, reviews.rating, reviews.comment
				 FROM   books 
				 JOIN   authors ON books.AUTHOR = authors.ID
				 JOIN	reviews ON books.id = reviews.book_id
				 WHERE  authors.FIRST_NAME LIKE @SEARCH_TERM OR
			            authors.LAST_NAME LIKE @SEARCH_TERM OR 
						books.TITLE LIKE @SEARCH_TERM OR
						books.GENRE LIKE @SEARCH_TERM";
		
						


		
		

		//Executes query string
		$result = $conn->query($sql);
		//Im making the page number between 10 and 20
		if ($result->num_rows > 0) 
		{
			$json = array();
	    	// convert the data into json object
	    	while($row = $result->fetch_assoc()) 
	    	{
				$bus = array(
					"cover" => $row["COVER"],
					"title" => $row["TITLE"],
					"author" => $row["FIRST_NAME"]. " " .$row["LAST_NAME"],
					"genre" => $row["GENRE"],
					"publisher" => $row["PUBLISHER"],
					"pub_date" => $row["PUB_DATE"],
					"description" => $row["DESCRIPTION"],
					"rating" => $row["RATING"],
					"bio" => $row["BIO"],
					"isbn" => $row["ISBN"],
					"rating" => $row["rating"],
					"comment" => $row["comment"]
				);

				array_push($json, $bus);
				
			}

			$jsonstring = json_encode($json);
			echo $jsonstring;
		}
		else
		{
		    echo "0 results";
		}


		$conn->close();
	}

	function getAllBooksFromAuthor()
	{
		//Global allows variables outside the function scope to be used here
		global $conn;
		global $myObj;

		$authorName = urldecode($_POST['searchParam']);

		$sql = "SET @AUTHOR_NAME = '$authorName';";

		if ($conn->query($sql) === TRUE) 
		{
			//echo "New record created successfully";
		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

		$sql = "SELECT books.COVER, books.TITLE, books.GENRE, books.PUBLISHER, books.PUB_DATE, books.DESCRIPTION, books.RATING,
					   authors.FIRST_NAME, authors.LAST_NAME, authors.BIO, books.ISBN, reviews.rating, reviews.comment
				FROM   books
				JOIN   authors ON books.AUTHOR = authors.ID
				JOIN   reviews ON books.id = reviews.book_id
				WHERE  concat(AUTHORS.FIRST_NAME, ' ', AUTHORS.LAST_NAME) = @AUTHOR_NAME;";



		//Executes query string
		$result = $conn->query($sql);
		if ($result->num_rows > 0) 
		{
			$json = array();
	    	// convert the data into json object
	    	while($row = $result->fetch_assoc()) 
	    	{
				$bus = array(
					"cover" => $row["COVER"],
					"title" => $row["TITLE"],
					"author" => $row["FIRST_NAME"]. " " .$row["LAST_NAME"],
					"genre" => $row["GENRE"],
					"publisher" => $row["PUBLISHER"],
					"pub_date" => $row["PUB_DATE"],
					"description" => $row["DESCRIPTION"],
					"rating" => $row["RATING"],
					"bio" => $row["BIO"],
					"isbn" => $row["ISBN"],
					"rating" => $row["rating"],
					"comment" => $row["comment"]
				);

				array_push($json, $bus);
				
			}

			$jsonstring = json_encode($json);
			echo $jsonstring;
		}
		else
		{
		    echo "0 results";
		}


		$conn->close();
	}

	function submitReview()
	{
		
		//Global allows variables outside the function scope to be used here
		global $conn;
		global $myObj;

		$review =  urldecode($_POST['review']); 
		$rating =  intval(urldecode($_POST['rating'])); 
		
		// Rating is -1 by default
		//echo ("Review = " + $review + " Rating = " + $rating);
		//if ($rating == -1) { array_push($errors, "Please select a rating"); }

		if (empty($review)){
			$sql = "INSERT INTO reviews (comment,rating)
					VALUES 
					(NULL,'$rating')";
		}
		else {
			$sql = "INSERT INTO reviews (comment,rating)
					VALUES 
					('$review','$rating')";
		}

		//Executes query string
		if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
		
		$conn->close();

	}

	function loginUser() {
        global $conn;
        global $myObj;
        
        $username = urldecode($_POST['username']);
        $password = urldecode($_POST['password']);
        
        $sql = "SELECT (USERNAME, FNAME, LNAME, NICKNAME, EMAIL, PASSWORD)
                VALUES('$username', '$firstname', '$lastname', '$nickname', '$email', '$password')
                FROM USERS
                WHERE USERS.username = username AND USERS.password = password";
        
        if (empty($username)) { array_push($errors, "Username is required"); }
        if (empty(password)) { array_push($errors, "Password is required"); }
        
        if (count($errors) == 0) {
            $password = md5($password);
        }
        
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0)
        {
            $json = array();
            
            while($row = $result->fetch_assoc())
            {
                $bus = array(
                             "username" => $row["USERNAME"],
                             "fname" => $row["FNAME"],
                             "lname" => $row["LNAME"],
                             "nickname" => $row["NICKNAME"],
                             "EMAIL" => $row["EMAIL"],
                             "PASSWORD" => $row["PASSWORD"],
                             );
                
                array_push($json, $bus);
                
            }
            
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
        else
        {
            echo "No such user exists";
        }
        
        $conn->close();
    }

	function registerUser()
	{

		global $conn;
		global $myObj;

		$username = urldecode($_POST['username']);
		$firstname = urldecode($_POST['firstname']);
		$lastname = urldecode($_POST['lastname']);
		$nickname = urldecode($_POST['nickname']);
		$email = urldecode($_POST['email']);
		$password_1 = urldecode($_POST['password_1']);
		$password_2 = urldecode($_POST['password_2']);

		if (empty($username)) { array_push($errors, "Username is required"); }
		if (empty($firstname)) { array_push($errors, "First name is required"); }
		if (empty($lastname)) { array_push($errors, "Last name is required"); }
		if (empty($email)) { array_push($errors, "Email is required"); }
		if (empty($password_1)) { array_push($errors, "Password is required"); }
		if ($password_1 != $password_2) {
			array_push($errors, "Your passwords do not match");
		}

		if (count($errors) == 0) {
			$password = md5($password_1);
		}

		$sql = "INSERT INTO users (USERNAME, FNAME, LNAME, NICKNAME, EMAIL, PASSWORD) 
				VALUES('$username', '$firstname', '$lastname', '$nickname', '$email', '$password')";
		
		$result = $conn->query($sql);

		$conn->close();
	}
    
    

	if ($method == 'getSearchInfo')
	{
		getSearchInfo();
	}
	else if ($method == 'registerUser') 
	{
		registerUser();
	}
	else if ($method == 'getAllBooksFromAuthor')
	{
		getAllBooksFromAuthor();
	}
	else if ($method == 'submitReview')
	{	
		submitReview();
	}
    else if ($method == 'loginUser')
    {
        loginUser();
    }
	

/** 
	$page = 1;
	$items_page = 10;
	$offset = ($items_page * ($page - 1));
		$sql = "SELECT *
				FROM books
				LIMIT".$offset.",". $items_page;
*/
?>
