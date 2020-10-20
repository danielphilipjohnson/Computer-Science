<!DOCTYPE html>
<html>
<head>
        <title>Danel Johnson PHP</title>
</head>
<body>
        <h1>Daniel Johnson PHP</h1>

        <?php
            $name_hash = hash('sha256', 'Daniel Johnson');
            echo "The SHA256 hash of Daniel Johnson is " .  $name_hash;
        ?>


        <pre>
        ASCII ART:
        ________
        \______ \
         |    |  \
         |    `   \
        /_______  /
                \/
        </pre>

        <a href="check.php">Click here to check the error setting</a>
        <br>
        <a href="fail.php">Click here to cause a traceback</a>

</body>

</html>