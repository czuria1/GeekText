<?php
	header("Access-Control-Allow-Origin: *");
	
    //Info to connect to DB
	$servername = "localhost";
	$dbusername = "jyepe";
	$dbpassword = "9373yepe";
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

		$sql = "SELECT books.TITLE, books.GENRE, books.PUBLISHER, authors.FIRST_NAME, authors.LAST_NAME 
				FROM books 
				JOIN authors ON books.AUTHOR = authors.ID";

		//Executes query string
		$result = $conn->query($sql);

		if ($result->num_rows > 0) 
		{
			$json = array();
	    	// convert the data into json object
	    	while($row = $result->fetch_assoc()) 
	    	{
				/*
				$myObj->title = $row["TITLE"];
				$myObj->genre = $row["GENRE"];
				$myObj->publisher = $row["PUBLISHER"];
				$myObj->fname = $row["LAST_NAME"];
				$myObj->lname = $row["FIRST_NAME"];

				$myJSON = json_encode($myObj);
				echo $myJSON . "\n";
				*/

				$bus = array(
					"title" => $row["TITLE"],
					"genre" => $row["GENRE"]
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

?>