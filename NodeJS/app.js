#!/usr/bin/env nodejs

//Imports
var fs = require("fs");
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var backgroundcolor;
var server = app.list;

const { parse } = require('querystring');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'this-is-a-secret-token'}));

//----------------------------------
//--    Program 1: Hello World    --
//----------------------------------
app.get('/helloworld.js', (req, res) => {

    //Output html file
    fs.readFile("JSpages/helloworld.html", function(err, data){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });

});

//---------------------------------------
//--    Program 2: Hello Data Types    --
//---------------------------------------
app.get('/hellodata.js?', (req, res) => {

    //Get response param 
    response = req.param('response')
    
    //XML response
    if(response == "XML"){
       res.writeHead(200, {'Content-Type': 'text/plain'});
       res.write("<xml version=\'1.0\' encoding=\'UTF-8\'?>\n");
       res.write("Hello Data it's " + timestamp());
    }

    //JSON response
    else if(response == "JSON"){
       res.write("{\n\t\"msg\" : \"Hello Data it's "+timestamp()+"\n}")
    }

    //Error
    else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("<h1>Error: Specify response parameter</h1>");
    }
    res.end();
});

//--------------------------------------------
//--  Program 3: Environment Variable Echo  --
//--------------------------------------------
app.get('/envirovars.js', (req, res) => {

    res.writeHead(200, {'Content-Type': 'text/plain'});

    //Output request headers
    var out = '';
    var o = req.headers;
    for (var p in o) {
      out += p + ': ' + o[p] + '\n';
    }
    res.write(""+out);

    //Output server variables
    var out = '';
    var en = process.env;
    for (var p in en) {
      out += p + ': ' + en[p] + '\n';
    }
    res.write(""+out);
     
    res.end();
});

//----------------------------------
//--  Program 4: Form Collection  --
//----------------------------------
app.get('/formcollect.js', (req, res) => {
    
    //Output HTML form
    fs.readFile("JSpages/formcollect.html", function(err, data){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });

});

//GET request for echo program 
app.get('/echo?', (req, res) => { 

  //Access user input
  var first = req.param('first');
  var last = req.param('last');
  var color = req.param('color');
    
  //Output message
  var message = "Hello "+first+" "+last+
    " from a Web app written in JavaScript on " + timestamp();
    
  //HTML code delivered
  res.setHeader('Content-type','text/html');  
  let msg = "<html><head><title>Index</title></head><body>"+
    "<p id=\"demo\"></p><script>var color = \""+color+"\";"+
    "document.body.style.backgroundColor = color;"+
    "var str = \""+message+"\"; document.getElementById"+
    "(\"demo\").innerHTML = str;</script></body></html>";
    
  res.end(msg);
});

//GET request for echo program 
app.post('/echo?', (req, res) => {

    //Access user input
    var first = req.body.first;
    var last = req.body.last;
    var color = req.body.color;

    //output message
    var message = "Hello "+first+" "+last+
      " from a Web app written in JavaScript on " + timestamp();
    
    //HTML code delivered
    res.setHeader('Content-type','text/html');  
    let msg = "<html><head><title>Index</title></head><body><p id=\"msg\">"+
      "</p><script>var color = \""+color+"\";document.body.style."+
      "backgroundColor = color;var str = \""+message+"\"; document"+
      ".getElementById(\"msg\").innerHTML = str;</script></body></html>";

    res.end(msg);
});

//---------------------------------
//--   Program 5: Session Test   --
//---------------------------------
app.get('/sessionpage1.js?', (req, res) => {
 
  //Output HTML delivered
  fs.readFile("JSpages/sessionpage1.html", function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });

});

// Session 2 Page POST request
app.post('/sessionpage2.js?', (req, res) => {

  // Get session and input
  var sessData = req.session;
  sessData.username = req.body.username;
  var username = req.body.username;

  // Choose greeting from input
  var greeting = "";
  if(username == "" || username == null){
    greeting = "Howdy stranger. Please tell me your name on page1!";
  }
  else{
    greeting = "Hi "+username+" nice to meet you!";
  }
  
  // Deliver HTML
  res.setHeader('Content-type','text/html');
  var message = "<html><head><title>Session 2 JavaScript</title></head><body>"+
    "<h2>You are on JavaScript Session Page 2!</h2>"+greeting+
    "<form action=\"sessionpage2.js\" method=\"post\">"+
    "<input type=\"hidden\" id=\"username\" name=\"username\" value=\"\">"+
    "<input type=\"submit\" name=\"clear\" value=\"Clear Session\"/>"+
    "</form></body></html>";
  
  res.end(message);
});

