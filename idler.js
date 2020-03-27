var Steam = require('steam');
var SteamUser = require('steam-user');

let accountName = process.argv[2];
let password = process.argv[3];

console.log("Detected Username: "+accountName);
console.log("Detected Password: "+password.replace(/./g, '*'));
console.log("Please enter your Steam Guard code now....")

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
