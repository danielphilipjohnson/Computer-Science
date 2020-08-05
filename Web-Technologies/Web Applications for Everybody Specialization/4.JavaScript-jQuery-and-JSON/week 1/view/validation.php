function profile($firstName, $lastName, $email, $headline, $summary) { 
    if ( strlen($firstName) < 1 |
    | strlen($lastName) < 1 
    || strlen($email) < 1 
    || strlen($headline) < 1 
    || strlen($summary) < 1 ) { /
    / fix this $error = "All fields are required"; 
    echo "no fields displayed"; 
    return array(false, $error); 
    } 
    else { 
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { 
            $error = "Email must have an at-sign (@)"; 
            echo "failed email"; 
            eturn array(false, $error); 
        } else { 
            echo "made it here"; 
            return array(true, "added");
        } 
    } 
} 
function login($email, $password) { 
    // Check to see if we have some POST data, if we do process it 
    if ( strlen($email) < 1 || strlen($password) < 1 ) { 
        $error = "Email and password are required"; 
        return array(false, $error); 
    } else { 
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { 
            $error = "Email must have an at-sign (@)"; 
            return array(false, $error); 
        } else { 
            return array(true, "added");
        } 
    } 
} 