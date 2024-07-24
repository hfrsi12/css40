<?php
session_start();

$response = ['success' => false, 'message' => ''];

if (!isset($_SESSION['username'])) {
    $response['message'] = 'يجب عليك تسجيل الدخول لطلب السحب.';
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
$trc20Address = $_POST['trc20Address'];
$withdrawalAmount = $_POST['withdrawalAmount'];

$sql = "SELECT balance FROM users WHERE username='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $balance = $row['balance'];

    if ($balance >= $withdrawalAmount) {
        $newBalance = $balance - $withdrawalAmount;
        $sql = "UPDATE users SET balance='$newBalance' WHERE username='$username'";
        if ($conn->query($sql) === TRUE) {
            $sql = "INSERT INTO withdrawals (username, amount, address, status, timestamp) VALUES ('$username', '$withdrawalAmount', '$trc20Address', 'pending', NOW())";
            if ($conn->query($sql) === TRUE) {
                $response['success'] = true;
                $response['message'] = 'تم تقديم طلب السحب بنجاح. يتم الآن انتظار موافقة الإدارة.';
            } else {
                $response['message'] = 'خطأ في تقديم طلب السحب: ' . $conn->error;
            }
        } else {
            $response['message'] = 'خطأ في تحديث الرصيد: ' . $conn->error;
        }
    } else {
        $response['message'] = 'عذرًا، رصيدك الحالي غير كافٍ للسحب.';
    }
} else {
    $response['message'] = 'خطأ في جلب بيانات المستخدم.';
}

$conn->close();
echo json_encode($response);
?>
