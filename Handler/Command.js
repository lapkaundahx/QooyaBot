const { readdirSync } = require('fs');

function loadCommands(client) {

    const commandsFolder = readdirSync('./Commands');
  
    for (const folder of commandsFolder) {
        const commandsFiles = readdirSync(`./Commands/${folder}`)
        .filter((file) => file.endsWith(".js"));  

        for (const file of commandsFiles) {
          const commandFile = require(`../Commands/${folder}/${file}`);

          if (commandFile.name) {
                client.commands.set(commandFile.name, commandFile);
          }

          if (commandFile.aliases && Array.isArray(commandFile.aliases)) commandFile.aliases.forEach((alias) => client.aliases.set(alias, commandFile.name));
        }     
    }
  
}

module.exports = { loadCommands };