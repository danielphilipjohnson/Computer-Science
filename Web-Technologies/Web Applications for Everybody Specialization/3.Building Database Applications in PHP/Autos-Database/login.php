<?php include 'pdo.php';
    // Demand a GET parameter
    if ( ! isset($_GET['name']) || strlen($_GET['name']) < 1  ) {
    
        die('Name parameter missing');
        
    }

    // If the user requested logout go back to index.php
    if ( isset($_POST['logout']) ) {
    
        header('Location: index.php');
        return;
        
    }
    echo ("<h1>Tracking Autos for ".$_GET['name']."</h1>");
    
    $failure = false;
    
    if (isset($_POST['make']) && isset($_POST['year'])   && isset($_POST['mileage'])){
        if ( strlen($_POST['make']) < 1) {
        
            $failure = "Make is required";
            
        } else {
        
            if (!is_numeric($_POST['year']) || !is_numeric($_POST['mileage'])){
            
                $failure = "Mileage and year must be numeric";
            }
            else{
            
                $auto = [
                    'mk' =>  htmlentities($_POST['make'], ENT_QUOTES, 'UTF-8'),
                    'yr' =>  $_POST['year'],
                    'mi' =>  $_POST['mileage']
                
                ];
                $sql = "INSERT INTO autos (make, year, mileage) VALUES (:mk,:yr, :mi)";
                
                $stmt= $dbh->prepare($sql);
                $stmt->execute($auto);
                
                header('Location: autos.php?name='.$_GET['name']);

            }
        }
    }
    
    if ( $failure !== false ) {
        echo('<p style="color: red;">'.htmlentities($failure)."</p>\n");
    }
    else {
        echo('<p style="color: green;">'. "Record inserted</p>\n");
    }

?>

<form method="POST">
<label>Make:</label>
<input type="text" name="make" placeholder="Make">
<br>
<label>Year:</label>
<input type="text" name="year" placeholder="Year">
<br>
<label>Mileage:</label>
<input type="text" name="mileage" placeholder="Mileage">
<br>
<input type="submit" value="Add">
<input type="submit" name="logout" value="Logout">

<?php
    echo("<h2> Automobiles</h2>");
    
    $data = $dbh->query("SELECT * FROM autos")->fetchAll();
    
    echo "<ul>";
    
    foreach($data as $row){
    
        echo "<li>".$row['year']. ' ' .$row['make']. ' / '.$row['mileage']."</li>\n";
        
    }
    echo "</ul>";
    
?>