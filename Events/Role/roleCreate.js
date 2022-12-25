const { Client, Events, EmbedBuilder, Role } = require('discord.js');
const { RoleLog } = require('../../Util/channels.json');

module.exports = {
  name: Events.GuildRoleCreate,
  once: false,
  /**
   * @param {Role} role
   * @param {Client} client 
   */
  async execute(role, client) {

    if (role.guild.id !== '928405729549877268') return;

    const logsChannel = await client.channels.cache.get(RoleLog);
    if (!logsChannel) return;

    let embed = new EmbedBuilder()
      .setColor(`#987bfe`)
      .setDescription(`**Роль "${role.name}" створена**`)
      .addFields(
        {
          name: `Роль`,
          value: `${role} (${role.name})`
        },
        {
          name: 'Айді',
          value: `${role.id}`
        },
        {
          name: `Позиція`,
          value: `${role.position}`
        }
      )

    logsChannel.send({ embeds: [embed] });
  },
};