<?php
    header("Access-Control-Allow-Origin: *");

    //Info to connect to DB
	$servername = "localhost";
	$dbusername = "jyepe";
	$dbpassword = "9373yepe";
	$dbname = "geektext_db";

	//what method to execute
	$method = urldecode($_POST['method']) ;
	
	// Create connection
	$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

	// Check connection
	if ($conn->connect_error) 
	{
	    die("connection failed");
	}
	else{
		echo 'good';
	}

?>