// Session 2 Page GET request
app.get('/sessionpage2.js?', (req, res) => {

  // Get session
  var username = req.session.username;

  // Choose greeting from session
  var greeting = "";
  if(username == "" || username==null){
    greeting = "Howdy stranger. Please tell me your name on page1!";
  }
  else{
    greeting = "Hi "+username+" nice to meet you!";
  }
  
  // Deliver HTML
  res.setHeader('Content-type','text/html');
  var message = "<html><head><title>Session 2 JavaScript</title></head><body>"+
    "<h2>You are on JavaScript Session Page 2!</h2>"+greeting+
    "<form action=\"sessionpage2.js\" method=\"post\">"+
    "<input type=\"hidden\" id=\"username\" name=\"username\" value=\"\">"+
    "<input type=\"submit\" name=\"clear\" value=\"Clear Session\"/>"+
    "</form></body></html>";

  res.end(message);
});

//------------------------------
//--   Program 7: REST Test   --
//------------------------------
app.all('/REST', (req, res) => {

  // Deliver REST interface HTML
  fs.readFile("JSpages/REST.html", function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });

});

// REST action: Create
app.post('/REST/create', (req, res) => {

  // If no input has been submitted
  if(req.body.form == "initial"){
  
      var message =
  "<html><head><title>Create New User</title></head><body>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST\" id=\"form\">"+
  "</select><br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Return to main menu\"></form>"+
  "<h2>Create New User with JavaScript</h2>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST/create\" id=\"form\">"+
  "<input type=\"hidden\" id=\"form\" name=\"form\" value=\"created\">"+
  "Full name: <input type=\"text\" name=\"name\"><br>"+
  "Login: <input type=\"text\" name=\"login\"><br><label for='admin'>"+
   "Admin:</label><br>"+
  "<select name=\"admin\"><option value=\"yes\">Yes"+
  "</option><option value=\"no\">No</option>"+
  "</select><br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Submit\"></form></body></html>";    
 
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(message);
  }

  // Handle input from submitted form
  else if (req.body.form == "created"){

  // Read input
  var inputLogin = req.body.login;
  var admin_form = true;
  if(req.body.admin == "no"){ admin_form = false;}

  // Make new user
  var newUser = {
    fullname: req.body.name,
    login: req.body.login,
    admin: admin_form
  };

  // File handling
  var contents = fs.readFileSync('./myDB.json', 'utf8');
  var arrayOfObjects = JSON.parse(contents);

  // Check if login inout is found
  var found = false;
    for( var i=0; i<arrayOfObjects.users.length;i++){

      var userLogin = arrayOfObjects.users[i].login;
      if(userLogin == inputLogin){
        found = true;
      }
    }

  // Create output message
  var result = "<font color=\"red\">User "+req.body.login+" already exists!";;
  if(!found){
    arrayOfObjects.users.push(newUser);
    result = "<font color=\"green\">Succesfully created user "+req.body.login+"!";
    fs.writeFile("myDB.json", JSON.stringify(arrayOfObjects), (err) => {});
  }

  // Deliver HTML
  res.writeHead(200, {'Content-Type': 'text/html'});
  var message = 
  "<html><head><title>Create New User</title></head><body>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST\" id=\"form\">"+
  "</select><br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Return to main menu\"></form>"+
  "<h2>Create New User with javaScript</h2>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST/create\" id=\"form\">"+
  "<input type=\"hidden\" id=\"form\" name=\"form\" value=\"created\">"+
  "Full name: <input type=\"text\" name=\"name\"><br>"+
  "Login: <input type=\"text\" name=\"login\"><br><label for='admin'>"+
   "Admin:</label><br>"+
  "<select name=\"admin\"><option value=\"yes\">Yes"+
  "</option><option value=\"no\">No</option>"+
  "</select><br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Submit\"></form>"+ result +
  "</font></body></html>";

  res.end(message);
  }
});

