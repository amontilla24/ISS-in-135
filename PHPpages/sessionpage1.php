<?php
session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Session 1 PHP</title>
  </head>
  <body>

    <h2>You are on PHP Session Page 1!</h2>

    <form action="sessionpage1.php" name="form" method="post">
      Username: <input type"text" name="username" id="username"></textarea><br />
    <a onclick="document.forms['form'].submit();" href="#">Check session on page 2</a>
    </form>

    <?php
      //Set session variable
      if($_SERVER['REQUEST_METHOD'] == "POST" and isset($_POST['username']))
      {
        if(!empty($_POST['username'])){ 
          $_SESSION['username'] = $_POST['username'];
        }
        header('Location: sessionpage2.php');
        exit;
      }
    ?>
  </body>
</html>
