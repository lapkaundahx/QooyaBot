const { EmbedBuilder, Client, Message, PermissionFlagsBits } = require('discord.js');
const Economy = require('../../Database/Models/Economy');

module.exports = {
  name: 'leaderboard',
  aliases: ['lb'],
  description: "Check the bot's ping!",
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args) {
    const { guildId } = message;

    let type = args[0];

    let embedError = new EmbedBuilder()
      .setDescription(`**!leaderboard (money | bank)**`)
      .setColor(`#987bfe`)

    if (!type) return message.author.send({ embeds: [embedError] })
      .then(message.delete());

    if (type == 'money') {
      const rawLeaderboard = await Economy.find({ Guild: guildId })
        .sort(([['Money', 'descending']]));

      let embError = new EmbedBuilder()
        .setColor(`#987bfe`)
        .setDescription('**Дані не знайдені**')

      if (!rawLeaderboard) return message.author.send({ embeds: [embError] })
        .then(message.delete());

      const lb = rawLeaderboard
        .slice(0, 10)
        .map(e => `#**${rawLeaderboard.findIndex(i => i.Guild === guildId && i.User === e.User) + 1} | <@!${e.User}> —  \`$${e.Money}\`**`).join('\n');

      let emb = new EmbedBuilder()
        .setTitle(`Таблиця лідерів по Гаманцю`)
        .setColor(`#987bfe`)
        .setDescription(`${lb}`)

      return message.reply({ embeds: [emb] });
    } else if (type == 'bank') {
      const rawLeaderboard = await Economy.find({ Guild: guildId })
        .sort(([['Bank', 'descending']]));

      let embError = new EmbedBuilder()
        .setColor(`#987bfe`)
        .setDescription('**Дані не знайдені**')

      if (!rawLeaderboard) return message.author.send({ embeds: [embError] })
        .then(message.delete());

      const lb = rawLeaderboard
        .slice(0, 10)
        .map(e => `#.**${rawLeaderboard.findIndex(i => i.Guild === guildId && i.User === e.User) + 1} | <@!${e.User}> —  \`$${e.Bank}\`**`).join('\n');

      let emb = new EmbedBuilder()
        .setTitle(`Таблиця лідерів по Банку`)
        .setColor(`#987bfe`)
        .setDescription(`${lb}`)

      return message.reply({ embeds: [emb] });
    }
  }
}