const { Client, Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute (client) {
      const activities = [
        { name: `<3` },
        { name: `</3` },
      ];
      
      let i = 0;
      
      setInterval(() => {
        if(i >= activities.length) i = 0
          client.user.setActivity(activities[i])
            i++;
      }, 5000); 
      
      console.log(`Bot ${client.user.tag} is ready!`);
    },
};