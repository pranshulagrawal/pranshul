<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve and sanitize input
    $name = htmlspecialchars(trim($_POST['ajax_name'] ?? ''));
    $email = filter_var(trim($_POST['ajax_email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['ajax_phone'] ?? ''));
    $message = htmlspecialchars(trim($_POST['ajax_message'] ?? ''));

    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => 'Please fill out all required fields.']);
        exit;
    }

    // Define recipient and subject
    $to = htmlspecialchars(trim($_POST['ajax_emailto'] ?? 'info@pranshulagarwal.in'));
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
        echo json_encode(['status' => 'success', 'message' => 'Your message has been sent successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to send your message. Please try again later.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
