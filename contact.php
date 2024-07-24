<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // احصل على البيانات من النموذج
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // تحقق من البيانات المدخلة
    if (empty($name) || empty($email) || empty($message)) {
        echo "جميع الحقول مطلوبة.";
        exit;
    }

    // إعداد بيانات البريد الإلكتروني
    $to = "amastthmar@gmail.com"; // ضع هنا بريدك الإلكتروني
    $subject = "استفسار من موقع الاستثمار";
    $body = "الاسم: $name\nالبريد الإلكتروني: $email\n\nالرسالة:\n$message";
    $headers = "From: $email";

    // إرسال البريد الإلكتروني
    if (mail($to, $subject, $body, $headers)) {
        echo "تم إرسال رسالتك بنجاح!";
    } else {
        echo "عذراً، حدث خطأ أثناء إرسال رسالتك.";
    }
} else {
    echo "طلب غير صالح.";
}
?>
