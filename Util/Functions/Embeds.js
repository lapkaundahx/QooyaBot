const { EmbedBuilder } = require('discord.js');

async function errorEmbed(message, error) {
  let embed = new EmbedBuilder()
    .setDescription(error)
    .setColor('NotQuiteBlack')
  return message.reply({ embeds: [embed] });
}

module.exports = { errorEmbed };