// REST action: Read
app.post('/REST/read', (req, res) => {

  // If no input has been submitted
  if(req.body.form == "initial"){

    var message =
  "<html><head><title>Read User Information</title></head><body>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST\" id=\"form\">"+
  "</select><br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Return to main menu\"></form>"+
  "<h2>Read Your information with Javascript</h2>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST/read\" id=\"form\">"+
  "<input type=\"hidden\" id=\"form\" name=\"form\" value=\"read\">"+
  "Login: <input type=\"text\" name=\"login\"><br><br>"+
  "<input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Show my information!\"></form>"+
  "</body></html>";

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(message);
  }

  // Handle input submitted from form
  else if (req.body.form == "read"){
    
    // Read inout
    var inputLogin = req.body.login;
    var contents = fs.readFileSync('./myDB.json', 'utf8');
    var arrayOfObjects = JSON.parse(contents);

    var fullName="";
    var admin="";
    
    // Check if input login exist
    var found = false;    
    for( var i=0; i<arrayOfObjects.users.length;i++){

      var userLogin = arrayOfObjects.users[i].login;
      
      if(userLogin == inputLogin){
        found = true;
        fullName = arrayOfObjects.users[i].fullname;
        admin = "No";
        if(arrayOfObjects.users[i].admin){
          admin = "Yes";
        }
      }
    }

    // Create output message
    var result = "<font color=\"red\">Sorry that user does not exist!</font>";

    if(found){
    result = "<font color=\"green\">User Full Name: "+fullName+"</font><br>"+
      	         "<font color=\"green\">Admin Access? "+admin+"</font>";
    }

    // Deliver HTML
    var message =
  "<html><head><title>Read User Information</title></head><body>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST\" id=\"form\">"+
  "</select><br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Return to main menu\"></form>"+
  "<h2>Read Your information with Javascript</h2>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST/read\" id=\"form\">"+
  "<input type=\"hidden\" id=\"form\" name=\"form\" value=\"read\">"+
  "Login: <input type=\"text\" name=\"login\"><br><br>"+
  "<input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Show my information!\"></form>"+ result +
  "</body></html>";
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(message);
  }
});


// REST action: Update
app.post('/REST/update', (req, res) => {

  // If no input has been made
  if(req.body.form == "initial"){

    var message =
    "<html><head><title>Read User Information</title></head><body>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST\" id=\"form\">"+
  "</select><br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Return to main menu\"></form>"+
  "<h2>Read Your information with Javascript</h2>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST/update\" id=\"form\">"+
  "<input type=\"hidden\" id=\"form\" name=\"form\" value=\"update\">"+
  
  "Login to be updated: <input type=\"text\" name=\"login\"><br><br>"+
  "<label for='admin'>"+
  "New full name (leave blank to keep current):"+
  "<br><input type=\"text\" name=\"name\"><br><br>"+
  
  "<label for='admin'>Admin:</label>"+
  "<select name=\"admin\"><option value=\"keep\">Keep current"+
  "</option><option value=\"yes\">Yes</option>"+
  "<option value=\"no\">No</option>"+
  "</select><br>"+

  "<br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Update my information!\"></form>"+
  "</body></html>";

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(message);
  }

  // Handle user input
  else if (req.body.form == "update"){

    // Read in input
    var inputLogin = req.body.login;
    var newName = req.body.name;
    var newAdmin = req.body.admin;

    // File handling
    var contents = fs.readFileSync('./myDB.json', 'utf8');
    var arrayOfObjects = JSON.parse(contents);

    var found = false;

    // Check if input login exists
    for( var i=0; i<arrayOfObjects.users.length;i++){

      var userLogin = arrayOfObjects.users[i].login;

      if(userLogin == inputLogin){
        found = true;
        
	if(newName != "" && newName != null){        
          arrayOfObjects.users[i].fullname = newName;
	}

        if(newAdmin != "keep"){
          arrayOfObjects.users[i].admin = true;
          if(newAdmin == "no"){
            arrayOfObjects.users[i].admin = false;
          }
        }
      }
    }
    fs.writeFile("myDB.json", JSON.stringify(arrayOfObjects), (err) => {});

    // Create output message
    var result = "<font color=\"red\">Sorry user "+inputLogin+
      " does not exist!</font>";

    if(found){
    result = "<font color=\"green\">"+inputLogin+
      " information updated!</font><br>";
    }

    // deliver HTML
    var message =
  "<html><head><title>Read User Information</title></head><body>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST\" id=\"form\">"+
  "</select><br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Return to main menu\"></form>"+
  "<h2>Read Your information with Javascript</h2>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST/update\" id=\"form\">"+
  "<input type=\"hidden\" id=\"form\" name=\"form\" value=\"update\">"+

  "Login to be updated: <input type=\"text\" name=\"login\">"+
  "<br><br><label for='admin'>"+
  "New full name (leave blank to keep current):"+
  "<br><input type=\"text\" name=\"name\"><br><br>"+

  "<label for='admin'>Admin:</label>"+
  "<select name=\"admin\"><option value=\"keep\">Keep current"+
  "</option><option value=\"yes\">Yes</option>"+
  "<option value=\"no\">No</option>"+
  "</select><br>"+

  "<br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Update my information!\"></form><br><br>"+result+
  "</body></html>";  
 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(message);
  }
});

