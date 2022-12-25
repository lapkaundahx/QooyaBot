const { Client, Events, EmbedBuilder, GuildMember } = require('discord.js');
const { WelcomeMemberChannel, MemberChannelLog } = require('../../Util/channels.json');
const { addUser } = require('../../Util/Functions/Database');

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  /**
   * @param {GuildMember} member
   * @param {Client} client 
   */
  async execute(member, client) {
    if (member.guild.id !== '928405729549877268') return;

    addUser(client, member.guild, member, 0, 0);

    const welcomeChannel = await client.channels.cache.get(WelcomeMemberChannel);
    if (!welcomeChannel) return;

    let embed = new EmbedBuilder()
      .setColor(`#987bfe`)
      .setAuthor({
        name: `${member.user.tag}`,
        iconURL: `${member.user.displayAvatarURL()}`
      })
      .setTitle(`Ласкаво просимо на сервер ${member.guild.name}`)
      .setImage('https://cdn.discordapp.com/attachments/976806647282413618/1035184558695514193/standard_47.gif')
      .setDescription(`**Обов'язково прочитай <#928409295865925753> щоб ознайомитися з сервером й не мати в подальшому проблем з адміністрацією**\n\n**Приємного перебування на сервері<:1m_pepelove:1033736619422912594>**`)
      .setFooter({
        text: `${member.guild.name}`,
        iconURL: `${member.guild.iconURL()}`
      })

    welcomeChannel.send({ embeds: [embed], content: `${member.user}` });

    const logsChannel = await client.channels.cache.get(MemberChannelLog);
    if (!logsChannel) return;

    let fetch = await client.users.fetch(member.id);

    let embedLog = new EmbedBuilder()
      .setColor(`#987bfe`)
      .setAuthor({
        name: `${member.user.tag}`,
        iconURL: `${member.user.displayAvatarURL()}`
      })
      .setDescription(`**Новий учасник ${member}**`)
      .addFields(
        {
          name: `Дата реєстрації`,
          value: `<t:${(fetch.createdTimestamp / 1000).toFixed()}:d> (<t:${(fetch.createdTimestamp / 1000).toFixed()}:R>)`
        },
        {
          name: `Айді`,
          value: `\`\`${fetch.id}\`\``
        }
      )

    logsChannel.send({ embeds: [embedLog] });
  }
};