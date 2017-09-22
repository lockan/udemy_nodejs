var person = {
	name: 'Andrew', 
	age: '36'

}; 

var personJSON = JSON.stringify(person);
console.log(personJSON);
console.log(typeof(personJSON));

var personObject = JSON.parse(personJSON);
console.log(personObject.name);
console.log(typeof(personObject));

console.log("CHALLENGE");

var animal = '{"type":"dog", "name":"Rex"}';
var animalJSON = JSON.parse(animal);
console.log(typeof(animalJSON));

animalJSON.age = 4;
animal = JSON.stringify(animalJSON);
console.log(animal);