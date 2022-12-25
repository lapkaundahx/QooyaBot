const { Client, Events } = require('discord.js');
const { addUser } = require('../../Util/Functions/Database');

module.exports = {
    name: Events.ClientReady,
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute (client) {

      let guild = client.guilds.cache.get("928405729549877268");

      // Читает всех юзеров выбраной гильдии, если юзер не обнаружен в базе, бот добавляет его
      for (const member of guild.members.cache.filter(memb => !memb.user.bot)) {
        addUser(client, member[1].guild, member[1], 0, 0);
      }
      
      console.log(`Bot ${client.user.tag} is ready!`);
    },
};