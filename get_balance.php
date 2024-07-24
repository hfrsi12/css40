<?php
session_start();

$response = ['success' => false, 'balance' => 0.00];

if (!isset($_SESSION['username'])) {
    $response['message'] = 'يجب عليك تسجيل الدخول.';
    echo json_encode($response);
    exit();
}

$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "investment_site";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    $response['message'] = "فشل الاتصال: " . $conn->connect_error;
    echo json_encode($response);
    exit();
}

$username = $_SESSION['username'];

$sql = "SELECT balance FROM users WHERE username='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response['success'] = true;
    $response['balance'] = $row['balance'];
} else {
    $response['message'] = 'خطأ في جلب بيانات المستخدم.';
}

$conn->close();
echo json_encode($response);
?>
