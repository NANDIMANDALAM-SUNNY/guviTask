<?php
require '../vendor/autoload.php';
$redis = new Predis\Client();

// retrieve email and password from POST request
$email = $_POST['email'];
$password = $_POST['password'];

// validate input
if (empty($email) || empty($password)) {
  die('Invalid email or password.');
}

// connect to MySQL database
$servername = 'localhost';
$usernames = 'root';
$passwordd = '';
$dbname = 'guvitask';

$conn = new mysqli($servername, $usernames, $passwordd, $dbname);
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// prepare SQL statement to select user with given email
$stmt = $conn->prepare('SELECT password FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();

$result = $stmt->get_result();

// check if user exists in database
if ($result->num_rows == 0) {
  die('User not found.');
  echo "User not found.";
}

// get hashed password from database
$row = $result->fetch_assoc();
$hashed_password = $row['password'];

// verify password
if (password_verify($password, $hashed_password)) {
  // generate unique session ID
  $session_id = uniqid();

  // store session ID in Redis
  $redis->set('session:' . $session_id, $email);

  // set session ID as cookie
  setcookie('session_id', $session_id, time() + 3600, '/');
  echo 'success';
} else {
  echo 'Invalid password.';
}

$stmt->close();
$conn->close();
?>