// REST action: delete
app.post('/REST/delete', (req, res) => {

  // If no input has been made
  if(req.body.form == "initial"){
    
    var message =
    "<html><head><title>Delete User</title></head><body>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST\" id=\"form\">"+
  "</select><br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Return to main menu\"></form>"+
  "<h2>Delete your user information with JavaScript</h2>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST/delete\" id=\"form\">"+
  "<input type=\"hidden\" id=\"form\" name=\"form\" value=\"delete\">"+
  
  "Login of user to be deleted:<br><input type=\"text\" name=\"login\"><br>"+
  
  "<br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Delete user\"></form>"+
  "</body></html>";
      
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(message);
  }

  // Handle user input
  else if (req.body.form == "delete"){

   // Read in input
   var inputLogin = req.body.login;

    // File handling
    var contents = fs.readFileSync('./myDB.json', 'utf8');
    var arrayOfObjects = JSON.parse(contents);

    // Check if user is found
    var found = false;
    for( var i=0; i<arrayOfObjects.users.length;i++){

      var userLogin = arrayOfObjects.users[i].login;

      if(userLogin == inputLogin){
        found = true;
       
        // Delete user
        arrayOfObjects.users.splice(i,1);
      }
    }
    fs.writeFile("myDB.json", JSON.stringify(arrayOfObjects), (err) => {});

    // Output message
    var result = "<font color=\"red\">Sorry user "+inputLogin+
      " does not exist!</font>";

    if(found){
    result = "<font color=\"green\">User "+inputLogin+" deleted!!</font><br>";
    }

    // Deliver HTML
    var message =
  "<html><head><title>Delete User</title></head><body>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST\" id=\"form\">"+
  "</select><br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Return to main menu\"></form>"+
  "<h2>Delete your user information with JavaScript</h2>"+
  "<form method=\"post\" name=\"myform\" action=\"/REST/delete\" id=\"form\">"+
  "<input type=\"hidden\" id=\"form\" name=\"form\" value=\"delete\">"+

  "Login of user to be deleted:<br><input type=\"text\" name=\"login\"><br>"+

  "<br><input type=\"submit\" name=\"submit\" "+
  "id=\"submit\" value=\"Delete user\"></form>"+ result +
  "</body></html>";

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(message);
  }
});

app.listen(3000, () => console.log('app.js listening on port 3000!'));

// Function that returns timestamp
function timestamp(){
  var myDate = new Date();

  var month=new Array();
  month[0]="Jan";
  month[1]="Feb";
  month[2]="Mar";
  month[3]="Apr";
  month[4]="May";
  month[5]="Jun";
  month[6]="Jul";
  month[7]="Aug";
  month[8]="Sep";
  month[9]="Oct";
  month[10]="Nov";
  month[11]="Dec";
  
  var hours = myDate.getHours();
  var minutes = myDate.getMinutes();
  var seconds = myDate.getSeconds();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ':' + seconds + ampm;
  
  var datestr = myDate.getDate()+" "+month[myDate.getMonth()]+" "+
    myDate.getFullYear()+" "+strTime;
  return datestr;
}
