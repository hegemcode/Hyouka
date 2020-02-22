const { Client } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
  disableEveryone: true
});

config({
  path: __dirname + "/.env"
});

client.on("ready", () => {
  console.log(`I am online, my name is ${client.user.username}`);
  client.user.setPresence({
    status: "online",
    game: {
      name: "lolis breath.",
      type: "LISTENING"
    }
  });
});

client.on("message", async message => {
  const prefix = "..";

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === "ping") {
    const msg = await message.channel.send(`Pinging...`);
    msg.edit(` Pong\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}\nAPI Latency ${Math.round(client.ping)}ms`);
  }

});

client.login(process.env.TOKEN);
