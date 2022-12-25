const { Client, Events, EmbedBuilder, GuildMember } = require('discord.js');
const { WelcomeMemberChannel } = require('../../Util/channels.json');
const { removeUser } = require('../../Util/Functions/Database');

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,
    /**
     * @param {GuildMember} member
     * @param {Client} client 
     */
    async execute (member, client) {
      if (member.guild.id !== '928405729549877268') return;
      removeUser(client, member.guild, member.user);
    }
};