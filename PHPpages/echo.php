<!DOCTYPE HTML>
<html>
  <head>
    <title>Form Results!</title>
  </head>
  <?php
    
    //Handle POST request 
    if(isset($_POST['first']))
    {
    $last = $_POST['last'];
    $first = $_POST['first'];
    $color = $_POST['color'];
    $method = $_POST['sendmethod'];

    $date = new DateTime();
    $date = DateTime::createFromFormat('Y-m-d', date('Y-m-d'));
    $date = $date->format('d M Y g:i:s a');

    echo 'Hello '.$first.' '.$last.' from a Web app written in PHP on '.$date.'';

    }
  ?>

  <?php

    //Handle GET request
    if(isset($_GET['first']))
    {
    $last = $_GET['last'];
    $first = $_GET['first'];
    $color = $_GET['color'];
    $method = $_GET['sendmethod'];

    $date = new DateTime();
    $date = DateTime::createFromFormat('Y-m-d', date('Y-m-d'));
    $date = $date->format('d M Y g:i:s a');

    echo 'Hello '.$first.' '.$last.' from a Web app written in PHP on '.$date.'';
    }
  ?>

  <body bgcolor="<?php echo $color; ?>">
  </body>
</html>
