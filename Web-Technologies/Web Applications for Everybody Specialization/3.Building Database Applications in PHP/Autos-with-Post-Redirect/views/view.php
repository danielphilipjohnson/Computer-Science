<?php include 'pdo.php';
session_start();
    // Demand a GET parameter
    if ( ! isset($_SESSION['name']) ) {
    echo(session_id());
        die('Not logged in');
    }
?>
<!DOCTYPE html>
<html>
<head>
<?php require_once "bootstrap.php"; ?>
<title>Daniel Philip Johnson 7f945d34 Login Page</title>
</head>
<body>
<div class="container">
<?php 
    echo("<h1>Tracking Autos for ".$_SESSION['name']."</h1>");
    if ( isset($_SESSION['success']) ) {
        echo('<p style="color: green;">'.htmlentities($_SESSION['success'])."</p>\n");
        unset($_SESSION['success']);
    }
?>
<h2>Automobiles</h2>


<?php    
    $data = $dbh->query("SELECT * FROM autos")->fetchAll();
    
    echo "<ul>";
    
    foreach($data as $row){
    
        echo "<li>".$row['year']. ' ' .$row['make']. ' / '.$row['mileage']."</li>\n";
        
    }
    echo "</ul>";
    
?>
<p>
<a href="add.php">Add New</a>
| 
<a href="logout.php"> Logout</a>
</p>
</div>

</body>