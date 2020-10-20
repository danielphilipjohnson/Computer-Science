<?php require 'pdo.php';
require 'validation.php';
session_start();
 
?>
 
<!DOCTYPE html>
<html>
 
<head>
   <title>Daniel Philip Johnson 7f945d34 Resume Registry</title>
   <?php require_once "bootstrap.php"; ?>
</head>
 
<body>
   <div class="container">
       <h1>Daniel Johnson’s Resume Registry</h1>
 
       <?php
 
       if (!isset($_SESSION['user_id'])) {
 
           echo  "<p><a href=" . "login.php" . ">Please log in</a></p>";
       } else {
 
           echo "<p><a href=" . "logout.php" . ">Log out </a></p>";
       }
 
 
       if (isset($_SESSION['success'])) {
           echo ('<p style="color: green;">' . htmlentities($_SESSION['success']) . "</p>\n");
           unset($_SESSION['success']);
       }
 
       if (isset($_SESSION['error'])) {
           echo ('<p style="color: red;">' . htmlentities($_SESSION['error']) . "</p>\n");
           unset($_SESSION['error']);
       }
 
       $data = $dbh->query("SELECT * FROM Profile")->fetchAll();
 
       if ($data) {
 
           if (isset($_SESSION['user_id'])) {

               echo "<table border=\"1\">
               <tr>
                   <th>Name</th>
                   <th>Headline</th>
                   <th>Action</th>
               </tr>";
 
               foreach ($data as $row) {
       ?>
                   <tr>
                       <td>
                           <a href=<?= "view.php?profile_id=" . $row['profile_id'] ?>>
                               <?= $row['first_name'] ?> <?= $row['first_name'] ?> </a></td>
                       <td><?= $row['headline'] ?></td>
 
                       <?php
                       if ($_SESSION['user_id'] === $row['user_id']) {
                           echo "<td><a href=\"edit.php?profile_id=" . $row['profile_id'] . "\">Edit</a> / ";
                           echo "<a href=\"delete.php?profile_id=" . $row['profile_id'] . "\">Delete</a></td>";
                       }
 
                       ?>
                   </tr>
               <?php
 
               }
               echo "</table>";
               echo '<p><a href="add.php">Add New Entry</a></p>';
           } else {
               echo "<table border=\"1\">
               <tr>
                   <th>Name</th>
                   <th>Headline</th>
               </tr>";
               foreach ($data as $row) {
               ?>
 
                   <tr>
                       <td>
 
                           <a href=<?= "view.php?profile_id=" . $row['profile_id'] ?>>
                               <?= $row['first_name'] ?> <?= $row['first_name'] ?> </a></td>
                       <td><?= $row['headline'] ?></td>
 
                   </tr>
       <?php
               }
               echo "</table>";
           }
       }
       ?>
       <p>
           <b>Note:</b> Your implementation should retain data across multiple
           logout/login sessions. This sample implementation clears all its
           data periodically - which you should not do in your implementation.
       </p>
 
 
   </div>
</body>
 
</html>