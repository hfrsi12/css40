<?php
session_start();

if (!isset($_SESSION['username'])) {
    echo json_encode(['success' => false, 'message' => 'يجب عليك تسجيل الدخول لجمع الأرباح.']);
    exit();
}

$plan = $_POST['plan'];
$dailyProfit = $_POST['dailyProfit'];

// اتصال بقاعدة البيانات وتحديث رصيد المستخدم

echo json_encode(['success' => true, 'message' => 'تم جمع الأرباح بنجاح!']);
?>
