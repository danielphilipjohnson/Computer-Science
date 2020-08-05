<?php include 'pdo.php'; // Do not put any HTML above this line
require 'validation.php';
session_start();
if (isset($_POST['cancel'])) {
   // Redirect the browser to login.php
   header("Location: index.php");
   return;
}
 
 
if (
   isset($_POST['email']) &&
   isset($_POST['pass'])
) {
 
   $validateUserLogin = login($_POST['email'], $_POST['pass']);
 
   if ($validateUserLogin[0] === true) {
 
       echo "correct";
       $salt = "XyZzy12*_";
 
       $check = hash('md5', $salt . $_POST['pass']);
 
       echo " salt" . $check;
 
       $stmt = $dbh->prepare('SELECT user_id, name FROM users WHERE email = :em AND password = :pw');
 
       $stmt->execute(array(':em' => $_POST['email'], ':pw' => $check));
 
       $row = $stmt->fetch(PDO::FETCH_ASSOC);
 
 
       if ($row !== false) {
           $_SESSION['name'] = $row['name'];
           $_SESSION['user_id'] = $row['user_id'];
 
           // Redirect the browser to index.php
           header("Location: index.php");
           return;
       } else {
           error_log("Login fail " . $_POST['email'] . "$check");
           $_SESSION['errors'] = "Incorrect password";
           $failure = "Incorrect password";
       }
   } else {
 
       $_SESSION['errors'] = $validateUserLogin[1];
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
      
 
 
       if (isset($_SESSION['errors'])) {
           // Look closely at the use of single and double quotes
           echo ('<p style="color: red;">' . htmlentities($_SESSION['errors']) . "</p>\n");
       }
 
       ?>
 
       <form method="POST" action="login.php">
           <label for="email">Email</label>
           <input type="text" name="email" id="email"><br />
           <label for="id_1723">Password</label>
           <input type="text" name="pass" id="id_1723"><br />
           <input type="submit" onclick="return doValidate();" value="Log In">
           <input type="submit" name="cancel" value="Cancel">
       </form>
       <p>
           For a password hint, view source and find a password hint
           in the HTML comments.
           <!-- Hint: The password is the four character sound a cat
            makes (all lower case) followed by 123. -->
       </p>
   </div>
 
   <script>
       function doValidate() {
           console.log('Validating...');
           try {
               addr = document.getElementById('email').value;
               pw = document.getElementById('id_1723').value;
               console.log("Validating addr=" + addr + " pw=" + pw);
               if (addr == null || addr == "" || pw == null || pw == "") {
                   alert("Both fields must be filled out");
                   return false;
               }
               if (addr.indexOf('@') == -1) {
                   alert("Invalid email address");
                   return false;
               }
               return true;
           } catch (e) {
               return false;
           }
           return false;
       }
   </script>
</body>