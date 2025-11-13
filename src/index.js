require('./console/watermark')
const { Client, Partials, Collection } = require('discord.js');
const colors = require('colors');
const config = require('./config/config.json');
const path = require('path');
const client = new Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "GuildPresences",
    "GuildMessageReactions",
    "DirectMessages",
    "MessageContent",
    "GuildVoiceStates",
    "GuildMembers",
    "DirectMessageTyping"
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ]
})


client.config = require('./config/config.json')
client.commands = new Collection()
client.events = new Collection()
client.aliases = new Collection()
module.exports = client;

["command", "event"].forEach(file => {
  require(`./handlers/${file}`)(client);
});

client.login(process.env.TOKEN)
  .catch((err) => {
    console.log("[CRUSH] Something went wrong while connecting to your bot" + "\n");
    console.log("[CRUSH] Error from DiscordAPI :" + err);
    process.exit();
  })

process.on("unhandledRejection", async (err) => {
  console.log(`[ANTI - CRUSH] Unhandled Rejection : ${err}`.red.bold)
  console.log(err)
})

// auto kill
const ms = require("ms");
setInterval(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  }
}, ms("1m"));