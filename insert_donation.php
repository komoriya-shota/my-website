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
$amount = $_POST['amount'];
$message = $_POST['message'];

$sql = "INSERT INTO donations (date, name, email, amount, message) VALUES ('$date', '$name', '$email', '$amount', '$message')";

if ($conn->query($sql) === TRUE) {
    echo "New donation created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
