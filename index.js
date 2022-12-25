const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const { loadEvents } = require('./Handler/Event.js');
const { loadCommands } = require('./Handler/Command.js');
const { connDatabase } = require('./Database/Conn.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.GuildMember,
    Partials.User,
    Partials.Message,
    Partials.Channel
  ],
  allowedMentions: {
    parse: [
      'users',
      'everyone',
    ],
    repliedUser: true,
  },
  presence: {
    status: 'idle'
  },
});

client.commands = new Collection();
client.aliases = new Collection();

process.on('unhandledRejection', (error) => {
  console.log(error);
});

process.on('uncaughtException', (error) => {
  console.log(error);
});

process.on('uncaughtExceptionMonitor', (error) => {
  console.log(error);
});

client.on('warn', async (message) => {
  console.log(`[WARN] ${message}`);
});

let token = "MTA1MjMyODAwMTYwNzU4NTg0Ng.G-8XGc.VEhWlgtEtSkeXrzjTIP022DwwiPM_PMgzA-z6g";

client.login(token).then(() => {
  connDatabase();
  loadEvents(client);
  loadCommands(client);
});