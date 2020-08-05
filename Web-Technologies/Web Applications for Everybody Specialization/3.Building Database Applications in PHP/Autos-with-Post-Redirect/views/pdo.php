<?php
$servername = "localhost";
$username = "dan";
$password = "zap";

try {
  $dbh = new PDO("mysql:host=$servername;dbname=misc", $username, $password);
  // set the PDO error mode to exception
  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 
  //$dbh = null;
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
  die();
}
?>