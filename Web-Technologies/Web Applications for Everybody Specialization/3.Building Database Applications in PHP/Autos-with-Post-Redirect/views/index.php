<?php include 'pdo.php';
session_start();
	// Demand a GET parameter
	#if ( ! isset($_SESSION['name']) ) {
	#	header("Location: login.php");
	#	Return;
	#}
?>

<!DOCTYPE html>
<html>
<head>
<title>Daniel Philip Johnson 7f945d34 Autos Database</title>
<?php require_once "bootstrap.php"; ?>
</head>
<body>
<div class="container">
<h1>Welcome to to Autos Database</h1>
<?php    


 if ( isset($_SESSION['success']) ) {
    	echo('<p style="color: green;">'.htmlentities($_SESSION['success'])."</p>\n");
    	unset($_SESSION['success']);
	}

   if (isset($_SESSION['error'])) {
            	echo('<p style="color: red;">'.htmlentities($_SESSION['error'])."</p>\n");
            	unset($_SESSION['error']);
	}
   	 

	if(isset($_SESSION['name'])){
	$data = $dbh->query("SELECT * FROM autos")->fetchAll();
    
	if ($data) {
    	echo "<table border=\"1\">
        	<tr>
            	<th>Make</th>
            	<th>Model</th>
            	<th>Year</th>
            	<th>Mileage</th>
        	</tr>";
    	foreach($data as $row){
        	echo "<tr>";
            	echo "<td>".$row['make']."</td>";
            	echo "<td>".$row['model']."</td>";
            	echo "<td>".$row['year']."</td>";
            	echo "<td>".$row['mileage']."</td>";
            	echo '<td><a href="edit.php?autos_id='.$row['auto_id'].'">Edit</a> / '
                    	.'<a href="delete.php?autos_id='.$row['auto_id'].'">Delete</a></td>';
        	echo "</tr>";
    	}
    	echo "</table>";
	}
   }
    
    
 
    
if ( ! isset($_SESSION['name']) ) {
echo  "<p><a href="."login.php".">Please log in</a></p>";

}
else {
echo '<p><a href="add.php">Add New Entry</a></p>';
echo "<p><a href="."logout.php".">Log out </a></p>";
}


 if (isset($_SESSION['error'])) {
            	echo('<p style="color: red;">'.htmlentities($_SESSION['error'])."</p>\n");
            	unset($_SESSION['error']);
	}
   	 

?>

<p>
	<b>Note:</b> Your implementation should retain data across multiple
	logout/login sessions.  This sample implementation clears all its
	data on logout - which you should not do in your implementation.
</p>





</div>
</body>
</html>

