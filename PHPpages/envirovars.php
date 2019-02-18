<?php
  
  //Output server variables
  while (list($var,$value) = each ($_SERVER)) {
    if($var != "PHP_AUTH_PW" && $var != "PHP_AUTH_USER" ){	
      echo "$var => $value <br />";
    }
  }

  //Output cookie variable
  while (list($var,$value) = each ($_COOKIE)) {
    echo "COOKIE => $var: $value <br />";
  }
?>
