const { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const prefix = "!";

module.exports = {
  name: 'help',
  aliases: ['h'],
  description: 'Список команд бота.',
  category: 'Інформація',
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args) {

    let buttonHome = new ButtonBuilder()
      .setCustomId('home')
      .setEmoji('<:home:1055932668992295043>')
      .setStyle(ButtonStyle.Secondary)
    
    let buttonInfo = new ButtonBuilder()
      .setCustomId('info')
      .setEmoji('<:info:1055935115437539409>')
      .setStyle(ButtonStyle.Secondary)
    
    let buttonEconomy = new ButtonBuilder()
      .setCustomId('economy')
      .setEmoji('<:economy:1055933375598297128>')
      .setStyle(ButtonStyle.Secondary)
    
    let buttonAdmin = new ButtonBuilder()
      .setCustomId('admin')
      .setEmoji('<:admin:1055933861802033282>')
      .setStyle(ButtonStyle.Secondary)

    let row = new ActionRowBuilder()
      .addComponents(buttonHome, buttonInfo, buttonEconomy, buttonAdmin)

    let homeEmbed = new EmbedBuilder()
      .setTitle(`Меню довідки`)
      .setColor('NotQuiteBlack')
      .addFields(
        {
          name: '<:info:1055935115437539409> Інформація',
          value: '*╰ Інформаційні команди*'
        },
        {
          name: '<:economy:1055933375598297128> Економіка',
          value: '*╰ Економічні команди*'
        },
        {
          name: '<:admin:1055933861802033282> Адміністрація',
          value: '*╰ Адміністраторські команди*'
        }
      )
      .setFooter({
        text: `${message.guild.name}`,
        iconURL: `${message.guild.iconURL()}`
      })

    let msg = await message.reply({ embeds: [homeEmbed], components: [row] })

    const filter = i => !i.user.bot;

    let coll = await msg.createMessageComponentCollector({ filter: filter, time: 30000 });

    coll.on('collect', async (i) => {
      if(i.user.id !== message.author.id) return i.reply({ content: `Ця сторінка довідки не для вас! Використовуйте команду \`${prefix}help\``, ephemeral: true });
      switch (i.customId) {
        case 'home':
          await i.deferUpdate();
          await msg.edit({ embeds: [homeEmbed], components: [row] });
          break;
        case 'info':
          await i.deferUpdate();
          let commandInfo = await client.commands.filter(
            (cmd) => cmd.category === 'Інформація')
            .map((cmd) => {
              return {
                name: `\`\`${prefix}${cmd.name}\`\``,
                value: `**╰ ${cmd.description}**`
              }
            });

          let commandsInfoEmbed = new EmbedBuilder()
            .setTitle(`Меню довідки | Інформація`)
            .addFields(commandInfo)
            .setColor('NotQuiteBlack')
            .setFooter({
              text: `${message.guild.name}`,
              iconURL: `${message.guild.iconURL()}`
            })

          msg.edit({ embeds: [commandsInfoEmbed] });
          break;
        case 'economy':
          await i.deferUpdate();
          let commandEconomy = await client.commands.filter(
            (cmd) => cmd.category === 'Економіка')
            .map((cmd) => {
              return {
                name: `\`\`${prefix}${cmd.name}\`\``,
                value: `**╰ ${cmd.description}**`
              }
            });

          let commandsEconomyEmbed = new EmbedBuilder()
            .setTitle(`Меню довідки | Економіка`)
            .setColor('NotQuiteBlack')
            .addFields(commandEconomy)
            .setFooter({
              text: `${message.guild.name}`,
              iconURL: `${message.guild.iconURL()}`
            })

          msg.edit({ embeds: [commandsEconomyEmbed] });
          break;
        case 'admin':
          await i.deferUpdate();
          let commandAdmin = await client.commands.filter(
            (cmd) => cmd.category === 'Адміністрація')
            .map((cmd) => {
              return {
                name: `\`\`${prefix}${cmd.name}\`\``,
                value: `**╰ ${cmd.description}**`
              }
            });

          let commandsAdminEmbed = new EmbedBuilder()
            .setTitle(`Меню довідки | Адміністрація`)
            .addFields(commandAdmin)
            .setColor('NotQuiteBlack')
            .setFooter({
              text: `${message.guild.name}`,
              iconURL: `${message.guild.iconURL()}`
            })

          msg.edit({ embeds: [commandsAdminEmbed] });
          break;
      }

    });

    coll.on('end', async () => {
      row.components[0].setDisabled(true);
      row.components[1].setDisabled(true);
      row.components[2].setDisabled(true);
      row.components[3].setDisabled(true);
      msg.edit({ components: [row] })
    });
  }
}