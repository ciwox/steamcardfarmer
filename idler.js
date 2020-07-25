var SteamGames = require('./gameslist.json');
var Steam = require('steam');
var SteamUser = require('steam-user');

// console.log(SteamGames.applist.apps);

let accountName = process.argv[2];
let password = process.argv[3];
let gamesArray = process.argv[4];

if (process.argv[4] === undefined){
	console.log("ERROR! You have set no games! We are using only CS:GO (730) as default now.");
	gamesArray = ["Ciwox.com - Steam Idler", 730];
} else {
	gamesArray = gamesArray.split(",");
}

let foundGames = [];
let foundGamesNames = [];

for (var i=0; i < gamesArray.length; i++) {
	// console.log(gamesArray[i]);
	for (var x=0; x < SteamGames.applist.apps.length; x++){
		//console.log(gamesArray[i]+" <=> "+SteamGames.applist.apps[x].appid);
		if (gamesArray[i] == SteamGames.applist.apps[x].appid){
			console.log("Found! " + SteamGames.applist.apps[x].appid);
			foundGames.push(SteamGames.applist.apps[x].appid);
			foundGamesNames.push(SteamGames.applist.apps[x].name);
		}
	}
}
foundGames.unshift("Ciwox.com - Steam Idler");

console.log("Detected Username: "+accountName);
console.log("Detected Password: "+password.replace(/./g, '*'));
console.log("Please enter your Steam Guard code now....");

// console.log(gamesArray);
// console.log(foundGames);


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
	client.gamesPlayed(foundGames);
	foundGamesNames.forEach(function(foundGamesName){
		console.log("Idling game: "+foundGamesName);
	});
});

client.on('error', function(err) {
	console.log(err);
});