const { EmbedBuilder } = require('discord.js');
const Economy = require('../../Database/Models/Economy');

async function addMoney(message, user, amount) {
  Economy.findOne({ Guild: message.guild.id, User: user.id }, async (err, data) => {
    if (data) {
      data.Money += amount;
      data.save();
    } else {
      new Schema({
        Guild: message.guild.id,
        User: user.id,
        Money: amount,
        Bank: 0
      }).save();
    }
  });
};

async function removeMoney(message, user, amount) {
  Economy.findOne({ Guild: message.guild.id, User: user.id }, async (err, data) => {
    if (data) {
      data.Money -= amount;
      data.save();
    }
    else {
      new Schema({
        Guild: message.guild.id,
        User: user.id,
        Money: 0,
        Bank: 0
      }).save();

      let embed = new EmbedBuilder()
        .setTitle(`Баланс — ${user.tag}`)
        .setDescription(`У користувача немає ніяких грошей`)
        .setColor(`#2F3136`)
        .setThumbnail(`${user.displayAvatarURL()}`)

      return message.author.send({ embeds: [embed] })
        .then(message.delete());
    }
  });
};

async function balance(message, user) {
  Economy.findOne({ Guild: message.guild.id, User: user.user.id }, async (err, data) => {
    if (data) {
      let total = data.Money + data.Bank;

      let embedData = new EmbedBuilder()
        .setColor(`#987bfe`)
        .setAuthor({
          name: `Баланс — ${user.user.tag}`,
          iconURL: `${user.user.displayAvatarURL()}`
        })
        .setDescription(`**Гаманець: <:moneta:1055186707164708875>${data.Money}**\n**Банк: ${data.Bank}**\n**Взагалі: ${total}**`)

      return message.reply({ embeds: [embedData], ephemeral: true });
    } else {
      new Economy({
        Guild: message.guild.id,
        User: user.user.id,
        Money: 0,
        Bank: 0
      }).save();

      let embed = new EmbedBuilder()
        .setColor(`#2F3136`)
        .setAuthor({
          name: `Баланс — ${user.user.tag}`,
          iconURL: `${user.user.displayAvatarURL()}`
        })
        .setDescription(`**У користувача немає ніяких грошей**`)
        .setColor(`#987bfe`)

      return message.reply({ embeds: [embed], ephemeral: true })
    }
  });
}

module.exports = { addMoney, removeMoney, balance };