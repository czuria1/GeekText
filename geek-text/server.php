<?php
	header("Access-Control-Allow-Origin: *");
	
    //Info to connect to DB
	$servername = "localhost";
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

		$sql = "SELECT  books.TITLE, books.GENRE, books.PUBLISHER, authors.FIRST_NAME, authors.LAST_NAME, books.PUB_DATE,
			  		    books.DESCRIPTION, books.RATING
				 FROM   books 
				 JOIN   authors ON books.AUTHOR = authors.ID
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
					"title" => $row["TITLE"],
					"author" => $row["LAST_NAME"]. " " .$row["FIRST_NAME"],
					"genre" => $row["GENRE"],
					"publisher" => $row["PUBLISHER"],
					"pub_date" => $row["PUB_DATE"],
					"description" => $row["DESCRIPTION"],
					"rating" => $row["RATING"]
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

		$sql = "SELECT books.TITLE, books.GENRE, books.PUBLISHER, books.PUB_DATE, books.DESCRIPTION, books.RATING
				FROM   books
				JOIN   authors ON books.AUTHOR = authors.ID
				WHERE  concat(AUTHORS.LAST_NAME, ' ', AUTHORS.FIRST_NAME) = @AUTHOR_NAME;";


		//Executes query string
		$result = $conn->query($sql);

		if ($result->num_rows > 0) 
		{
			$json = array();
	    	// convert the data into json object
	    	while($row = $result->fetch_assoc()) 
	    	{
				$bus = array(
					"title" => $row["TITLE"],
					"genre" => $row["GENRE"],
					"publisher" => $row["PUBLISHER"],
					"pub_date" => $row["PUB_DATE"],
					"description" => $row["DESCRIPTION"],
					"rating" => $row["RATING"]
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

	if ($method == 'getSearchInfo')
	{
		getSearchInfo();
	}
	else if ($method == 'getAllBooksFromAuthor')
	{
		getAllBooksFromAuthor();
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