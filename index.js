const Discord = require('discord.js'); //Extract Discord.js Module
const fs = require('fs'); //Extract File System Module
const client = new Discord.Client({disableEveryone: true}); //Make a new cilent also disable @everyone
let config = require('./config.json'); //Register config Directory

client.on('ready', () => { //When the cilent is ready
    console.log(`Logged in as ${client.user.tag}!`); //Log that who is logon to that cilent
  });

client.on("message", msg => {  //Set Prefix Command + on message receive

    if(msg.author.bot) return; //If the message author is a bot then return
    if(msg.channel.type === "dm") return; //If The Message Type = DM then return

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8")); //Read File
    if(!prefixes[msg.guild.id]){  //If there is no string that is startwith prefixes[msg.guild.id]
       prefixes[msg.guild.id] = { //Let prefixes[msg.guild.id] be
        prefix: config.DEFAULT_PREFIX //Prefix = Default Prefix Which is on confiฌ.json
       }
    }

    let prefix = prefixes[msg.guild.id].prefix; //Let prefix be prefixes[msg.guild.id].prefix

    if (!msg.content.startsWith(prefix)) return; //If mesage isn't start with prefix then return
    const args = msg.content.slice(prefix.length).split(' '); //Config Args(Arguements)
    const command = args.shift().toLowerCase();
    if(command === 'setprefix') { //if the command is setprefix
    
      if(!msg.member.hasPermission("MANAGE_GUILD")) return msg.channel.send(":no_good: You don't have permissions to set prefix!"); //If The Author Doesnt Have Manage guild permission return a message
      if(!args[0]) return msg.channel.send(":warning: Please specify a prefix!"); //If there isn't a prefix then return a message
      
      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8")); //Read File
      prefixes[msg.guild.id] = { //Let The config be
      prefix: args[0] //Let prefix = arguement 1
      }
      
      fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => { //Write File
        if(err) console.log(err); //If error log error to the console
      })
      
      msg.channel.send(`Prefix has been set to **${args[0]}**!`); //send message to that channel
      return; //return
    }
    if(command === 'test') { //If the command is test

     msg.channel.send('Work!'); //Send message
     return; //return
    }
});

client.login(config.BOT_TOKEN); //Login to the bot using it token
