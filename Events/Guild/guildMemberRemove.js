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
      removeUser(client, member.guild, member.user);
    }
};