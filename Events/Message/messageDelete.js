const { Client, Events, EmbedBuilder } = require('discord.js');
const { DeleteMessageChannel } = require('../../Util/channels.json');

module.exports = {
  name: Events.MessageDelete,
  once: false,
  /**
   * 
   * @param {Client} client 
   */
  async execute(message, client) {

    
    if (message.guild.id !== '928405729549877268') return;

    if (!message) return;
    if (message.author.bot) return;

    var content = message.content;
    if (!content) content = "No text to be found";

    const logsChannel = await client.channels.cache.get(DeleteMessageChannel);
    if (!logsChannel) return;

    let embed = new EmbedBuilder()
      .setColor(`#987bfe`)
      .setAuthor({
        name: `${message.member.user.tag}`,
        iconURL: `${message.member.user.displayAvatarURL()}`
      })
      .setDescription(`**Повідомлення видалено в ${message.channel}**`)
      .addFields(
        {
          name: `Повідомлення`,
          value: `**\`\`\`${content.replace(/`/g, "'")}\`\`\`**`
        }
      )

    logsChannel.send({ embeds: [embed] });
  },
};