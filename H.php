<?php
// اتصال بقاعدة البيانات
$servername = "localhost"; // اسم الخادم
$username = "root"; // اسم المستخدم لقاعدة البيانات
$password = ""; // كلمة المرور لقاعدة البيانات
$dbname = "revo"; // اسم قاعدة البيانات

// إنشاء الاتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}

// استقبال البيانات من النموذج HTML
$username = $_POST['username'];
$offer_number = $_POST['offer_number'];

// استخدام استعلام SQL للتحقق من صحة المستخدم وتفعيل العرض

// يجب أن يتم استبدال هذا الجزء بمنطق الأعمال الخاص بك
// يجب أن تتأكد من تحسين الأمان ومنع هجمات إدخال البيانات.

$sql = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // وجد المستخدم
    // يمكنك هنا تنفيذ عمليات إضافية مثل التحقق من صحة العرض وخصم الرصيد
    echo "تم العثور على المستخدم: $username";
} else {
    echo "لم يتم العثور على المستخدم: $username";
}

// إغلاق الاتصال بقاعدة البيانات
$conn->close();
?>









