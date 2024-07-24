<?php
session_start();
$response = ['loggedIn' => false];

if (isset($_SESSION['username'])) {
    $response['loggedIn'] = true;
    $response['balance'] = 0.00; // يجب جلب الرصيد من قاعدة البيانات
    // اتصال بقاعدة البيانات وجلب بيانات المستخدم
}

echo json_encode($response);
?>
