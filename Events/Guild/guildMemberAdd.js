const { Client, Events, EmbedBuilder, GuildMember } = require('discord.js');
const { WelcomeMemberChannel } = require('../../Util/channels.json');
const { addUser } = require('../../Util/Functions/Database');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    /**
     * @param {GuildMember} member
     * @param {Client} client 
     */
    async execute (member, client) {

      addUser(client, member.guild, member.user, 0, 0);

      const welcomeChannel = await client.channels.cache.get(WelcomeMemberChannel);
      if(!welcomeChannel) return;

      let embed = new EmbedBuilder()
        .setColor(`#987bfe`)
        .setAuthor({
          name: `${member.user.tag}`, 
          iconURL: `${member.user.displayAvatarURL()}`
        })
        .setTitle(`Ласкаво просимо на сервер ${member.guild.name}`)
        .setDescription(`**Обов'язково прочитай <#928409295865925753> щоб ознайомитися з сервером й не мати в подальшому проблем з адміністрацією**\n\n**Приємного перебування на сервері<:1m_pepelove:1033736619422912594>**`)
      .setFooter({ 
        text: `${member.guild.name}`,
        iconURL: `${member.guild.iconURL()}`
      })

      welcomeChannel.send({ embeds: [embed], content: `${member.user}` });
    }
};