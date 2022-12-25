const { EmbedBuilder, Client, Message, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const Economy = require('../../Database/Models/Economy');

module.exports = {
  name: 'cleareco',
  aliases: ['ce'],
  description: 'Повністю очистити економіку сервера.',
  permissions: [PermissionFlagsBits.Administrator],
  category: 'Адміністрація',
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args) {
    const { guildId } = message;

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('run')
          .setStyle(ButtonStyle.Success)
          .setLabel('Видалити'),
        new ButtonBuilder()
          .setCustomId('stop')
          .setStyle(ButtonStyle.Danger)
          .setLabel('Стоп')
      );

    let embed = new EmbedBuilder()
      .setColor(`#987bfe`)
      .setDescription('**Ви точно хочете скинути економіку?**')

    let msg = await message.reply({ embeds: [embed], components: [row] });

    const filter = i => {
      i.deferUpdate();
      return i.user.id === message.author.id;
    };

    let collector = msg.createMessageComponentCollector({
      filter: filter,
      componentType: ComponentType.Button,
      time: 20000
    });

    collector.on('collect', async (i) => {
      switch (i.customId) {
        case 'run':
          await Economy.deleteMany({ Guild: guildId });

          let runEmbed = new EmbedBuilder()
            .setColor(`#987bfe`)
            .setDescription('**Економіка була успішно відновлена**')

          await msg.edit({ embeds: [runEmbed], components: [] });

          collector.stop();

          break;

        case 'stop':
          let stopEmbed = new EmbedBuilder()
            .setColor(`#987bfe`)
            .setDescription('**Перезавантаження економіки було скасовано**')

          await msg.edit({ embeds: [stopEmbed], components: [] });

          collector.stop();

          break;
      }
    });

    collector.on('end', async (reason) => {
      if (reason === 'time') {
        let timeEmbed = new EmbedBuilder()
          .setColor(`#987bfe`)
          .setDescription('**Час вийшов! Скасував перезавантаження економіки**')

        await msg.edit({ embeds: [timeEmbed], components: [] });
      };
    });
  }
}