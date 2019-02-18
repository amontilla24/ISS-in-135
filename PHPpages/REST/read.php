<!DOCTYPE HTML>
<html>
  <head>
    <title>
      Read user information
    </title>
  </head>
  <body>

    <form method="post" name="myform" action="/REST.php" id="form"><br>
      <br><input type="submit" name="submit" id="submit" value="Return to main menu">
    </form>

    <h2>Read user information with PHP</h2>

    <form method="post" name="myform" action="/REST/read.php" id="form">
      <input type="hidden" id="form" name="form" value="read">
      Login: <input type="text" name="login"><br><br>
      <input type="submit" name="submit" id="submit" value="Show my information!">
    </form>

    <?php
      
      //Handle user input
      if(isset($_POST['form']) && $_POST['form'] == "read"){
        $login = $_POST['login'];

        //File handling
        $file = "phpDB.json";
        $json = json_decode(file_get_contents($file), true);

        //Check if login is unique
        $found = false;  
        for ($i = 0; $i  sizeOf($json["users"]); $i++) {

          //Check if found
          if( isset($_POST['login']) && $_POST['login']!="" && 
            $json["users"][$i]["login"] == $login){

            $found = true;
            $admin = "No";
            if($json["users"][$i]["admin"] == true){
              $admin = "Yes";
            }
            echo "<font color=\"green\">Full name: {$json["users"][$i]["fullname"]}</font>";
            echo "<br><font color=\"green\">Admin access? {$admin}</font>"; 
          }
        }
        if(!$found){
          echo "<font color=\"red\">User {$login} not found!</font>";
        }
      }
    ?>
  </body>
</html>
