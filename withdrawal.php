<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_POST['user_id'];
    $amount = $_POST['amount'];

    // Check if user has sufficient balance
    $sql_balance = "SELECT balance FROM users WHERE id = $user_id";
    $result = $conn->query($sql_balance);
    $row = $result->fetch_assoc();
    
    if ($row['balance'] >= $amount) {
        $sql = "INSERT INTO withdrawals (user_id, amount) VALUES ('$user_id', '$amount')";
        
        if ($conn->query($sql) === TRUE) {
            // Update user balance
            $sql_update = "UPDATE users SET balance = balance - $amount WHERE id = $user_id";
            $conn->query($sql_update);
            echo "Withdrawal successful";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Insufficient balance";
    }

    $conn->close();
}
?>
