# Web App Basics
Alberto Montilla Ochoa (A13573544)

## Implementation of PHP Apps:
All PHP apps live in my nginx server listening on port 82.

### 1. Hello World http://www.issin135.com:8082/helloworld.php 
Quite simple, HTML file with PHP code in it. A random integer 0-2 is generated in PHP to select the background color. The text is then echo’d displaying the date using a date object with a simpler format. 
Code in file: helloworld.php

### 2. Hello Data Types http://www.issin135.com:8082/hellodata.php?response=XML
The value of the response variable is found on “$_GET["response"]”, then a simple if statement checks for whether t was set to XML, JSON, or something else and on each case, it outputs the correct data. The strings are modified a bit so the output looks correct. Use the date object again for the timestamp.
Code in file: hellodata.php

### 3. Environment Variable Echo http://www.issin135.com:8082/envirovars.php 
In PHP, server variables and request headers live in “$_SERVER”, in the program they are echo’d except for the PHP_AUTH_PW and PHP_AUTH_USER, to protect server credentials. The only variable not displayed is the cookie variable, which lives in the “$_COOKIE” variable and is also displayls

Code in file: envirovars.php

### 4. Form Collection http://www.issin135.com:8082/formcollect.php 
A simple HTML form is created to collect the wanted information. The action is set to echo.php, which is where the data is processed. A bit of JavaScript is needed to dynamically change the method based on changing the method form to get or post. In echo.php, the program checks whether the “$_POST['first']” or “$_GET['first']” variable is set and then accesses the rest of the variables and displays them accordingly. Like in helloworld.php, the background color and date are displayed.
Code in files: formcollect.php and echo.php

### 5. Session Test http://www.issin135.com:8082/sessionpage1.php and http://www.issin135.com:8082/sessionpage2.php
A simple form collects the username, then a request is sent back sessionpage1.php so that the variable “$_SESSION['username']” can be set to the submitted form value. Then the user is directed to sessionpage2.php through “header('Location: sessionpage2.php')”. Then in sessionpage2.php, if “$_SESSION['username']” is set and not empty, it is displayed with a greeting. Otherwise it shows a “Howdy stranger message”. Another form to set a clear button is there, and sessionpage2.php checks if it was clicked and the session is reset with “session_unset()” and “session_destroy()”.
Code in files: sessionpage1.php and sessionpage2.php

### 7. REST Test http://www.issin135.com:8082/REST.php 
The REST interface is a simple form that changes the action dynamically to request the wanted page. The basis of this app is reading and writing to a JSON file from the PHP apps.
Code in file: REST.php

#### Create http://www.issin135.com:8082/REST/create.php 
A form to fill in for user information, once it is submitted, some PHP code opens the JSON file stored in server with PHP JSON operations. The user’s input login is checked to ensure it exists. If it does not exist, the user is recorded
Code in file: REST/create.php

#### Read http://www.issin135.com:8082/REST/read.php 
Similar to Create, a form just collects the login value and checks for existence in the JSON file. If so, the full name and admin information are displayed, otherwise a warning “User not found” message shows up.
Code in file: REST/read.php

#### Update http://www.issin135.com:8082/REST/update.php 
Again, a login is inserted and checks for existence. If so, the program checks whether the name or admin values were changed and updates the JSON file accordingly by finding the instance of the login and changing the fullname and admin variables.
Code in file: REST/update.php

#### Delete http://www.issin135.com:8082/REST/delete.php 
Like update, but once the name is found, the user is deleted from the JSON array with the “unset()” function
Code in file: REST/delete.php

## Implementation of Node JS Apps:
All Node JS apps live in app.js and other corresponding HTML files. The Node JS server remains active using PM2. 

### 1. Hello World http://www.issin135.com:3000/helloworld.js 
In app.js, the program looks for a request to /helloworld.js and serves an html file. In the HTML file, some JS code is used to parse a date object into a readable format,  generate a random number and assign it to a color, and display the final message
Code in file: app.js and helloworld.html

