<?php
// Set up mySql database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guvitask";

// Set up MongoDB Connection
require '../vendor/autoload.php'; // Include Composer's autoloader

// Establishing the MySql Connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$username = $_POST["username"];
	$email = $_POST["email"];
	$password = $_POST["password"];

	// Check if email is already registered
	$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
	$stmt->bind_param("s", $email);
	$stmt->execute();
	$result = $stmt->get_result();

	if ($result->num_rows > 0) {
		echo "This email address is already registered";
	} else {
		// Hash the password
		$hashed_password = password_hash($password, PASSWORD_DEFAULT);

		// Prepare and bind statement
		$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
		$stmt->bind_param("sss", $username, $email, $hashed_password);

		// Execute statement
		$stmt->execute();


	// After successfull inserting data into mysl we will insert userEmail in mongoDB
	// Create a new MongoDB client
	$client = new MongoDB\Client("mongodb://localhost:27017");
	
	// Select a database
	$database = $client->guvitask;

	// Select a collection
	$collection = $database->users;
	
	$user = [
		'email'=>$_POST["email"],
		'age'=>"",
		'dob'=>"",
		"phone"=>"",
		'created_at' => new MongoDB\BSON\UTCDateTime()
	];

	// Insert the user into the collection
	$result = $collection->insertOne($user);
	echo "Registration successful";
	}

	// Close statement and connection
	$stmt->close();
	$conn->close();
}

?>
