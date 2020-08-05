namespace Validation {

function profile($firstName, $lastName, $email, $headline, $summary){

// check variables exist
if (isset($firstName) &&
 	isset($lastName) &&  
 	isset($email) &&
 	isset($headline) &&
isset($summary)) {

// Check for blank input
if ( strlen($firstName) < 1   ||
     	strlen($lastName) < 1  ||
     	strlen($email) < 1 ||
strlen($headline) < 1 ||
     	strlen($summary) < 1) {

	$error = "All fields are required”;
return array (false, $error);
} 
else {
				// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        	$error = "Email must have an at-sign (@)";
return array (false, $error);

 }
else {
	Echo “all passes”;

}

}



	}




}
function login($email, $password){

// Check to see if we have some POST data, if we do process it
if ( 
isset($email) && 
isset($password) ) {
	if ( 
strlen($email) < 1 || 
strlen($password) < 1 ) {
    	$error = "Email and password are required";
return array (false, $error);

	} else {

    	if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        	$error = "Email must have an at-sign (@)";
return array (false, $error);

    	} else {

            	

}

}


Function checkUserExists($email, $password) {
$salt = "XyZzy12*_";

$check = hash('md5', $salt.$password);

          	$stmt = $dbh->prepare('SELECT user_id, name FROM users
    	WHERE email = :em AND password =	:pw');
            $stmt->execute(array( ':em' => $email, ':pw' => $check));
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
Return $row



}


  ':fn' => $_POST['first_name'],
    	':ln' => $_POST['last_name'],
    	':em' => $_POST['email'],
    	':he' => $_POST['headline'],
    	':su' => $_POST['summary'])


Use function Validation\profile


// check variables exist
if ( isset($_POST['make']) &&
 	isset($_POST['model']) &&  
 	isset($_POST['year'])  &&
 	isset($_POST['mileage'])) {
    	$auto = [
                	'mk' =>  htmlentities($_POST['make'], ENT_QUOTES, 'UTF-8'),
                	'yr' =>  $_POST['year'],
                	'mi' =>  $_POST['mileage']
           	 
            	];

	if ( strlen($_POST['make']) < 1   ||
     	strlen($_POST['model']) < 1  ||
     	strlen($_POST['year']) < 1 ||
     	strlen($_POST['mileage']) < 1) {
    	 
      	$_SESSION['error'] = "All fields are required";
        	header("Location: add.php");
        	Return;
       	 
    	//$failure = "All fields are required";
	} else {

   	if(!is_numeric($_POST['year'])){
        	$_SESSION['error'] = "Year must be an integer";
        	header("Location: add.php");
        	Return;
   	}
  	 
   	if(!is_numeric($_POST['mileage'])){
        	$_SESSION['error'] = "Mileage must be an integer";
        	header("Location: add.php");
        	Return;
   	}
   	else {
        	$auto = [
            	'mk' =>  htmlentities($_POST['make'], ENT_QUOTES, 'UTF-8'),
            	'md' =>  htmlentities($_POST['model'],ENT_QUOTES, 'UTF-8'),
            	'yr' =>  htmlentities($_POST['year'],ENT_QUOTES, 'UTF-8'),
            	'mi' =>  htmlentities($_POST['mileage'], ENT_QUOTES, 'UTF-8')
       	 
        	];
       	 
        	$sql = "INSERT INTO autos (make, model, year, mileage) VALUES (:mk, :md, :yr, :mi)";
        	$stmt= $dbh->prepare($sql);
        	$stmt->execute($auto);
       	 
        	$_SESSION['success'] = "added";
        	header("Location: index.php");
        	Return;
        	}
  	 
	}
}