const { EmbedBuilder, Client, Message, PermissionFlagsBits } = require('discord.js');
const Economy = require('../../Database/Models/Economy');
const { addMoney } = require('../../Util/Functions/Economy');

module.exports = {
  name: 'pay',
  aliases: ['give'],
  description: 'Передати свої монети іншому учаснику.',
  category: 'Економіка',
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
      .setDescription(`**Ви не вказали користувача**\n**!pay користувач сумма**`)
      .setColor(`#987bfe`)

    if (!member) return message.author.send({ embeds: [embederror1] })
      .then(message.delete());

    let embederror2 = new EmbedBuilder()
      .setDescription(`**У ботів немає балансу**\n**!pay користувач сумма**`)
      .setColor(`#987bfe`)

    if (member.user.bot) return message.author.send({ embeds: [embederror2] })
      .then(message.delete());

    let embederror4 = new EmbedBuilder()
      .setDescription(`**Ви не можете переводити монети собі**\n**!pay користувач сумма**`)
      .setColor(`#987bfe`)

    if (member.id === message.author.id) return message.author.send({ embeds: [embederror4] })
      .then(message.delete());

    let amount = parseInt(args[1]);

    let embederror3 = new EmbedBuilder()
      .setDescription(`**Ви забули ввести суму**\n**!pay користувач сумма**`)
      .setColor(`#987bfe`)

    if (!amount) return message.author.send({ embeds: [embederror3] })
      .then(message.delete());

    let embederror5 = new EmbedBuilder()
      .setDescription(`**Не можна переводити таке число**\n**!pay користувач сумма**`)
      .setColor(`#987bfe`)

    if (amount <= 0) return message.author.send({ embeds: [embederror5] })
      .then(message.delete());

    let embederror6 = new EmbedBuilder()
      .setDescription(`**На вашому рахунку недостатньо монет**\n**!pay користувач сумма**`)
      .setColor(`#987bfe`)

    let dataAuthor = await Economy.findOne({ Guild: guildId, User: message.author.id });

    if (!dataAuthor) {
      new Schema({
        Guild: guildId,
        User: message.author.id,
        Money: 0,
        Bank: 0,
      }).save();

      return message.author.send({ embeds: [embederror6] })
        .then(message.delete());
    }

    if (dataAuthor.Money < amount) return message.author.send({ embeds: [embederror6] })
      .then(message.delete());

    dataAuthor.Money -= amount;
    dataAuthor.save();

    addMoney(message, member, amount);

    let embed = new EmbedBuilder()
      .setColor(`#987bfe`)
      .setDescription(`**${message.author} перевів ${amount} монет учаснику ${member}**`)

    return message.reply({ embeds: [embed] });
  }
}