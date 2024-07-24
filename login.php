<?php
include 'db.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        
        // Log activity
        $sql_activity = "INSERT INTO activities (user_id, activity_type) VALUES ('{$user['id']}', 'Login')";
        $conn->query($sql_activity);
        
        echo "Login successful";
    } else {
        echo "Invalid credentials";
    }

    $conn->close();
}
?>
