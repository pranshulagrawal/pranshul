<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $message = trim($_POST['message']);

    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        echo "Name, email, and message are required!";
        exit;
    }

    // Sanitize inputs
    $name = htmlspecialchars($name);
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($phone);
    $message = htmlspecialchars($message);

    // Define recipient email
    $to = "Pranshul.er@gmail.com";

    // Subject of the email
    $subject = "New Contact Form Submission";

    // Construct the email content
    $body = "You have received a new message from the contact form.\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Message:\n$message\n";

    // Set the email headers
    $headers = "From: $to\r\n";
    $headers .= "Reply-To: $to\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Your message has been sent successfully!";
    } else {
        echo "There was an error sending your message. Please try again later.";
    }
}
?>
