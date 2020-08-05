<?php include 'pdo.php';
 
$stmt = $dbh->prepare("SELECT * FROM Profile WHERE profile_id=:id");
$stmt->execute(['id' => $_GET['profile_id']]);
$data = $stmt->fetch();
 
function getUsersPositions($dbh)
{
   $stmt = $dbh->prepare("SELECT * FROM Position WHERE profile_id=:id");
   $stmt->execute(['id' => $_GET['profile_id']]);
   $data = $stmt->fetchAll();
   return $data;
}
$positionData = getUsersPositions($dbh);
 
 
?>
<!DOCTYPE html>
<html>
 
<head>
   <title>Daniel Philip Johnson 7f945d34 View Profile</title>
   <?php require_once "bootstrap.php"; ?>
</head>
 
<body>
   <div class="container">
       <h1>Profile information</h1>
       <p>First Name: <?= $data['first_name'] ?></p>
       <p>Last Name:<?= $data['last_name'] ?></p>
       <p>Email:<?= $data['email'] ?></p>
       <p>Headline:<br><?= $data['headline'] ?> </p>
       <p>Summary:<br><?= $data['summary'] ?></p>
       <p>
           Positions
           <ul>
 
           <?php
           foreach ($positionData as $row) {
              
               echo "<li>". $row['year']  . ": "  .$row['description'] . "</li>";
           }
           ?>
 
           </ul>
       </p>
       <a href="index.php">Done</a>
   </div>
</body>
 
</html>