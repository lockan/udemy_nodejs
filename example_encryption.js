var crypto = require('crypto-js');

var secretMessage = "I have a lovely bunch of coconutes.";
var secretObj = 
{
	name: 'Andrew', 
	secretName: 'Double-0-Nothing'
};

var secretKey = "abcd1234";

// Encrypt with AES encryption
var encMessage = crypto.AES.encrypt(secretMessage, secretKey);
console.log("" + encMessage);

//Decrypt message
var bytes = crypto.AES.decrypt(encMessage, secretKey);
var decMessage = bytes.toString(crypto.enc.Utf8); //<<-- Note the encoding arg 
console.log("" + decMessage);

console.log("\n Encrypt an object");
var objString = JSON.stringify(secretObj);
var encObj = crypto.AES.encrypt(objString, secretKey);
console.log("Encrypted obj: " + encObj);

var decObj = crypto.AES.decrypt(encObj, secretKey);
var decObjEncoded = decObj.toString(crypto.enc.Utf8);
console.log("decoded obj = " + decObjEncoded);

