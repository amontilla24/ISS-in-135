<!DOCTYPE HTML>
<html>
  <head>
    <title>PHP Hello Data</title>
  </head>
  <body>
    <?php 
      
      //Get response
      $error = 0;
      $response =  $_GET["response"];
      $response = strtolower($response);
  
      //Handle XML
      if($response == "xml"){
        $XML = '<?xml version=\'1.0\' encoding=\'UTF-8\'?>';
        $XML = str_replace('&', '&amp;', $XML);
        $XML = str_replace('<', '&lt;', $XML);
        echo '<pre>' . $XML . '</pre>';
        $xmlcontent = "Hello Data it's ".date("D M d, G:i a")."";
        echo "<pre>\n$xmlcontent</pre>";
      }
      
      //Handle HTML
      else if ($response == "json"){
        echo "<pre>{\n\t\"msg\" : \"Hello Data it's ".date("D M d, G:i a")."\n}";
      }
 
      //Handle if neither
      else{
        $error = 1;
      }
    ?>
    <h1>
     <?php
 
      //Outout error id set 
      if($error == 1){
        echo "Error: Specify response paramter";
      }
    ?>
  </h1>
  </body>
</html>
