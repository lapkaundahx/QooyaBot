const { EmbedBuilder, Client, Message, PermissionFlagsBits } = require('discord.js');
const { addMoney } = require('../../Util/Functions/Economy');

module.exports = {
  name: 'addmoney',
  aliases: ['am'],
  description: "Check the bot's ping!",
  permissions: [PermissionFlagsBits.Administrator],
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args) {
    const { guildId } = message;

    let member = message.mentions.members.first();

    let embederror1 = new EmbedBuilder()
      .setDescription(`**Ви не вказали користувача**\n**!addmoney користувач сумма**`)
      .setColor(`#987bfe`)

    if (!member) return message.author.send({ embeds: [embederror1] })
      .then(message.delete());

    let embederror2 = new EmbedBuilder()
      .setDescription(`**У ботів немає балансу**\n**!addmoney користувач сумма**`)
      .setColor(`#987bfe`)

    if (member.user.bot) return message.author.send({ embeds: [embederror2] })
      .then(message.delete());

    let amount = parseInt(args[1]);

    let embederror3 = new EmbedBuilder()
      .setDescription(`**Ви забули ввести суму**\n**!addmoney користувач сумма**`)
      .setColor(`#987bfe`)

    if (!amount) return message.author.send({ embeds: [embederror3] })
      .then(message.delete());

    let embederror5 = new EmbedBuilder()
      .setDescription(`**Не можна нараховувати таке число**\n**!addmoney користувач сумма**`)
      .setColor(`#987bfe`)

    if (amount <= 0) return message.author.send({ embeds: [embederror5] })
      .then(message.delete());

    addMoney(message, member, amount);

    let embed = new EmbedBuilder()
      .setColor(`#987bfe`)
      .setDescription(`**${message.author} нарахував ${amount} монет учаснику ${member}**`)

    return message.reply({ embeds: [embed] });
  }
}