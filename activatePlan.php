<?php
session_start();

if (!isset($_SESSION['username'])) {
    echo json_encode(['success' => false, 'message' => 'يجب عليك تسجيل الدخول لتفعيل خطة.']);
    exit();
}

$plan = $_POST['plan'];
$price = $_POST['price'];
$dailyProfit = $_POST['dailyProfit'];

// اتصال بقاعدة البيانات وتفعيل الخطة للمستخدم

echo json_encode(['success' => true, 'message' => 'تم تفعيل الخطة بنجاح!']);
?>
