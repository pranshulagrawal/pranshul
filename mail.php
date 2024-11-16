<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    if (empty($name) || empty($email) || empty($message)) {
        echo "Error: Name, email, and message are required.";
        exit;
    }

    $to = "info@pranshulagarwal.in";
    $subject = "[INFO] Pranshulagarwal.in New Contact Form Submission";
    $body = "You have received a new message from the contact form.\n\n";
    $body .= "Name: $name\nEmail: $email\nPhone: $phone\nMessage:\n$message\n";
    $headers = "From: $to\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "Error: Unable to send your message.";
    }
    exit;
}
echo "Error: Invalid request.";
exit;
