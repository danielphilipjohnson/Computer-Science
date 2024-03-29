<?php require_once "pdo.php";
require 'validation.php';

// Fall through into the View
// Check to see if we have some POST data, if we do process it
$failure = false;
session_start();


// Demand a GET parameter
if (!isset($_SESSION['user_id'])) {
   die('ACCESS DENIED');
}


if (isset($_POST['cancel'])) {

   header("Location: add.php");
   return;
}


if (
   isset($_POST['first_name']) &&
   isset($_POST['last_name']) &&
   isset($_POST['email'])  &&
   isset($_POST['headline'])  &&
   isset($_POST['summary'])
) {

   $validateProfile = profile(
       $_POST['first_name'],
       $_POST['last_name'],
       $_POST['email'],
       $_POST['headline'],
       $_POST['summary']
   );
   if (validatePos() === true) {
       if (validateEdu() === true) {

           if ($validateProfile[0] === true) {

               $profile = [
                   'us' =>  htmlentities($_SESSION['user_id'], ENT_QUOTES, 'UTF-8'),
                   'fn' =>  htmlentities($_POST['first_name'], ENT_QUOTES, 'UTF-8'),
                   'ln' =>  htmlentities($_POST['last_name'], ENT_QUOTES, 'UTF-8'),
                   'e' =>   htmlentities($_POST['email'], ENT_QUOTES, 'UTF-8'),
                   'hd' =>  htmlentities($_POST['headline'], ENT_QUOTES, 'UTF-8'),
                   'su' =>  htmlentities($_POST['summary'], ENT_QUOTES, 'UTF-8')

               ];

               $sql = "INSERT INTO Profile
                       (user_id, first_name, last_name, email, headline, summary)
                       VALUES (:us, :fn, :ln, :e, :hd, :su)";

               $stmt = $dbh->prepare($sql);
               $stmt->execute($profile);


               $profile_id = $dbh->lastInsertId();

               insertPositionsIntoProfile($dbh,  $profile_id);

               insertEducationIntoProfile($dbh, $profile_id);

               $_SESSION['success'] = $validateProfile[1];

               header("Location: index.php");
               return;
           } else {
               $_SESSION['error'] = $validateProfile[1];
               header("Location: add.php");
               return;
           }
       } else {
           $_SESSION['error'] = validateEdu();
           header("Location: add.php");
           return;
       }
   } else {

       $_SESSION['error'] = validatePos();
       header("Location: add.php");
       return;
   }
}

?>


<!DOCTYPE html>
<html>

<head>
   <?php require_once "bootstrap.php"; ?>
   <title>Daniel Philip Johnson 7f945d34 add Profile</title>
</head>

<body>
   <div class="container">
       <h1>Adding Profile for <?= $_SESSION['name'] ?></h1>
       <?php
       // Note triple not equals and think how badly double
       // not equals would work here...
       if (isset($_SESSION['error'])) {
           echo ('<p style="color: red;">' . htmlentities($_SESSION['error']) . "</p>\n");
           unset($_SESSION['error']);
       }
       ?>

       <form method="POST">
           <p>First Name:
               <input type="text" name="first_name" size="60"></p>
           <p>Last Name:
               <input type="text" name="last_name" size="60"></p>
           <p>Email:
               <input type="text" name="email" size="30"></p>
           <p>Headline:<br>
               <input type="text" name="headline" size="80"></p>
           <p>Summary:<br>
               <textarea name="summary" rows="8" cols="80"></textarea>
           </p>

           <p>
               Education: <input type="submit" id="addEdu" value="+">
           </p>

           <div id="edu_fields">
           </div>



           <p>
               Position: <input type="submit" id="addPos" value="+">
           </p>
           <div id="position_fields">
           </div>

           <p>
               <input type="submit" name="add" value="Add">
               <input type="submit" name="cancel" value="Cancel">
           </p>


       </form>

   </div>

   <script>
       countPos = 0;
       countEdu = 0;

       // http://stackoverflow.com/questions/17650776/add-remove-html-inside-div-using-javascript
       $(document).ready(function() {
           window.console && console.log('Document ready called');

           $('#addPos').click(function(event) {
               // http://api.jquery.com/event.preventdefault/
               event.preventDefault();
               if (countPos >= 9) {
                   alert("Maximum of nine position entries exceeded");
                   return;
               }
               countPos++;
               window.console && console.log("Adding position " + countPos);
               $('#position_fields').append(
                   '<div id="position' + countPos + '"> \
           <p>Year: <input type="text" name="year' + countPos + '" value="" /> \
           <input type="button" value="-" onclick="$(\'#position' + countPos + '\').remove();return false;"><br>\
           <textarea name="desc' + countPos + '" rows="8" cols="80"></textarea>\
           </div>');
               Un
           });

           $('#addEdu').click(function(event) {
               event.preventDefault();
               //e.stopPropagation()
               if (countEdu >= 9) {
                   alert("Maximum of nine education entries exceeded");
                   return;
               }
               countEdu++;
               window.console && console.log("Adding education " + countEdu);

               $('#edu_fields').append(
                   '<div id="edu' + countEdu + '"> \
           <p>Year: <input type="text" name="edu_year' + countEdu + '" value="" /> \
           <input type="button" value="-" onclick="$(\'#edu' + countEdu + '\').remove();return false;"><br>\
           <p>School: <input type="text" size="80" name="edu_school' + countEdu + '" class="school" autocomplete="off" value="" />\
           </p></div>'
               );
               //return false;
               $('.school').autocomplete({
                   source: "schools.php"
               });

           });


       });
   </script>
</body>