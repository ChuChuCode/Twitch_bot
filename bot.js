var tmi = require('tmi.js');
var channelName = "" //Your Twitch account
const PREFIX = "!";

var config ={
	options :{
		debug : true
	},
	connection:{
		cluster:"aws",
		reconnect : true
	},
	identity :{
		// Twitch bot Account
		username:"Twitch bot Account",
		//https://twitchapps.com/tmi/
		password:"Your bot Oauth" 
	},
	channels :[channelName]
}

var client = new tmi.client(config);
client.connect();

client.on("connected",(address,port) =>{
	//Say something on Chat
	client.action(channelName,"This is bot"); 
	console.log( "The bot is connected on " + address + ":" + port );
	//client.say()
});

client.on("chat",(channel,user,message,self) =>{
	if (self) return ;  //message from bot
	message = message.toLowerCase();  //to lower case
	if (message === "hi"){
		client.say(channelName,user['display-name'] + " Hi"); 
	}
	else if (message.indexOf(PREFIX) === 0 ){
		let args = message.substring(1).split(" ");
		switch (args[0]){
			case "dc" :				
				//client.say(channelName,user['username'] + " Hi"); 
				client.say(channelName,"your discord url"); 
				break;
		}
	}
});