const { Client, Message, EmbedBuilder } = require('discord.js');
const Economy = require('../../Database/Models/Economy');
const ms = require('parse-ms');

module.exports = {
  name: 'reward',
  aliases: ['daily'],
  description: 'Забрати щоденну нагороду.',
  category: 'Економіка',
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args) {

    const { guildId, channel } = message;

    let timeout = 86400000;

    let randomAmount = Math.floor(Math.random() * 300) + 100;

    let embed = new EmbedBuilder()
      .setColor(`#987bfe`)
      .setAuthor({
        name: `Тимчасова нагорода — ${message.author.username}`,
        iconURL: `${message.author.displayAvatarURL()}`
      })
      .setDescription(`**Ви отримали щоденну нагороду в розмірі \`\`${randomAmount}\`\`**`)

    let data = await Economy.findOne({ Guild: guildId, User: message.author.id });

    if (!data) {

      new Economy({
        Guild: guildId,
        User: message.author.id,
        Money: randomAmount,
        Bank: 0,
        Reward: Date.now()

      }).save();

      return message.reply({ embeds: [embed] });

    } else {

      if (timeout - (Date.now() - data.Reward) > 0) {

        let time = ms(timeout - (Date.now() - data.Reward));

        let errorEmbed = new EmbedBuilder()
          .setColor(`#987bfe`)
          .setDescription(`**Ви вже отримали нагороду**\n**Наступна нагорода через ${time.hours}г ${time.minutes}м**`)

        return message.author.send({ embeds: [errorEmbed] })
          .then(message.delete());

      } else {

        data.Money += randomAmount;

        data.Reward = Date.now();

        data.save();

        return message.reply({ embeds: [embed] });

      };
    };
  },
};