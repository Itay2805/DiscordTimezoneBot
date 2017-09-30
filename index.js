"user strict";

const Discord = require('discord.js');
// var Country = require('countryjs');

const fs = require('fs');

var botConfig = JSON.parse(fs.readFileSync('bot-config.json', 'utf8'));
var botToken = botConfig.bot_token;

const client = new Discord.Client();

const WAIT_FOR_ANSWER = "wait-for-answer";

var userData = {};

client.on('ready', () => {
    console.log("Connected!");
});

client.on('message', (msg) => {
    var content = msg.content.trim();
    if(content.startsWith("!timezone set")) {
        var words = content.split(" ");
        if(words.length < 3) {
            msg.reply("Please specify timezone as (+/-)hour");
            return;
        }
        var userID = msg.author.id;
        var timezone = parseInt(words[2]);
        while(timezone >= 24) {
            timezone -= 24;
        }
        userData[userID] = timezone;
        if(timezone >= 0) {
            msg.reply("timezone set to UTC+" + timezone);            
        }else {
            msg.reply("timezone set to UTC" + timezone);
        }
        fs.writeFileSync('user-timezone-data.json', JSON.stringify(userData));
    }else if(content.startsWith("!timezone get")) {
        var words = content.split(" ");
        if(words.length < 3) {
            msg.reply("Please specify user");
            return;
        }
        var username = words[2];
        var user = msg.guild.members.find("displayName", username);
        if(!user) {
            user = msg.guild.members.find("nickname", username);
            if(!user) {
                msg.reply("That user does not exists!");
                return;
            }
        }
        var userID = user.id;
        var timezone = userData[userID];
        if(timezone >= 0) {
            msg.reply("UTC+" + timezone);            
        }else {
            msg.reply("UTC" + timezone);
        }
    }else if(content.startsWith("!localtime")) {
        var words = content.split(" ");
        if(words.length < 2) {
            msg.reply("Please specify user");
            return;
        }
        var username = words[1];
        var user = msg.guild.members.find("displayName", username);
        if(!user) {
            user = msg.guild.members.find("nickname", username);
            if(!user) {
                msg.reply("That user does not exists!");
                return;
            }
        }
        var data = userData[user.id];
        if(!data) {
            msg.reply("That user did not set his timezone!");
            return;
        }
        var date = new Date;
        var hours = date.getUTCHours() + data;
        while(hours >= 24) {
            hours -= 24;
        }
        var minutes = date.getUTCMinutes();
        msg.reply(user.displayName + "'s local time is " + hours + ":" + (minutes < 10 ? "0": "") + minutes);
    }


    /*if(msg.content.toLowerCase().startsWith("!setcountry")) {
        var country = msg.content.split(" ").slice(1).join(" ");
        var countryInfo = Country.info(country, 'name');
        if(!countryInfo) {
            msg.reply("Unknown country");
            return;
        }
        var timezones = countryInfo.timezones;
        if(timezones.length == 1) {
            userData[msg.author.id] = {
                country: country,
                timezone:  timezones[0]
            };
            msg.reply("Your country is " + countryInfo.name + " (timezone: " + timezones[0] + ")")
        }else {
            var q = "What is your specific timezone?";
            for(var i = 0; i < timezones.length; i++) {
                q += i + ") " + timezones[i] + "\n";
            }
            q += "(Use `!choose <number>` )"
            userData[msg.author.id] = {
                country: country,
                data:  timezones
            };
            msg.reply(q);
        }
    }else if(msg.content.toLowerCase().startsWith("!choose")) {
        var i = parseInt(msg.content.split(" ")[1]);
        var user = userData[msg.author.id];
        user.timezone = user.data[i];
        delete user.data;
        userData[msg.author.id] = user;
        msg.reply("Choose timezone " + user.timezone + " (" + user.country + ")");
    }else if(msg.content.toLowerCase().startsWith("!localtime")) {
        var username = msg.content.split(" ").slice(1).join(" ");
        var userID = msg.guild.members.find("displayName", username).id;
        var user = userData[userID];
        msg.reply(user.timezone);
    }*/
});

if(fs.existsSync('user-timezone-data.json')) {
    userData = JSON.parse(fs.readFileSync('user-timezone-data.json'));
    release();    
}

client.login(botToken);