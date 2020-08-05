<?php


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
 $stmt->execute(array( ':pid' => $profile_id));
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