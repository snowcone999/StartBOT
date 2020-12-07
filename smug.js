const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "smug",
  description: "Smug",
  category: "image",
  async execute(bot, message) {
    const data = await fetch("https://nekos.life/api/v2/img/smug").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} is smugging
      .setFooter(message.author.username)
      .setColor("YELLOW")
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
