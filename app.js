//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();

var items = ["Buy Food", "Cook Food", "Eat Food"];
//everytime we get a new post request and a new var for item, it is appended here
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
})); //allows us to use req.body.example
app.use(express.static("public"));

app.get('/', function(req, res) {
  // this is where we land when we load localhost:3000

  // res.render('index', {foo: 'FOO'});
  // uses the view engine set up in app.set to render a page called 'index'
  // assumes a views directory containing an index.ejs file exists


  let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items
  }); //ejs will look inside the views folder to look for a file call "Lists.ejs"
  // in list.ejs, kindOfDay will equal the day variable specified in this file
  // in practice, both variables would usually be named day, e.g. day: day
});


// if (currentDay === 6 || currentDay === 0) {
//   day = "Weekend";
// } else {
//   day = "Weekday";
// }

app.post("/", function(req, res) { //receives our input from our form on list.ejs
  var item = req.body.newItem; //we tap into the request from list.ejs and search for the value of newItem that was submitted by the user

  if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/"); //when a post request is triggered on our home route, we save the value of newItem into the var items
    //will redirect to the home route, which sends us to app.get, and res.render the list template, passing in the kind of day and the new item
  }

});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function (req,res){
  res.render("about");
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log("server is running on port 3000");
});
