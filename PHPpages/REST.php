<!DOCTYPE html>
<html>
  <head>
    <title>PHP REST application</title>
  </head>
  <body>

    <h2>PHP REST application</h2>

    <form method="post" name="myform" action="./REST/create.php" id="form">

      <input type="hidden" id="form" name="form" value="initial">

      <label for='action'>Select what you want to do:</label><br>
      <select onchange="val()" id="action" name="action">
        <option value="REST/create.php">Create</option>
        <option value="REST/read.php">Read</option>
        <option value="REST/update.php">Update</option>
        <option value="REST/delete.php">Delete</option>
      </select><br><br>

      <input type="submit" name="submit" id="submit" value="  Go!  ">
    </form>

    <script>
      function val() {
        action = document.getElementById("action").value;
        document.myform.action = action;
      }
    </script>

  </body>
</html>
