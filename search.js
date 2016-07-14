// module for pokedex searching 

var jsonQuery = require('json-query');

//first param is pokemon name, second is pokemon list from json file. 
exports.pokeSearch = function(pokeName, pokemonls){
	//create a query for the search function
	var pokeQuery = 'pokemons[name='+ pokeName+']';
	
	var search = jsonQuery(pokeQuery,{data:pokemonls});

	return (search.value != null);
}

exports.addPokemon = function(pokeName, pokeData){

	return null; 
}