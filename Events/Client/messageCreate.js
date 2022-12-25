const { Client, Events, Message, EmbedBuilder } = require('discord.js');
let MessageShema = require('../../Database/Models/Messages');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message
   */
  async execute(message, client) {
    if (message.author.bot) return;
    if (!message.guild) return;

    let prefix = "!";

    if (!message.content.startsWith(prefix)) return;

    const [cmd, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) ||
      client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;

    if (command) {

      let embed = new EmbedBuilder()
        .setColor(`#987bfe`)
        .setDescription(`**Команда \`\`${command.name}\`\` недоступна**`)

      if (command.permissions && command.permissions.length > 0 &&
        !message.member.permissions.has(command.permissions))
        return message.author.send({ embeds: [embed] })
          .then(() => {
            message.delete()
          });

      await command.execute(client, message, args);
    }

    MessageShema.findOne({ Guild: message.guild.id, User: message.author.id }, async (err, data) => {
      if (data) {
        data.Messages += 1;
        data.save();
      } else {
        new MessageShema({
          Guild: message.guild.id,
          User: message.author.id,
          Messages: 1,
        }).save();
      }
    })
  }
};