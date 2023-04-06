<?php
require '../vendor/autoload.php';

$client = new MongoDB\Client("mongodb://localhost:27017");// Connect to MongoDB

//  database
$database = $client->guvitask;
// colllection
$collection = $database->users;


if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$age = $_POST["age"];
	$dob = $_POST["dob"];
	$phone = $_POST["phone"];
	$email = $_POST["email"];

    // echo $age,$dob,$phone,$email;
    // validationsss
    if (empty($email) || empty($dob) || empty($phone) || empty($email)) {
    die('Please enter all fields.');
    }

    $updateResult = $collection->updateOne(
    ['email' => $email],
    ['$set' => ['age' => $age, 'dob' => $dob, 'phone' => $phone]] 
    );

    // echo $updateResult->getModifiedCount();
        if ($updateResult->getModifiedCount() === 1) {
        echo 'Document updated successfully.';
        } else {
        echo 'Failed to update document.';
        }
    }
?>