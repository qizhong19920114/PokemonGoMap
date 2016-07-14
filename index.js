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




var MongoClient = mongodb.MongoClient;

var url ='mongodb://localhost:27017/pokemon_map_db';

//Lets connect to our database using the DB server URL.
// mongoose.connect(url);

var PokemonLoc = mongoose.model('PokemonLoc', {name: String, location: Array, timestamp: Number});

var bulbarsaur = new PokemonLoc({name: 'Bulbarsaur', location: [51.5034070, -0.1275920], timestamp: 1468433363 });

console.log(bulbarsaur);

// bulbarsaur.save(function (err, userObj) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('saved successfully:', userObj);
//   }
// });


console.log(search.pokeSearch('Charmander', pokemonls) ? 'pokemon found!': 'pokemon not found!');

console.log('before app get');

// app.get('/', function (req, res) {
//   res.send('Hello World!');
//   return

// });


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});