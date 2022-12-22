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

module.exports = { addMoney, removeMoney };