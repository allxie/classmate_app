// Require the modules we're going to need:
var express = require("express"),
    ejs = require("ejs"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");

// Now instantiate our express app:
var app = express();
// Tell express to use EJS as its view engine
app.set("view engine", "ejs");

//set up body parser
app.use(bodyParser.urlencoded({ extended: false }))

//fixes patch
app.use(methodOverride('_method'))

var cmates = [];
// Set a root route
app.get('/classmates', function(rec, res){
	res.render("index", { classmates: cmates });
});

//this renders a page to create a new classmate
app.get('/classmates/new', function(req, res){
	res.render('new');

});


//Posts a new classmate when you click submit
app.post("/classmates", function(req, res){
	//res.send("you got this far!");
	console.log(req.body);
	cmates.push(req.body);
	//res.send("student added!");
	res.redirect("/classmates");
});

//this creates a route to show a specific classmate
app.get('/classmates/:id', function(req,res){
	var id = req.params.id;
	res.render("show", {classmate: cmates[id - 1], id: id});
});

//to edit a classmate
app.get('/classmates/:id/edit', function(req, res){
	var id = req.params.id;
	res.render("edit", {classmate: cmates [id - 1], id: id});

});

//
app.patch('/classmates/:id', function(req, res){
	var id = req.params.id;
	// updates the classmate
	classmates[id - 1] = req.body;
	res.redirect("/classmates/" + id)
});

app.delete('/classmates/:id', function(req,res){
	var id = req.params.id;
	//delete the classmate
	cmates.splice(id-1, 1);
	res.redirect("/classmates");
});

app.listen(3000, function(){
	console.log("Server listening on port 3000!");
});