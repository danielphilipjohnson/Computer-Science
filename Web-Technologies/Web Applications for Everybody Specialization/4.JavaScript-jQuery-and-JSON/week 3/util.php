<?php
$servername = "localhost";
$username = "dan";
$password = "zap";

// convert to class
try {
 $dbh = new PDO("mysql:host=$servername;dbname=misc", $username, $password);
 // set the PDO error mode to exception
 $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

 //$dbh = null;
} catch (PDOException $e) {
 echo "Connection failed: " . $e->getMessage();
 die();
}



function getUserProfile($dbh, $profileID)
{
 $stmt = $dbh->prepare("SELECT * FROM Profile WHERE profile_id=:id");
 $stmt->execute(['id' => $profileID]);
 $data = $stmt->fetch();
 return $data;
}


function getUserPositions($dbh, $profile_id)
{
 $stmt = $dbh->prepare("SELECT * FROM Position WHERE profile_id=:id");
 $stmt->execute(['id' => $profile_id]);
 $data = $stmt->fetchAll();
 return $data;
}



/// clear out old positions
function deletePositionEntries($dbh, $profile_id)
{
 $stmt = $dbh->prepare('DELETE FROM Position WHERE profile_id=:pid');
 $stmt->execute(array(':pid' => $profile_id));
}




function formPositionValues($profile_id)
{
 // in future find rank from database
 $rank = 1;
 $positions = array();

 for ($i = 1; $i <= 9; $i++) {
   if (!isset($_POST['year' . $i])) continue;
   if (!isset($_POST['desc' . $i])) continue;
   $year = $_POST['year' . $i];
   $desc = $_POST['desc' . $i];

   // populate

   $position = array(
     'pid' => $profile_id,
     'rank' => $rank,
     'year' => $year,
     'desc' => $desc
   );
   array_push($positions, $position);
   $rank++;
 }
 return $positions;
}

function insertPositionsIntoProfile($dbh, $profile_id)
{

 $postions = formPositionValues($profile_id);

 foreach ($postions as $position) {

   DBinsertPositions(
     $dbh,
     $position['pid'],
     $position['rank'],
     $position['year'],
     $position['desc']
   );
 }
}



function DBinsertPositions($dbh, $profile_id, $rank, $year, $desc)
{

 $stmt = $dbh->prepare('INSERT INTO Position
           (profile_id, rank, year, description)
       VALUES ( :pid, :rank, :year, :desc)');
 $stmt->execute(array(
   ':pid' => $profile_id,
   ':rank' => $rank,
   ':year' => $year,
   ':desc' => $desc
 ));
}




// Education

function getUsersEducation($dbh, $profile_id)
{
 $stmt = $dbh->prepare("SELECT * FROM Education INNER JOIN Institution ON
   Education.institution_id = Institution.institution_id  WHERE Education.profile_id=:id");
 $stmt->execute(['id' =>  $profile_id]);
 $data = $stmt->fetchAll();
 return $data;
}


function formEducationalValues($profile_id)
{
 // in future find rank from database
 $rank = 1;
 $educations = array();

 for ($i = 1; $i <= 9; $i++) {
   if (!isset($_POST['edu_year' . $i])) continue;
   if (!isset($_POST['edu_school' . $i])) continue;


   $year = $_POST['edu_year' . $i];
   $school = $_POST['edu_school' . $i];



   $education = array(
     'pid' => htmlentities($profile_id, ENT_QUOTES, 'UTF-8'),
     'rank' => htmlentities($rank, ENT_QUOTES, 'UTF-8'),
     'year' => htmlentities($year, ENT_QUOTES, 'UTF-8'),
     'school' => htmlentities($school, ENT_QUOTES, 'UTF-8')
   );
   array_push($educations, $education);
   $rank++;
 }
 return $educations;
}


// get institue key
// $institution_id = getInstitutionIDbyName($dbh, $school);

function insertEducationIntoProfile($dbh, $profile_id)
{
 $postions = formEducationalValues($profile_id);

 foreach ($postions as $position) {

   echo $position['pid'];
   echo $position['rank'];
   echo $position['year'];
   echo $position['school'];


   $institution_id = getInstitutionIDbyName($dbh, $position['school']);

   if (is_null($institution_id)) {
     // if school doersnt exist create it
     $stmt = $dbh->prepare('INSERT INTO Institution
      (name) VALUES ( :name)');
     $stmt->execute(array(':name' => $position['school']));
     // write to institue database
     $institution_id = $dbh->lastInsertId();
     DBinsertEducation(
       $dbh,
       $position['pid'],
       $position['rank'],
       $position['year'],
       $institution_id
     );
   } else {

     DBinsertEducation(
       $dbh,
       $position['pid'],
       $position['rank'],
       $position['year'],
       $institution_id
     );
   }
 }
}

function getInstitutionIDbyName($dbh, $school)
{

 $stmt = $dbh->prepare('SELECT * FROM Institution WHERE Institution.name=:school');
 $stmt->execute(['school' => $school]);
 $data = $stmt->fetch();
 var_dump($data);
 return $data['institution_id'];
}

function DBinsertEducation($dbh, $profile_id, $rank, $year, $institution_id)
{

 $stmt = $dbh->prepare('INSERT INTO Education
           (profile_id, rank, year, institution_id)
       VALUES ( :pid, :rank, :year, :iid)');


 $stmt->execute(array(
   ':pid' => $profile_id,
   ':iid' => $institution_id,
   ':rank' => $rank,
   ':year' => $year

 ));
}


// clear out old positions
function deleteEducationEntries($dbh, $profile_id)
{
 $stmt = $dbh->prepare('DELETE FROM Education WHERE profile_id=:pid');
 $stmt->execute(array(':pid' => $profile_id));
}