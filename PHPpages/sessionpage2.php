<?php
session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Session 2 PHP</title>
  </head>
  <body>

    <h2>You are on PHP Session Page 2!</h2>

    <?php

    $username = "";
    if(isset($_SESSION['username'])){
    $username = $_SESSION['username'];
    echo "Hi ".$username." nice to meet you!";
    }
    else{
    echo "Howdy stranger. Please tell me your name on page1!";
    }

    ?>

    <form action="sessionpage2.php" method="post">
      <input type="submit" name="clear" value="Clear Session" />
    </form>

    <?php
      if($_SERVER['REQUEST_METHOD'] == "POST" and isset($_POST['clear']))
      {
        clr();
      }
      function clr()
      {
        //Remove all session variables
        session_unset(); 
        session_destroy();
        header('Location: sessionpage2.php');       
      }
    ?>
  </body>
</html>
