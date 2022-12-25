const { Client, Events, EmbedBuilder } = require('discord.js');
const { UpdateMessageChannel } = require('../../Util/channels.json');

module.exports = {
    name: Events.MessageUpdate,
    once: false,
    /**
     * 
     * @param {Client} client 
     */
    async execute (oldMessage, newMessage, client) {

      if (newMessage.guild.id !== '928405729549877268') return;

      if (!oldMessage.content || !newMessage.content) return;
      if (oldMessage.content === newMessage.content) return;
      if (oldMessage.author.bot) return;
      
      const logsChannel = await client.channels.cache.get(UpdateMessageChannel);
      if(!logsChannel) return;

      let embed = new EmbedBuilder()
        .setColor(`#987bfe`)
        .setAuthor({
          name: `${newMessage.member.user.tag}`, 
          iconURL: `${newMessage.member.user.displayAvatarURL()}`
        })
        .setDescription(`**Повідомлення відредаговано в ${newMessage.channel}**`)
        .addFields(
          { name: `Старе повідомлення`, value: `**\`\`\`${oldMessage.content.replace(/`/g, "'")}\`\`\`**` },
          { name: `Нове повідомлення`, value: `**\`\`\`${newMessage.content.replace(/`/g, "'")}\`\`\`**` }
        )

      logsChannel.send({ embeds: [embed] });
    },
};