<?php
session_start();

if (!isset($_SESSION['username'])) {
    echo json_encode(['success' => false, 'message' => 'يجب عليك تسجيل الدخول لإيداع الأموال.']);
    exit();
}

$amount = $_POST['amount'];
$trc20Address = $_POST['trc20Address'];

// اتصال بقاعدة البيانات وتحديث رصيد المستخدم

echo json_encode(['success' => true, 'message' => 'تم الإيداع بنجاح!']);
?>

<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_POST['user_id'];
    $amount = $_POST['amount'];

    $sql = "INSERT INTO deposits (user_id, amount) VALUES ('$user_id', '$amount')";
    
    if ($conn->query($sql) === TRUE) {
        // Update user balance
        $sql_update = "UPDATE users SET balance = balance + $amount WHERE id = $user_id";
        $conn->query($sql_update);
        echo "Deposit successful";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
