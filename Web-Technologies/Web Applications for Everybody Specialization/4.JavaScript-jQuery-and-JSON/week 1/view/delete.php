<?php
require_once "pdo.php";
session_start();
 
// Demand Session name
if (!isset($_SESSION['user_id'])) {
   die('ACCESS DENIED');
}
if (isset($_POST['cancel'])) {
   header("Location: index.php");
   return;
}
 
// check the user owns it get session id maybe match to post
if (isset($_POST['delete']) && isset($_POST['profile_id'])) {
 
   // make sure it belongs to user
   $stmt = $dbh->prepare("DELETE FROM Profile WHERE profile_id=:id");
   $stmt->execute(['id' => $_POST['profile_id']]);
   $deleted = $stmt->rowCount();
 
   $_SESSION['success'] = 'Record deleted ' . $deleted;
   header('Location: index.php');
   return;
}
 
if (!isset($_GET['profile_id'])) {
 
   $_SESSION['error'] = 'Autos Id is required';
   header('Location: index.php');
   return;
}
 
?>
<!DOCTYPE html>
<html>
 
<head>
   <?php require_once "bootstrap.php"; ?>
   <title>Daniel Philip Johnson 7f945d34 Delete Profile</title>
</head>
 
<body>
 
   <div class="container">
 
       <h1>Deleting Profile</h1>
 
       <?php include 'pdo.php';
 
       $stmt = $dbh->prepare("SELECT * FROM Profile WHERE profile_id=:id");
       $stmt->execute(['id' => $_GET['profile_id']]);
       $data = $stmt->fetch();
 
 
       if ($data === false) {
           $_SESSION['error'] = 'Could not load profile';
           header('Location: index.php');
           return;
       }
      
       if ($data['user_id'] !== $_SESSION['user_id']){
           $_SESSION['error'] = 'Could not load profile';
           header("Location: index.php");
           return;
 
       }
 
       ?>
 
       <form method="POST">
 
           <p>First Name: <?= $data['first_name'] ?></p>
           <p>Last Name: <?= $data['last_name'] ?></p>
           <input type="hidden" name="profile_id" value="<?= $data['profile_id'] ?>">
           <input type="submit" name="delete" value="Delete">
           <input type="submit" name="cancel" value="Cancel">
       </form>
   </div>
</body>