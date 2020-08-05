<?php // Do not put any HTML above this line

if ( isset($_POST['cancel'] ) ) {
    // Redirect the browser to login.php
    header("Location: index.php");
    return;
}
session_start();
$salt = 'XyZzy12*_';
#password php123

$stored_hash = '1a52e17fa899cf40fb04cfc42e6352f1';


// Check to see if we have some POST data, if we do process it
if ( isset($_POST['email']) && isset($_POST['pass']) ) {
    if ( strlen($_POST['email']) < 1 || strlen($_POST['pass']) < 1 ) {
        $_SESSION['error'] = "Email and password are required";
        header("Location: login.php");
        Return;
    } else {

    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = "Email must have an at-sign (@)";
        header("Location: login.php");
        Return;

    }

    else {

            $check = hash('md5', $salt.$_POST['pass']);
            
            if ( $check == $stored_hash ) {        
                
                error_log("Login success ".$_POST['email']);
                // Redirect the browser to view.php
                $_SESSION['name'] = $_POST['email'];
                header("Location: view.php");
                return;
                
            } else {
                error_log("Login fail ".$_POST['email']." $check");
                $_SESSION['error'] = "Incorrect password";
                header("Location: login.php");
                Return;
            
            }
        }
}
}

// Fall through into the View
?>
<!DOCTYPE html>
<html>
<head>
<?php require_once "bootstrap.php"; ?>
<title>Daniel Philip Johnson 7f945d34 Login Page</title>
</head>
<body>
<div class="container">
<h1>Please Log In</h1>
<?php


if ( isset($_SESSION['error']) ) {
  echo('<p style="color: red;">'.htmlentities($_SESSION['error'])."</p>\n");
  unset($_SESSION['error']);
}


?>

<form method="POST">
    <label for="nam">User Name</label>
    <input type="text" name="email" id="nam"><br/>
    <label for="id_1723">Password</label>
    <input type="text" name="pass" id="id_1723"><br/>
    <input type="submit" value="Log In">
    <input type="submit" name="cancel" value="Cancel">
</form>
<p>
For a password hint, view source and find a password hint
in the HTML comments.
<!-- Hint: The password is the four character sound a cat
makes (all lower case) followed by 123. -->
</p>
</div>
</body>
