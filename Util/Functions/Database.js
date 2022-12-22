const { EmbedBuilder } = require('discord.js');
const Economy = require('../../Database/Models/Economy');

async function addUser(client, guild, user, money, bank) {

  const databaseLog = await client.channels.cache.get('1055082076837269544');
  if (!databaseLog) return;
  
  Economy.findOne({ Guild: guild.id, User: user.id }, async (err, data) => {
    if(data) return;
    if(!data) {
      new Economy({
        Guild: guild.id,
        User: user.id,
        Money: money,
        Bank: bank
      }).save();

      let embed = new EmbedBuilder()
        .setColor('#2F3136')
        .setAuthor({
          name: `Схема створена`,
          iconURL: `${user.displayAvatarURL()}`
        })
        .setDescription(`**Учасник: ${user}**\n**Гаманець: ${money}**\n**Банк: ${bank}**`)

      databaseLog.send({ embeds: [embed] })
    }
  });
}

async function removeUser(client, guild, user) {
  Economy.findOne({ Guild: guild.id, User: user.id }, async (err, data) => {
    if(!data) return;
    if(data) {

      const databaseLog = await client.channels.cache.get('1055082076837269544');
      if (!databaseLog) return;

      let embed = new EmbedBuilder()
        .setColor('#2F3136')
        .setAuthor({
          name: `Схема видалена`,
          iconURL: `${user.displayAvatarURL()}`
        })
        .setDescription(`**Учасник: ${user}**\n**Гаманець: ${data.Money}**\n**Банк: ${data.Bank}**`)

      databaseLog.send({ embeds: [embed] })
      
      await data.delete();
    }
  });
}

module.exports = { addUser, removeUser };