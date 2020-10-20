<?php
require_once "pdo.php";
session_start();
// Demand Session name
if ( ! isset($_SESSION['name']) ) {
	die('ACCESS DENIED');
}


if(isset($_POST['delete']) && isset($_POST['auto_id'])){

	echo "Condtion filled";
	$stmt = $dbh->prepare("DELETE FROM autos WHERE auto_id=:id");
	$stmt->execute(['id' => $_POST['auto_id']]);
	$deleted = $stmt->rowCount();
	echo $deleted;
	$_SESSION['success'] = 'Record deleted '.$deleted;
	header('Location: index.php');
	return;


}

if(! isset($_GET['autos_id'])){

	$_SESSION['error'] = 'Autos Id is required';
	header('Location: index.php');
	return;

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

    
	<?php  include 'pdo.php';
    
    	$stmt = $dbh->prepare("SELECT * FROM autos WHERE auto_id=:id");
    	$stmt->execute(['id' => $_GET['autos_id']]);
    	$data = $stmt->fetch();
   	 
   	 
    	if($data === false){
       	$_SESSION['error'] = 'Autos Id is required';
       	header('Location: index.php');
       	return;
   	 
    	}
?>
	<p>Confirm: Deleting <?= htmlentities($data['make']) ?></p>

    	<form method="POST">
        	<input type="hidden" name="auto_id" value="<?= $data['auto_id'] ?>">
        	<input type="submit" name="delete" value="Delete">
        	<a href="index.php">Cancel</a>
    	</form>
	</div>
</body>