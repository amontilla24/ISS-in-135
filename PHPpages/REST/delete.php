<!DOCTYPE HTML>
<html>
  <head>
    <title>
      Delete user information
    </title>
  </head>
  <body>

    <form method="post" name="myform" action="/REST.php" id="form">
      </select>
      <br><input type="submit" name="submit" id="submit" value="Return to main menu">
    </form>

    <h2>Delete your user with PHP</h2>

    <form method="post" name="myform" action="/REST/delete.php" id="form">
      <input type="hidden" id="form" name="form" value="delete">
      Login of user to be deleted:<br>
      <input type="text" name="login"><br><br>
      <input type="submit" name="submit" id="submit" value="Delete user">
    </form>

    <?php
    
       //Handle user input
       if(isset($_POST['form']) && $_POST['form'] == "delete"){

         $login = $_POST['login'];

         //File handling
         $file = "phpDB.json";
         $json = json_decode(file_get_contents($file), true);

         //Check if input exists
         $found = false;  
         for ($i = 0; $i < sizeOf($json["users"]); $i++) {

           //Check match
           if( isset($_POST['login']) && $_POST['login']!="" && 
               $json["users"][$i]["login"] == $login){
     
             //If match, delete accordingly
             $found = true;
             unset($json["users"][$i]);
             $jsondata = json_encode($json, JSON_PRETTY_PRINT);
             
             if(file_put_contents($file, $jsondata)) {
               echo "<font color=\"green\">User {$login} successfully deleted!</font>";
             }
             else{
               echo "Error writing to file";
             }
           }
        }
        //Error message
        if(!$found){
          echo "<font color=\"red\">User {$login} not found!</font>";
        }
      }
    ?>
  </body>
</html>
