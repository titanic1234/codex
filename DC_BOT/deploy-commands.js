const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9");
//const { token } = require('./config.json');
const fs = require('node:fs');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./src/slash/').filter(file => file.endsWith('.js'));

// Place your client and guild ids here


for (const file of commandFiles) {
    const command = require(`./src/slash/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.BOT_APPLICATION_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();