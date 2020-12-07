const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "pat",
  description: "Pat somebody",
  category: "image",
  async execute(bot, message) {
    const data = await fetch("https://nekos.life/api/v2/img/pat").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const patted = message.author.id === user.id ? "themselves" : user.username;

    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("YELLOW")
      .setTitle(`${message.author.username} is patting ${patted}`)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
