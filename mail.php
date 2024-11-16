<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve and sanitize input
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        header("Location: /?status=error");
        exit;
    }

    // Define recipient and subject
    $to = "info@pranshulagarwal.in";
    $subject = "[INFO] Pranshulagarwal.in New Contact Form Submission";

    // Construct email body
    $body = "You have received a new message from the contact form.\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Message:\n$message\n";

    // Set headers
    $headers = "From: $to\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        header("Location: /?status=success");
    } else {
        header("Location: /?status=error");
    }
    exit;
} else {
    header("Location: /?status=error");
    exit;
}
