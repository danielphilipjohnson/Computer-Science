<?php include 'pdo.php';
require 'validation.php';
 
 
session_start();
if (!isset($_SESSION['user_id'])) {
   die('ACCESS DENIED');
}
 
if (isset($_POST['cancel'])) {
   header("Location: index.php");
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
 
 
   if ($validateProfile[0] === true) {
 
       // get profile
 
       $profile = [
           'id' =>  htmlentities($_POST['profile_id'], ENT_QUOTES, 'UTF-8'),
           'first_name' =>  htmlentities($_POST['first_name'], ENT_QUOTES, 'UTF-8'),
           'last_name' =>  htmlentities($_POST['last_name'], ENT_QUOTES, 'UTF-8'),
           'email' =>   htmlentities($_POST['email'], ENT_QUOTES, 'UTF-8'),
           'headline' =>  htmlentities($_POST['headline'], ENT_QUOTES, 'UTF-8'),
           'summary' =>  htmlentities($_POST['summary'], ENT_QUOTES, 'UTF-8')
 
       ];
 
 
       $sql = "UPDATE Profile
       SET first_name=:first_name, last_name=:last_name, email=:email, headline=:headline,
       summary=:summary
       WHERE profile_id=:id";
 
       $stmt = $dbh->prepare($sql);
       $stmt->execute($profile);
 
       $_SESSION['success'] = "Record edited";
       header("Location: index.php");
       return;
   } else {
 
       $_SESSION['error'] = $validateProfile[1];
       header("Location: edit.php?profile_id=" . $_REQUEST['profile_id']);
 
       return;
   }
}
 
?>
 
 
<!DOCTYPE html>
<html>
 
<head>
   <?php require_once "bootstrap.php"; ?>
   <title>Daniel Philip Johnson 7f945d34 Edit profile </title>
</head>
 
<body>
   <div class="container">
       <?php
 
       $stmt = $dbh->prepare("SELECT * FROM Profile WHERE profile_id=:id");
       $stmt->execute(['id' => $_GET['profile_id']]);
       $data = $stmt->fetch();
 
       if ($data === false) {
           $_SESSION['error'] = 'Could not load profile';
           header("Location: index.php");
           return;
       }
       if ($data['user_id'] !== $_SESSION['user_id']){
           $_SESSION['error'] = 'Could not load profile';
           header("Location: index.php");
           return;
 
       }
       ?>
       <h1>Editing Profile for <?= $_SESSION['name'] ?></h1>
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
               <input type="text" name="first_name" size="60" value="<?= $data['first_name'] ?>"></p>
           <p>Last Name:
               <input type="text" name="last_name" size="60" value="<?= $data['last_name'] ?>"></p>
           <p>Email:
               <input type="text" name="email" size="30" value="<?= $data['email'] ?>"></p>
           <p>Headline:<br>
               <input type="text" name="headline" size="80" value="<?= $data['headline'] ?>"></p>
           <p>Summary:<br>
               <textarea name="summary" rows="8" cols="80"><?= $data['summary'] ?></textarea>
           </p>
 
           <input type="hidden" name="profile_id" value="<?= $data['profile_id'] ?>"></p>
 
           <p>
               <input type="submit" name="add" value="Save">
               <input type="submit" name="cancel" value="Cancel">
           </p>
       </form>

   </div>
</body>