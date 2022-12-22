const { EmbedBuilder, Client, Message, PermissionFlagsBits } = require('discord.js');
const Economy = require('../../Database/Models/Economy');

module.exports = {
  name: 'balance',
  aliases: ['$', 'bal'],
  description: "Check the bot's ping!",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
      const { guildId, channel } = message;

      let member = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])
        || message.member;

      let embedError = new EmbedBuilder()
        .setDescription(`**У ботів немає балансу**`)
        .setColor(`#987bfe`)
      
      if(member.user.bot) return message.author.send({ embeds: [embedError] })
        .then(message.delete());

      Economy.findOne({ Guild: guildId, User: member.id }, async (err, data) => {
        if(data) {
          
          let total = data.Money + data.Bank;
          
          let embedData = new EmbedBuilder()
            .setColor(`#987bfe`)
            .setAuthor({
              name: `Баланс — ${member.user.username}`,
              iconURL: `${member.displayAvatarURL()}`
            })
            .setDescription(`**Гаманець: <:moneta:1055186707164708875>${data.Money}**\n**Банк: ${data.Bank}**\n**Взагалі: ${total}**`)
            
          return message.reply({ embeds: [embedData] });
        } else {
          new Economy({
            Guild: guildId,
            User: member.id,
            Money: 0,
            Bank: 0
          }).save();
          
          let embed = new EmbedBuilder()
            .setColor(`#2F3136`)
            .setAuthor({
              name: `Баланс — ${member.user.username}`,
              iconURL: `${member.displayAvatarURL()}`
            })
            .setDescription(`**У користувача немає ніяких грошей**`)
            .setColor(`#987bfe`)
            
          return message.reply({ embeds: [embed], ephemeral: true })
        }
      });
    }
}