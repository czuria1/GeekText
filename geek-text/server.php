<?php
	header("Access-Control-Allow-Origin: *");
	
    //Info to connect to DB
	$servername = "localhost";
	$dbusername = "root";
	$dbpassword = "May1993!";
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
		
						


		//This is for posting in ASC order and then having the function to DESC
		$queryorder = array('ASC', 'DESC');
		if(!in_array($_POST['queryorder'], $queryorder)){
			print "error 60";
		$_POST['queryorder'] = 'ASC';
		$sql . "ORDER BY books	DESC";
		print "error 62";
		}
		else{
			print "error 65";
			$_POST['queryorder'] = 'DESC';
		$sql += "ORDER BY books ASC";
		print "error 68";
		}

		


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
					"rating" => $row["RATING"],
					//"price" => $row["PRICE: $"],
					//"inventory" => $row["Inventory"],
			//order by and page
				//What happened to the page code?????????	

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


	// function getDESCInfo()
	// {
	// 	//Global allows variables outside the function scope to be used here
	// 	global $conn;
	// 	global $myObj;
		
		
	// 	$keyword = urldecode($_POST['searchParam']);

	// 	$sql = "SET @SEARCH_TERM = '%$keyword%';";

	// 	if ($conn->query($sql) === TRUE) 
	// 	{
	// 		//echo "New record created successfully";
	// 	} 
	// 	else 
	// 	{
	// 		echo "Error: " . $sql . "<br>" . $conn->error;
	// 	}

	// 	$sql = "SELECT  books.TITLE, books.GENRE, books.PUBLISHER, authors.FIRST_NAME, authors.LAST_NAME, books.PUB_DATE,
	// 		  		    books.DESCRIPTION, books.RATING
	// 			 FROM   books 
	// 			 JOIN   authors ON books.AUTHOR = authors.ID
	// 			 WHERE  authors.FIRST_NAME LIKE @SEARCH_TERM OR
	// 		            authors.LAST_NAME LIKE @SEARCH_TERM OR 
	// 					books.TITLE LIKE @SEARCH_TERM OR
	// 					books.GENRE LIKE @SEARCH_TERM
	// 			ORDER BY books	DESC;"



	// 	//This is for posting in ASC order and then having the function to DESC
	// 	$queryorder = array('ASC', 'DESC');
	// 	if(!in_array($_POST['queryorder'], $queryorder)){
	// 	$_POST['queryorder'] = 'ASC';
	// 	}


	// 	//Executes query string
	// 	$result = $conn->query($sql);
	// 	//Im making the page number between 10 and 20
	// 	if ($result->num_rows > 0) 
	// 	{
	// 		$json = array();
	//     	// convert the data into json object
	//     	while($row = $result->fetch_assoc()) 
	//     	{
	// 			$bus = array(
	// 				"title" => $row["TITLE"],
	// 				"author" => $row["LAST_NAME"]. " " .$row["FIRST_NAME"],
	// 				"genre" => $row["GENRE"],
	// 				"publisher" => $row["PUBLISHER"],
	// 				"pub_date" => $row["PUB_DATE"],
	// 				"description" => $row["DESCRIPTION"],
	// 				"rating" => $row["RATING"],
	// 		//order by and page
					

	// 			);

	// 			array_push($json, $bus);
				
	// 		}

	// 		$jsonstring = json_encode($json);
	// 		echo $jsonstring;
	// 	}
	// 	else
	// 	{
	// 	    echo "0 results";
	// 	}


	// 	$conn->close();
	// }

	if ($method == 'getSearchInfo')
	{
		getSearchInfo();
	}

	// if ($method == 'getDescInfo')
	// {
	// 	getDESCInfo();
	// }
	


?>