<!DOCTYPE HTMl>
<html>
  <head>
    <title>Update User Information</title>
  </head>
  <body>
    
    <form method="post" name="myform" action="/REST.php" id="form"><br>
      <input type="submit" name="submit" id="submit" value="Return to main menu">
    </form>
 
    <h2>Update your information with PHP</h2>

    <form method="post" name="myform" action="/REST/update.php" id="form">
      
      <input type="hidden" id="form" name="form" value="update">
      Login to be updated: <input type="text" name="login"><br><br>
      <label for='name'>New full name (leave blank to keep current):<br>
      <input type="text" name="name"><br><br>
      <label for='admin'>Admin:</label><select name="admin">
        <option value="keep">Keep current</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select><br><br>
      <input type="submit" name="submit" id="submit" value="Update my information!">
    </form>

  <?php
  
  // Handle user input
  if(isset($_POST['form']) && $_POST['form'] == "update"){

    $login = $_POST['login'];

    //File handling
    $file = "phpDB.json";
    $json = json_decode(file_get_contents($file), true);

    //Check if login exist
    $found = false;
    for ($i = 0; $i < sizeOf($json["users"]); $i++) {

      //Check for match
      if($json["users"][$i]["login"] == $login){
        $found = true;

        //If match, update accordingly based on input
        if(isset($_POST['name']) && $_POST['name'] != ""){
          $json["users"][$i]["fullname"] = $_POST['name'];
        }
        
        if($_POST['admin'] == "yes"){
          $json["users"][$i]["admin"] = true;   
        }
 
        else if($_POST['admin'] == "no"){
          $json["users"][$i]["admin"] = false;
        }
      }
    }

    //Handle output message
    if($found){
      $jsondata = json_encode($json, JSON_PRETTY_PRINT);

      if(file_put_contents($file, $jsondata)) {
        echo "<br><br><font color=\"green\">User {$login} successfully updated!</font>";
      }
      else{
        echo "Error writing to file";
      }
    }
    else{
      echo "<br><br><font color=\"red\">User {$login} does not exists!</font>";
    }
  }

  ?>

  </body>
</html>
