var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

//import pokedex from json
var pokemonls = require("./pokedex.json");
//import module for pokeDex search 
var search = require("./search.js");
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var multer  =   require('multer');
var firebase = require("firebase");

var MongoClient = mongodb.MongoClient;



var PokemonLoc = mongoose.model('PokemonLoc', {name: String, location: Array, timestamp: Number});

var bulbarsaur = new PokemonLoc({name: 'Bulbarsaur', location: [51.5034070, -0.1275920], timestamp: 1468433363 });

console.log(bulbarsaur);



// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  databaseURL: "https://pokemonmap-14a87.firebaseio.com",
  serviceAccount: "./PokemonMap-777da46ecabe.json"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = firebase.database();
var ref = db.ref("server/saving-data/pokemondata");
var usersRef = ref.child("users");



usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1907",
    full_name: "Grace Hopper"
  }
}, function(error) {
	if (error) {
    console.log("Data could not be saved." + error);
  } else {
    console.log("Data saved successfully.");}
});

// Update the database record.
// var hopperRef = usersRef.child("gracehop");
// hopperRef.update({
//   "nickname": "Amazing Grace"
// });


console.log(search.pokeSearch('Charmander', pokemonls) ? 'pokemon found!': 'pokemon not found!');

console.log('before app get');



app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});