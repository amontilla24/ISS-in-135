<!DOCTYPE HTML>
<html>
  <head>
    <title>PHP Hello World</title>
  </head>

  <?php 

    $randnum = rand(0,2);
    $color = "WHITE";

    if($randnum == 1){
      $color = "BLUE";
    }
    elseif($randnum == 2){
      $color = "YELLOW";
    }
  ?>

  <body bgcolor="<?php echo $color; ?>">

  <?php 
    echo 'Hello Web World from Language PHP on '
          .date("D M d, G:i a").', enjoy my '.$color.' page!';
  ?>
  </body>
</html>
