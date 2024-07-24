<?php
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "investment_site";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    $username = $_POST['username'];
    $email = $_POST['email'] ?? null;

    if ($action == 'register') {
        $sql = "SELECT * FROM users WHERE username='$username'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $response['message'] = 'اسم المستخدم موجود بالفعل.';
        } else {
            $sql = "INSERT INTO users (username, email) VALUES ('$username', '$email')";
            if ($conn->query($sql) === TRUE) {
                $response['success'] = true;
                $response['message'] = 'تم التسجيل بنجاح!';
            } else {
                $response['message'] = 'خطأ: ' . $conn->error;
            }
        }
    } elseif ($action == 'login') {
        $sql = "SELECT * FROM users WHERE username='$username'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $response['success'] = true;
            $response['message'] = 'تم تسجيل الدخول بنجاح!';
            session_start();
            $_SESSION['username'] = $username;
        } else {
            $response['message'] = 'اسم المستخدم غير موجود.';
        }
    }
}

$conn->close();
echo json_encode($response);
?>