### 2. Hello Data Types http://www.issin135.com:3000/hellodata.js?response=XML
All the logic for this lives in app.js, the program looks for a request to /hellodata.js followed by any other headers. Then the response header is read from “req.param('response')”. If the response is XML or JSON, the content header is set to text/plain to server the files as strings. Otherwise the content header is set to text.html to serve a warning message
Code in file: app.js

### 3. Environment Variable Echo http://www.issin135.com:3000/envirovars.js 
In Node JS request headers live in the object “req.headers”, and server environment variables live in the object “process.env”, so in app.js it simply outputs all those values.
Code in file: app.js

### 4. Form Collection http://www.issin135.com:3000/formcollect.js 
When requested, a simple html is served to collect the data, here some JavaScript is in place to change the method dynamically depending on the user’s input. Once submitted it requests the echo app. Here there are two handlers, one for the get and another one for the post request. In the get request, the user’s input is collected through the variable “req.param(‘var_name’)” and in the post request through the variable “req.body.var_name”. Then a simple html file is printed with the respective name and background color, as well as a time stamp.
Code in files: formcollect.html and app.js

### 5. Session Test http://www.issin135.com:3000/sessionpage1.js and http://www.issin135.com:3000/sessionpage2.js 
A simple form collects the username, then a request is sent to sessionpage2.js. In app.js, the session is taken from the variable “req.session” and “req.session.username” is set. Then, according to this value a “Howdy stranger” message is sent or a greeting with the username is sent. Any time sessionpage2.js is requested the user can clear the session, which will request sessionpage2.js again with an empty username and the session will be updated like above. For this to take place, app.js needs to require ‘express-session’.
Code in files: sessionpage1.html and app.js

### 7. REST Test http://www.issin135.com:3000/REST 
The REST interface is a simple HTML form that changes the action dynamically to request the wanted page. The basis of this app is reading and writing to a JSON file from app.js. For Node JS, the apps are only accessed through the REST interface. For all the CRUD actions the applications handle request in two different ways, one if it is requested from the REST interface, or two, if it was requested from within itself after submitting the respective form.
Code in file: REST.html app.js

### Create 
If accessed from the RES interface, a simple form is served to collect the data. Once the form is submitted it takes the post variables from the “req.body” variable and an array corresponding to a new user is created. The JSON file is opened with “fs.readFileSync()” and parsed with “JSON.parse()” into an array. Here the login input is checked to not match with an existing one, if unique the new user is added onto the JSON array and written back with the “fs.writeFile()” method. If successful, a message is displayed below the newly served form.
Code in file: app.js

### Read
.Very Similar to crate, the input is read and login is ensured to exist. If so, the fullname and admin information is displayed from the array.
Code in file: app.js

### Update 
Again, a login is inserted and checks for existence. If so, the program checks whether the name or admin values were changed and updates the JSON file accordingly by finding the instance of the login and changing the full name and admin variables.
Code in file: app.js

### Delete 
Like update, but once the name is found, the user is deleted from the JSON array with the “splice()” function
Code in file: app.js

## Experience with PHP and Node JS
I thought PHP was very straight forward. Managing it all was simpler than JS in my experience because the files were accessed directly from the URL rather than having a central app (app.js) to do all the work. Having dynamic HTML files was also much easier in PHP, since all the PHP code live inside the HTML, where for Node JS the app.js code and HTML files work independently, ending with big chunks of HTML code inside app.js that just made coding organization much more difficult. I did not enjoy JS at all because of the distance between the JS code and HTML. PHP also had its limitations, like the dynamic setting of the form action or method had to be done with a bit of JavaScript.

## Plan for analytics project
I would want to check how the analytics tools behave with each language but if the implementation with PHP is not too complicated then I will definitely be choosing PHP over Node JS. 
