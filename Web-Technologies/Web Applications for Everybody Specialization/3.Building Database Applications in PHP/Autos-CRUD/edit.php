<?php include 'pdo.php';


session_start();
// Demand Session name
    if ( ! isset($_SESSION['name']) ) {
        die('ACCESS DENIED');
    }





if ( isset($_POST['cancel'] ) ) {
        header("Location: add.php");
        return;
}



if ( isset($_POST['make']) &&
     isset($_POST['model']) &&  
     isset($_POST['year'])  &&
     isset($_POST['mileage'])) {


    if ( strlen($_POST['make']) < 1   ||
         strlen($_POST['model']) < 1  ||
         strlen($_POST['year']) < 1 ||
         strlen($_POST['mileage']) < 1) {
         
          $_SESSION['error'] = "All fields are required";
            header("Location: edit.php?autos_id=".$_REQUEST['autos_id']);
            Return;
            
    } else {

       if(!is_numeric($_POST['year'])){
            $_SESSION['error'] = "Year must be an integer";
            header("Location: edit.php?autos_id=".$_REQUEST['autos_id']);
            Return;
       }
       
       if(!is_numeric($_POST['mileage'])){
            $failure = "Mileage must be an integer";
            $_SESSION['error'] = "Mileage must be an integer";
            header("Location: edit.php?autos_id=".$_REQUEST['autos_id']);
            Return;
       }
       else {
            
            
            $auto_id = htmlentities( $_GET['autos_id'], ENT_QUOTES, 'UTF-8');
            $make =htmlentities($_POST['make'], ENT_QUOTES, 'UTF-8');
            $model =htmlentities($_POST['model'], ENT_QUOTES, 'UTF-8');
            $year =htmlentities($_POST['year'], ENT_QUOTES, 'UTF-8');
            $mileage = htmlentities($_POST['mileage'], ENT_QUOTES, 'UTF-8');
            
            
            $data = [
                'make' => $make,
                'model' => $model,
                'year' => $year,
                'mileage' => $mileage,
                'id' => $auto_id,
            ];
            
            $sql = "UPDATE autos SET make=:make, model=:model, year=:year, mileage=:mileage WHERE auto_id=:id";

            $stmt= $dbh->prepare($sql);
            $stmt->execute($data);

            $_SESSION['success'] = "Record edited";
            header("Location: index.php");
            return;
       }
    }
}

?>


<!DOCTYPE html>
<html>
<head>
<?php require_once "bootstrap.php"; ?>
<title>Daniel Philip Johnson 7f945d34 add Automobile</title>
</head>
<body>
<div class="container">
<h1>Tracking Automobiles for USERNAME</h1>
<?php
// Note triple not equals and think how badly double
// not equals would work here...
    if (isset($_SESSION['error'])) {
                echo('<p style="color: red;">'.htmlentities($_SESSION['error'])."</p>\n");
                unset($_SESSION['error']);
    }
            
        echo '<form method="POST">';

    
        // select a particular Auto by id
        $stmt = $dbh->prepare("SELECT * FROM autos WHERE auto_id=:id");
        $stmt->execute(['id' => $_GET['autos_id']]);
        $data = $stmt->fetch();
                
            echo '<p>Make:'.'<input type="text" name="make" size="40" value="'.$data['make'].'"></p>';
            
            echo '<p>Model:'.'<input type="text" name="model" size="40" value="'.$data['model'].'"></p>';
            
            echo '<p>Year:'.'<input type="text" name="year" size="40" value="'.$data['year'].'"></p>';
            
            echo '<p>Mileage:'.'<input type="text" name="mileage" size="40" value="'.$data['mileage'].'"></p>';
        
            echo '<input type="submit" name="add" value="Save">'.   
                '<input type="submit" name="cancel" value="Cancel">';

        echo '</form>';
        
?>


<p>
For a password hint, view source and find a password hint
in the HTML comments.
<!-- Hint: The password is the four character sound a cat
makes (all lower case) followed by 123. -->
</p>
</div>
</body>


