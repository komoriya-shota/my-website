<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "crowdfunding";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$date = date("Y-m-d H:i:s");
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$sql = "INSERT INTO contacts (date, name, email, message) VALUES ('$date', '$name', '$email', '$message')";

if ($conn->query($sql) === TRUE) {
    echo "New contact created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
