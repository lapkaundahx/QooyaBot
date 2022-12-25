const { EmbedBuilder, Client, Message, PermissionFlagsBits } = require('discord.js');
const Economy = require('../../Database/Models/Economy');
const { addMoney } = require('../../Util/Functions/Economy');

module.exports = {
  name: 'withdraw',
  aliases: ['with'],
  description: 'Візьміть свої монети з банку.',
  category: 'Економіка',
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args) {
    const { guildId } = message;

    let amount = parseInt(args[0]);

    let embederror3 = new EmbedBuilder()
      .setDescription(`**Ви забули ввести суму**\n**!withdraw сумма**`)
      .setColor(`#987bfe`)

    if (!amount) return message.author.send({ embeds: [embederror3] })
      .then(message.delete());

    let embederror5 = new EmbedBuilder()
      .setDescription(`**Не можна переводити таке число**\n**!withdraw сумма**`)
      .setColor(`#987bfe`)

    if (amount <= 0) return message.author.send({ embeds: [embederror5] })
      .then(message.delete());

    let embederror6 = new EmbedBuilder()
      .setDescription(`**На вашому рахунку недостатньо монет**\n**!withdraw сумма**`)
      .setColor(`#987bfe`)

    let data = await Economy.findOne({ Guild: guildId, User: message.author.id });

    if (!data) {
      let embed = new EmbedBuilder()
        .setColor(`#987bfe`)
        .setDescription(`**У користувача немає ніяких грошей**`)

      new Economy({
        Guild: guildId,
        User: message.author.id,
        Money: 0,
        Bank: 0
      }).save();

      return message.author.send({ embeds: [embed] })
        .then(message.delete());
    }

    if (data.Money < amount) return message.author.send({ embeds: [embederror6] })
      .then(message.delete());

    data.Money += amount;
    data.Bank -= amount;
    data.save();

    let embed = new EmbedBuilder()
      .setColor(`#987bfe`)
      .setDescription(`**${message.author} сняв ${amount} монет**`)

    return message.reply({ embeds: [embed] });
  }
}