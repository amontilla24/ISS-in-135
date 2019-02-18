<!DOCTYPE HTML>
<html>
  <head>
    <title>
      Create New User
    </title>
  </head>
  <body>

  <form method="post" name="myform" action="/REST.php" id="form"><br>
    <input type="submit" name="submit" id="submit" value="Return to main menu">
  </form>

  <h2>Create New User with PHP</h2>

  <form method="post" name="myform" action="/REST/create.php" id="form">
    <input type="hidden" id="form" name="form" value="created">
    Full name: <input type="text" name="name"><br>
    Login: <input type="text" name="login"><br>
    <label for='admin'>Admin:</label><br>

    <select name="admin">
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select><br>

    <input type="submit" name="submit" id="submit" value="Submit">
  </form>

  <?php

    if(isset($_POST['form']) && $_POST['form'] == "created"){

      //Get user input
      $name = $_POST['name'];
      $login = $_POST['login'];

      $admin = false;
      if($_POST['admin'] == "yes"){
        $admin = true;
      }

      //Create new user
      $newUser = array("fullname"=>$name, "login"=>$login, "admin"=>$admin); 

      //File handling
      $file = "phpDB.json";
      $json = json_decode(file_get_contents($file), true);

      //Find user input
      $found = false;
      for ($i = 0; $i < sizeOf($json["users"]); $i++) {

        if($json["users"][$i]["login"] == $login){
          $found = true;
        }
      }

      //Add user and write back to file
      if(!$found){
        array_push($json["users"], $newUser);
        $jsondata = json_encode($json, JSON_PRETTY_PRINT);

        if(file_put_contents($file, $jsondata)) {
          echo "<font color=\"green\">User {$login} successfully created!</font>";
        }
        else{ 
          echo "Error writing to file";
        }
      } 
      
      //Error message
      else{
        echo "<font color=\"red\">User {$login} already exists!</font>";
      }
    }
  ?>
</body>
</html>
