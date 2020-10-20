<?php include 'pdo.php';
    session_start();
    // Demand a GET parameter
    if ( ! isset($_SESSION['name']) ) {
        die('Not logged in');
    }
    if ( isset($_POST['cancel'] ) ) {
        
        header("Location: view.php");
        return;
    }
    // If the user requested logout go back to index.php
    if ( isset($_POST['logout']) ) {
        header('Location: index.php');
        return;
        
    }
    
    $failure = false;
    
    if (isset($_POST['make']) && isset($_POST['year']) && isset($_POST['mileage'])){
        if ( strlen($_POST['make']) < 1) {
        
            $_SESSION['error'] = "Make is required";
            header("Location: add.php");
            Return;
            
        } else {
        
            if (!is_numeric($_POST['year']) || !is_numeric($_POST['mileage'])){
            
                $_SESSION['error'] = "Mileage and year must be numeric";
                header("Location: add.php");
                Return;
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
                
                $_SESSION['success'] = "Record inserted";
                header("Location: view.php");
                return;

            }
        }
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
        
        if (isset($_SESSION['error'])) {
            echo('<p style="color: red;">'.htmlentities($_SESSION['error'])."</p>\n");
            unset($_SESSION['error']);
        }

    ?>

        <form method="POST">
            <p>
                <label>Make:</label>
                <input type="text" name="make" placeholder="Make">
            </p>

            <p>
                <label>Year:</label>
                <input type="text" name="year" placeholder="Year">
            </p>

            <p>
                <label>Mileage:</label>
                <input type="text" name="mileage" placeholder="Mileage">
            </p>


            <input type="submit" value="Add">
            <input type="submit" name="cancel" value="Cancel">
        </form>

    </div>
</body>