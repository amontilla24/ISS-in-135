<!DOCTYPE html>
<html>
  <head>
    <title>PHP Form</title>
  </head>
  <body>

  <h2>PHP Form</h2>

  <form method="" name="myform" action="echo.php" id="form">

    First name: <input type="text" name="first"><br>
    Last name: <input type="text" name="last" id="lname"><br>

    <label for='color'>Favorite Color:</label><br>
    <select name="color">
      <option value="Green">Green</option>
      <option value="Blue">Blue</option>
      <option value="Yellow">Yellow</option>
      <option value="Red">Red</option>
      <option value="Purple">Purple</option>
      <option value="Orange">Orange</option>
    </select><br>

    <label for='sendmethod'>Method:</label><br>
    <select onchange="val()" id="sendmeth" name="sendmethod">
      <option value="get">GET</option>
      <option value="post">POST</option>
    </select><br>


    <input type="submit" name="submit" id="submit" value="Submit">
    </form>

    <script>
      function val() {
        meth = document.getElementById("sendmeth").value;
        document.myform.method = meth;
      }
    </script>

  </body>
</html>
