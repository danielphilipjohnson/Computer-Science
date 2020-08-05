<?php include 'pdo.php';

$profile_id = $_GET['profile_id'];


$stmt = $dbh->prepare("SELECT * FROM Profile WHERE profile_id=:id");
$stmt->execute(['id' => $profile_id]);
$data = $stmt->fetch();



$positionData = getUserPositions($dbh, $profile_id);


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

                   echo "<li>" . $row['year']  . ": "  . $row['description'] . "</li>";
               }
               ?>
           </ul>
           Education
           <ul>
               <?php
                    $education = getUsersEducation($dbh, $profile_id);
                    foreach ($education  as $school) {
        
                        echo "<li>" .$school['year'] . ": " . $school['name'] . "</li>";
                    }
               ?>
           </ul>
       </p>
       <a href="index.php">Done</a>
   </div>
</body>

</html>
