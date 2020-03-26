var Steam 				= require('steam');
var SteamUser 			= require('steam-user');

let accountName = process.argv[1];
let password = process.argv[2];

console.log("Predefined:");
console.log("Username: "+accountName);
console.log("Password: "+password);


let client = new SteamUser();

client.logOn({
	"accountName": accountName,
	"password": password
});

client.on('logOnResponse', function(details) {
	console.log(details);
});

client.on('loggedOn', function() {
	console.log("Logged into Steam");
	client.setPersona(Steam.EPersonaState.Online);
	client.gamesPlayed([730]);
});

client.on('error', function(err) {
	console.log(err);
});