console.log("Starting server");

const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const jwtkey = 'my_secret_key';

const  app = express();

app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, DELETE, PATCH');
  if('OPTIONS' == req.methods)
  {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// some data for the API

let users = [];

users = [
  { "id": 2, "name": "Harjinder", "surname": "Sandhu", "email": "harjinder.sandhu@stud.unifi.it", "password": "ginger", "address": "Via Roma 10, Arezzo (AR)"}
];



// LOGIN endpoint for user authentication
app.post('/login', function (req, res){

  let email = req.body.email;
  let password = req.body.password;

  let u = users.find(x => x.email == email);

  if(u != undefined)
  {
    if (email === u.email && password === u.password) {
      let payload = { id: u.id, name: u.name, email: u.email };
      let token = jwt.sign(payload, jwtkey, {expiresIn: '24h'});
      res.status(200).send({token});
    }
    else {
      res.status(401).send("Invalid email or password");
    }
  }
  else {
    res.status(401).send("Invalid email or password");
  }
});

// POST endpoint for creating a new user
app.post('/signup', function (req, res) {
  // NOTE: This is a sample app to show the Angular Http client functionality.
  // This API endpoint keeps the submitted data in memory. It does not save to a database.

  // This example uses Express because it is easy to install and run.
  // You could write a different back-end app in PHP, Python, Ruby, .NET, etc.

  // calculate the next ID
  let id = 1;
  if (users.length > 0) {
    let maximum = Math.max.apply(Math, users.map(function (f) { return f.id; }));
    id = maximum + 1;
  }
  let new_user;
  new_user = {"id": id, "name": req.body.name, "surname": req.body.surname, "email": req.body.email, "password": req.body.password, "address": req.body.address};
  console.log(new_user);
  // build the new user object
  // "save" the data by adding it to the "user" array in memory
  users.push(new_user);
  // In the real world, you would put code here to save the data to a database or another type of storage.

  // When we're done, it's nice to return the newly created object to the caller.
  res.send(new_user);
});

// the GET "user" API endpoint
app.get('/user/:id', function (req, res) {

  let id = req.params.id;
  console.log(id);
  let u = users.find(x => x.id == id);

  if( u == null){
    return res.status(404).send('User not found');
  }
  else{
    res.send(u);
  }
});

// PUT endpoint for editing users
app.put('/user/:id', function (req, res) {

  // read the ID from the query string
  let id = req.params.id;
  console.log("PUT user: " + id);

  // find the requested user in the array
  let f = users.find(x => x.id == id);

  // write the new name to the data storage
  if(req.body.name != null && req.body.name != ""){
    f.name = req.body.name;
  }
  if(req.body.surname != null && req.body.surname != "")
  {
    f.surname = req.body.surname;
  }
  if(req.body.email != null && req.body.email != ""){
    f.email = req.body.email;
  }
  if(req.body.password != null && req.body.password != "")
  {
    f.password = req.body.password;
  }
  if(req.body.address != null && req.body.address != "")
  {
    f.address = req.body.address;
  }
  // send a copy of the modified object back to the caller
  res.send(f);

});

// DELETE endpoint for user
app.delete('/user/:id', function (req, res){
  console.log("DELETE user: " + req.params.id);

  let id = req.params.id;
  let f = users.find(x => x.id == id);

  users = users.filter(x => x.id != id);

  res.send(f);
});


app.listen(8000, function(){
  console.log('Server is now listening on 8000');
});

module.exports = app;
