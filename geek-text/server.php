<?php
	header("Access-Control-Allow-Origin: *");
	
    //Info to connect to DB
	$servername = "localhost";
	$dbusername = "root";
	$dbpassword = "1995";
	$dbname = "geektext_db";

	//what method to execute
	$method = urldecode($_POST['method']);

	$params = null;
	$params_arr = null;
	//Parameters passed
	 if( isset($_POST['params']) )
	 {
		$params = urldecode($_POST['params']);
	 	$params_arr = explode(";", $params);
	 }
	 
	
	//used to create json objects
	$myObj = new \stdClass();
	
	// Create connection
	$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

	// Check connection
	if ($conn->connect_error) 
	{
	    die("connection failed");
	}

	/////////////////////////////////////////////////////////////////////////////
function index(){
	$result = BookList::paginate(10);
return $result;
}




	/////////////////////////////////////

	//Gets and returns the book info the user searched for
	function getSearchInfo()
	{
		//Global allows variables outside the function scope to be used here
		global $conn;
		global $myObj;
		global $params_arr;
		
		
		$keyword = $params_arr[0];
		
		$sql = "SET @SEARCH_TERM = '%$keyword%';";
		
		if ($conn->query($sql) === TRUE) 
		{
			//echo "New record created successfully";
		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

		//Paginate
		// $limit = 10;
		// $sql = "SELECT count(books.TITLE) FROM books";

		// if(isset($_GET{'page'})){
		// 	$page = $_GET{'page'} + 1;
		// 	$offset = $limit * $page;
		// }else{
		// 	$page = 0;
		// 	$offset = 0;
		// }
		// $count = $row[0];
		// $lefts = $count - ($page * $limit);


		$sql = "SELECT  books.COVER, books.TITLE, books.GENRE, books.PUBLISHER, authors.FIRST_NAME, authors.LAST_NAME, books.PUB_DATE,
			  		    books.DESCRIPTION, authors.BIO, books.ISBN, books.ID
				 FROM   books 
				 JOIN   authors ON books.AUTHOR = authors.ID
				 WHERE  authors.FIRST_NAME LIKE @SEARCH_TERM OR
			            authors.LAST_NAME LIKE @SEARCH_TERM OR 
						books.TITLE LIKE @SEARCH_TERM OR
						books.GENRE LIKE @SEARCH_TERM";
		

					//This is for posting in ASC order and then having the function to DESC
		//$queryorder = array('ASC', 'DESC');
		if($params_arr[1] == "ASC"){
			
//$_POST['queryorder'] = 'ASC';
		$sql . "ORDER BY books.TITLE ASC";
		
		}
		else{
			
			//$_POST['queryorder'] = 'DESC';
		$sql . "ORDER BY books.TITLE DESC";
		
		}		
		//This is for posting in ASC order and then having the function to DESC
		// $queryorder = array('ASC', 'DESC');
		// if(!in_array($_POST['queryorder'], $queryorder)){
		// 	print "error 60";
		// $_POST['queryorder'] = 'ASC';
		// $sql . "ORDER BY books	DESC";
		// print "error 62";
		// }
		// else{
		// 	print "error 65";
		// 	$_POST['queryorder'] = 'DESC';
		// $sql += "ORDER BY books ASC";
		// print "error 68";
		// }		

		
		

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
					"bio" => $row["BIO"],
					"isbn" => $row["ISBN"],
					"id" => $row["ID"]
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

		///PAGINATION previous
		// if( $page > 0 ) {
        //     $last = $page - 2;
        //     echo "<a href = \"$_PHP_SELF?page = $last\">Last1</a> |";
        //     echo "<a href = \"$_PHP_SELF?page = $page\">Next2</a>";
        //  }else if( $page == 0 ) {
        //     echo "<a href = \"$_PHP_SELF?page = $page\">Next3</a>";
        //  }else if( $lefts < $limit ) {
        //     $last = $page - 2;
        //     echo "<a href = \"$_PHP_SELF?page = $last\">Last4</a>";
        //  }



		$conn->close();
	}

	function getBookReview()
	{
		//Global allows variables outside the function scope to be used here
		global $conn;
		global $myObj;
		global $params_arr;

		$bookTitle = $params_arr[0];

		$sql = "SET @BOOK_TITLE = '$bookTitle';";

		if ($conn->query($sql) === TRUE) 
		{
			//echo "New record created successfully";
		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

		$sql = "SELECT reviews.rating, reviews.comment, reviews.anon, users.nickname,  TOTAL_RATINGS.total
				FROM   reviews
				JOIN   books ON books.ID = reviews.book_id
				JOIN   users ON reviews.user_id = users.id
				JOIN   
						(SELECT sum(reviews.rating) AS total
						FROM   reviews
						JOIN   books ON books.ID = reviews.book_id
						JOIN   users ON reviews.user_id = users.id
						WHERE  books.TITLE = @BOOK_TITLE) AS TOTAL_RATINGS
				WHERE  books.TITLE = @BOOK_TITLE;";

		//Executes query string
		$result = $conn->query($sql);

		if ($result->num_rows > 0) 
		{
			$json = array();
	    	// convert the data into json object
	    	while($row = $result->fetch_assoc()) 
	    	{
				$bus = array(
					"rating" => $row["rating"],
					"comment" => $row["comment"],
					"nickname" => $row["nickname"],
					"anon" => $row["anon"],
					"total" => $row["total"]
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
		global $params_arr;

		$authorName = $params_arr[0];

		$sql = "SET @AUTHOR_NAME = '$authorName';";

		if ($conn->query($sql) === TRUE) 
		{
			//echo "New record created successfully";
		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

		$sql = "SELECT books.COVER, books.TITLE, books.GENRE, books.PUBLISHER, books.PUB_DATE, books.DESCRIPTION,
					   authors.FIRST_NAME, authors.LAST_NAME, authors.BIO, books.ISBN
				FROM   books
				JOIN   authors ON books.AUTHOR = authors.ID
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
					"bio" => $row["BIO"],
					"isbn" => $row["ISBN"]
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

	function doesUserOwnBook()
	{
		//Global allows variables outside the function scope to be used here
		global $conn;
		global $myObj;
		global $params_arr;

		$bookTitle = urldecode($_POST['title']);
		$userID = intval(urldecode($_POST['userid']));

		$sql = "SET @BOOK_TITLE = '$bookTitle', @USED_ID = '$userID'";
		
		if ($conn->query($sql) === TRUE) 
		{
			
		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

		$sql = "SELECT TITLE
				FROM books JOIN booksowned ON booksowned.book_id = books.id
				WHERE booksowned.user_id = @USED_ID AND books.title = @BOOK_TITLE";

		//Executes query string
		$result = $conn->query($sql);

		
		if ($result->num_rows == 1){
			echo "true";
		}
		else{
			echo "false";
		}
		
		/* Julian backup
		if ($result->num_rows == 0) 
		{
			$json = array();
	    	// convert the data into json object
	    	while($row = $result->fetch_assoc()) 
	    	{
				$bus = array(
					"title" => $row["TITLE"]
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
		*/



		$conn->close();
	}

	//Gets and returns the book info the user searched for
	function topSearchInfo()
	{
		//Global allows variables outside the function scope to be used here
		global $conn;
		global $myObj;
		global $params_arr;
		
		
		$keyword = $params_arr[0];
		
		$sql = "SET @SEARCH_TERM = '%$top%';";
		
		if ($conn->query($sql) === TRUE) 
		{
			//echo "New record created successfully";
		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

			
		$sql = "SELECT books.COVER, books.TITLE, books.GENRE, books.PUBLISHER, authors.FIRST_NAME, authors.LAST_NAME, books.PUB_DATE,
			  		    books.DESCRIPTION, authors.BIO, books.ISBN, books.ID
				 FROM   books 
				 JOIN   authors ON books.AUTHOR = authors.ID
				 WHERE  authors.FIRST_NAME LIKE @SEARCH_TERM OR
			            authors.LAST_NAME LIKE @SEARCH_TERM OR 
						books.TITLE LIKE @SEARCH_TERM OR
						books.GENRE LIKE @SEARCH_TERM
				ORDER BY books.TITLE LIMIT 3";
		

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
					"bio" => $row["BIO"],
					"isbn" => $row["ISBN"],
					"id" => $row["ID"]
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

		$comment =  urldecode($_POST['comment']); 
		$rating =  intval(urldecode($_POST['rating'])); 
		$book_id =  intval(urldecode($_POST['book_id'])); 
		$user_id =  intval(urldecode($_POST['user_id'])); 
		$anon =  urldecode($_POST['anon']); 
		
		if (empty($comment)){
			$comment = NULL;
		}
		if ($anon == 'true'){
			$anon = 1;
		}
		else if ($anon == 'false'){
			$anon = 0;
		}
		else {
			echo "anon not read";
		}

		$sql = "INSERT INTO `reviews` (`comment`, `rating`, `book_id`, `user_id`,`anon`)
					VALUES 
					('$comment','$rating','$book_id','$user_id','$anon')";


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

		$password = md5($password);

		$sql = "SET @USERNAME = '$username', @PASSWORD = '$password'";
		
		if ($conn->query($sql) === TRUE) 
		{

		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
        
        $sql = "SELECT USERS.username, USERS.password, USERS.id, USERS.home_address_id
                FROM USERS
				WHERE USERS.username = @USERNAME AND USERS.password = @PASSWORD";
        
		$result = $conn->query($sql);
        
        if ($result->num_rows > 0)
        {
            $json = array();
            
            while($row = $result->fetch_assoc())
            {
                $bus = array(
                             "username" => $row["username"],
							 "password" => $row["password"],
							 "id" => $row["id"], 
							 "home_address_id" => $row["home_address_id"]
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

	function getUserInfo() {
        global $conn;
        global $myObj;
        
        $currentUserId = urldecode($_POST['currentUserId']);

		$sql = "SET @CURRENT_USER = '$currentUserId'";
		
		if ($conn->query($sql) === TRUE) 
		{

		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
        
        $sql = "SELECT USERS.username, USERS.fname, USERS.lname, USERS.nickname, USERS.email, USERS.password
                FROM USERS
				WHERE USERS.id = @CURRENT_USER";

		$result = $conn->query($sql);
        
        if ($result->num_rows > 0)
        {
            $json = array();
            
            while($row = $result->fetch_assoc())
            {
                $bus = array(
                             "username" => $row["username"],
                             "fname" => $row["fname"],
                             "lname" => $row["lname"],
                             "nickname" => $row["nickname"],
                             "email" => $row["email"],
                             "password" => $row["password"],
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
	
	function updateUserInfo() {
		global $conn;
        global $myObj;
        
		$currentUserId = urldecode($_POST['currentUserId']);

		$username = urldecode($_POST['username']);
		$firstname = urldecode($_POST['firstname']);
		$lastname = urldecode($_POST['lastname']);
		$nickname = urldecode($_POST['nickname']);
		$email = urldecode($_POST['email']);
		$password = urldecode($_POST['password']);

		$password = md5($password);

		$sql = "SET @CURRENT_USER = '$currentUserId'";

		if ($conn->query($sql) === TRUE) 
		{

		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

		$sql = "UPDATE USERS
				SET USERS.username = '$username',  USERS.fname ='$firstname', USERS.lname = '$lastname', USERS.nickname = '$nickname', USERS.email = '$email',
				USERS.password = '$password'
				WHERE USERS.id = @CURRENT_USER";

		$result = $conn->query($sql);

		echo $result;

		$conn->close();
	}
    
    function getAddresses() {
        global $conn;
        global $myObj;
        
        $currentUserId = urldecode($_POST['currentUserId']);

		$sql = "SET @CURRENT_USER = '$currentUserId'";
		
		if ($conn->query($sql) === TRUE) 
		{

		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
        
        $sql = "SELECT ADDRESS.address_id, ADDRESS.name, ADDRESS.address, ADDRESS.address_2, ADDRESS.city, ADDRESS.state, ADDRESS.zip_code, ADDRESS.country, ADDRESS.phone, ADDRESS.is_home_address
                FROM USERS, ADDRESS
				WHERE USERS.id = @CURRENT_USER AND USERS.id = ADDRESS.user_id";
        
		$result = $conn->query($sql);
        
        if ($result->num_rows > 0)
        {
            $json = array();
            
            while($row = $result->fetch_assoc())
            {
                $bus = array(
							 "address_id" => $row["address_id"],
                             "name" => $row["name"],
                             "address" => $row["address"],
							 "address_2" => $row["address_2"],
							 "city" => $row["city"],
							 "state" => $row["state"],
							 "zip_code" => $row["zip_code"],
							 "country" => $row["country"],
							 "phone" => $row["phone"],
							 "is_home_address" => $row["is_home_address"]
                             );
                
                array_push($json, $bus);
                
            }
            
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
        else
        {
            echo "No existing addresses for user";
        }
        
        $conn->close();
	}

	function addAddress() {
        global $conn;
        global $myObj;
        
        $currentUserId = urldecode($_POST['currentUserId']);

		$name = urldecode($_POST['name']);
		$address = urldecode($_POST['address']);
		$address_2 = urldecode($_POST['address_2']);
		$city = urldecode($_POST['city']);
		$state = urldecode($_POST['state']);
		$zip_code = urldecode($_POST['zip_code']);
		$country = urldecode($_POST['country']);
		$phone = urldecode($_POST['phone']);

		$sql = "INSERT INTO address (USER_ID, NAME, ADDRESS, ADDRESS_2, CITY, STATE, ZIP_CODE, COUNTRY, PHONE, IS_HOME_ADDRESS) 
				VALUES($currentUserId, '$name', '$address', '$address_2', '$city', '$state', '$zip_code', '$country', '$phone', 'false')";
		
		$result = $conn->query($sql);

		echo $result;

		$conn->close();
	}
	
	function deleteAddress() {
		global $conn;
        global $myObj;
        
		$addressId = urldecode($_POST['address_id']);
		$currentUserId = urldecode($_POST['currentUserId']);

		$sql = "SET @CURRENT_ADDRESS = '$addressId', @CURRENT_USER = '$currentUserId'";
		
		if ($conn->query($sql) === TRUE) 
		{

		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
		
		$sql = "DELETE FROM ADDRESS
				WHERE ADDRESS.address_id = @CURRENT_ADDRESS AND ADDRESS.user_id = @CURRENT_USER";

		$result = $conn->query($sql);

		echo $result;

		$conn->close();
	}

	function setHomeAddress() {
		global $conn;
        global $myObj;
        
		$addressId = urldecode($_POST['address_id']);
		$currentUserId = urldecode($_POST['currentUserId']);
		$prevHomeAddress = urldecode($_POST['prevHomeAddress']);

		$sql = "SET @CURRENT_ADDRESS = '$addressId', @CURRENT_USER = '$currentUserId', @PREV_ADDRESS = '$prevHomeAddress'";
		
		if ($conn->query($sql) === TRUE) 
		{

		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

		$sql = "UPDATE ADDRESS
				SET ADDRESS.is_home_address = FALSE
				WHERE @PREV_ADDRESS is not null AND ADDRESS.address_id = @PREV_ADDRESS AND ADDRESS.user_id = @CURRENT_USER";

		if ($conn->query($sql) === TRUE) 
		{
			echo $sql;
		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

		$sql = "UPDATE ADDRESS
				SET ADDRESS.is_home_address = TRUE
				WHERE ADDRESS.address_id = @CURRENT_ADDRESS AND ADDRESS.user_id = @CURRENT_USER";

		if ($conn->query($sql) === TRUE) 
		{

		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

		$sql = "UPDATE USERS
				SET USERS.home_address_id = @CURRENT_ADDRESS
				WHERE USERS.id = @CURRENT_USER;";

		$result = $conn->query($sql);

		echo $result;

		$conn->close();
	}

	function updateAddress() {
		global $conn;
        global $myObj;
        
		$addressId = urldecode($_POST['address_id']);
		$currentUserId = urldecode($_POST['currentUserId']);
		
		$name = urldecode($_POST['name']);
		$address = urldecode($_POST['address']);
		$address_2 = urldecode($_POST['address_2']);
		$city = urldecode($_POST['city']);
		$state = urldecode($_POST['state']);
		$zip_code = urldecode($_POST['zip_code']);
		$country = urldecode($_POST['country']);
		$phone = urldecode($_POST['phone']);

		$sql = "SET @CURRENT_ADDRESS = '$addressId', @CURRENT_USER = '$currentUserId'";
		
		if ($conn->query($sql) === TRUE) 
		{

		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}

		$sql = "INSERT INTO address (USER_ID, NAME, ADDRESS, ADDRESS_2, CITY, STATE, ZIP_CODE, COUNTRY, PHONE, IS_HOME_ADDRESS) 
				VALUES($currentUserId, '$name', '$address', '$address_2', '$city', '$state', '$zip_code', '$country', '$phone', 'false')";

		$sql = "UPDATE ADDRESS
				SET ADDRESS.name = '$name' AND ADDRESS.address ='$address' AND ADDRESS.address_2 = '$address_2' AND ADDRESS.city = '$city' AND ADDRESS.state = '$state'
				ADDRESS.zip_code = '$zip_code' AND ADDRESS.country = '$country' AND ADDRESS.phone '$phone'
				WHERE ADDRESS.address_id = @CURRENT_ADDRESS AND ADDRESS.user_id = @CURRENT_USER";


		$result = $conn->query($sql);

		echo $result;

		$conn->close();
	}
	
	function getPaymentMethods() {
        global $conn;
        global $myObj;
        
        $currentUserId = urldecode($_POST['currentUserId']);

		$sql = "SET @CURRENT_USER = '$currentUserId'";
		
		if ($conn->query($sql) === TRUE) 
		{

		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
        
        $sql = "SELECT PAYMENT.payment_id, PAYMENT.card_type, PAYMENT.card_name, PAYMENT.card_num, PAYMENT.exp_date, 
				PAYMENT.address, PAYMENT.city, PAYMENT.state, PAYMENT.country, PAYMENT.zip_code, PAYMENT.phone
                FROM USERS, PAYMENT
				WHERE USERS.id = @CURRENT_USER AND USERS.id = PAYMENT.user_id";
        
		$result = $conn->query($sql);
        
        if ($result->num_rows > 0)
        {
            $json = array();
            
            while($row = $result->fetch_assoc())
            {
                $bus = array(
                             "payment_id" => $row["payment_id"],
                             "card_type" => $row["card_type"],
                             "card_name" => $row["card_name"],
                             "card_num" => $row["card_num"],
							 "exp_date" => $row["exp_date"],
							 "zip_code" => $row["zip_code"],
							 "address" => $row["address"],
							 "city" => $row["city"],
							 "state" => $row["state"],
							 "country" => $row["country"],
							 "phone" => $row["phone"],
                             );
                
                array_push($json, $bus);
                
            }
            
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
        else
        {
            echo "No existing payment methods for user";
        }
        
        $conn->close();
	}

	function addPaymentMethods() {
        global $conn;
        global $myObj;
        
        $currentUserId = urldecode($_POST['currentUserId']);

		$card_type = urldecode($_POST['card_type']);
		$card_name = urldecode($_POST['card_name']);
		$card_num = urldecode($_POST['card_num']);
		$security_code = urldecode($_POST['security_code']);
		$exp_date = urldecode($_POST['exp_date']);
		$zip_code = urldecode($_POST['zip_code']);
		$address = urldecode($_POST['address']);
		$city = urldecode($_POST['city']);
		$state = urldecode($_POST['state']);
		$country = urldecode($_POST['country']);
		$phoneNumber = urldecode($_POST['phone_num']);

		$sql = "INSERT INTO payment (USER_ID, CARD_TYPE, CARD_NAME, CARD_NUM, SECURITY_CODE, EXP_DATE, ZIP_CODE, ADDRESS, CITY, STATE, COUNTRY, PHONE) 
				VALUES('$currentUserId', '$card_type', '$card_name', '$card_num', '$security_code', '$exp_date', '$zip_code', '$address', '$city', '$state', '$country', '$phoneNumber')";
		
		$result = $conn->query($sql);

		echo $result;

		$conn->close();
	}
	
	function deletePaymentMethod() {
		global $conn;
        global $myObj;
        
		$paymentId = urldecode($_POST['paymentId']);
		$currentUserId = urldecode($_POST['currentUserId']);

		$sql = "SET @CURRENT_PAYMENT = '$paymentId', @CURRENT_USER = '$currentUserId'";
		
		if ($conn->query($sql) === TRUE) 
		{

		} 
		else 
		{
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
		
		$sql = "DELETE FROM PAYMENT
				WHERE PAYMENT.payment_id = @CURRENT_PAYMENT AND PAYMENT.user_id = @CURRENT_USER";

		$result = $conn->query($sql);

		echo $result;

		$conn->close();
	}

	if ($method == 'getSearchInfo')
	{
		getSearchInfo();
	}
	else if ($method == 'topSearchInfo')
	{
		topSearchInfo();
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
	else if ($method == 'getBookReview')
    {
        getBookReview();
	}
	else if ($method == 'doesUserOwnBook')
    {
        doesUserOwnBook();
	} 
	else if ($method == 'getAddresses') 
	{
		getAddresses();
	}
	else if ($method == 'addAddress') 
	{
		addAddress();
	}
	else if ($method == 'getPaymentMethods') 
	{
		getPaymentMethods();
	}
	else if ($method == 'addPaymentMethods') 
	{
		addPaymentMethods();
	}
	else if ($method == 'deletePaymentMethod') 
	{
		deletePaymentMethod();
	}
	else if ($method == 'setHomeAddress') 
	{
		setHomeAddress();
	}
	else if ($method == 'updateAddress') 
	{
		updateAddress();
	}
	else if ($method == 'getUserInfo') 
	{
		getUserInfo();
	}
	else if ($method == 'updateUserInfo') 
	{
		updateUserInfo();
	}
	

?>
