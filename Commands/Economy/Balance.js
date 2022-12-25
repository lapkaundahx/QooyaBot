const { EmbedBuilder, Client, Message, PermissionFlagsBits } = require('discord.js');
const Economy = require('../../Database/Models/Economy');
const { errorEmbed } = require('../../Util/Functions/Embeds');

module.exports = {
  name: 'balance',
  aliases: ['$', 'bal'],
  description: 'Переглянути баланс.',
  category: 'Економіка',
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args) {

    let member = message.mentions.members.first()
      || message.guild.members.cache.get(args[0])
      || message.member;

    if (member.user.bot) return errorEmbed(message, "**У ботів немає балансу**");

    Economy.findOne({ Guild: message.guild.id, User: member.id }, async (err, data) => {
      if (data) {
        let total = data.Money + data.Bank;

        let embedData = new EmbedBuilder()
          .setColor('NotQuiteBlack')
          .setAuthor({
            name: `Баланс — ${member.user.tag}`,
            iconURL: `${member.user.displayAvatarURL()}`
          })
          .setDescription(`**Гаманець: <:moneta:1055186707164708875>${data.Money}**\n**Банк: ${data.Bank}**\n**Взагалі: ${total}**`)

        return message.reply({ embeds: [embedData], ephemeral: true });
      } else {
        new Economy({
          Guild: message.guild.id,
          User: member.id,
          Money: 0,
          Bank: 0
        }).save();

        let embed = new EmbedBuilder()
          .setColor('NotQuiteBlack')
          .setAuthor({
            name: `Баланс — ${member.user.tag}`,
            iconURL: `${member.user.displayAvatarURL()}`
          })
          .setDescription(`**У користувача немає ніяких грошей**`)
          .setColor(`#987bfe`)

        return message.reply({ embeds: [embed], ephemeral: true })
      }
    });
  }
}