const Discord = require('discord.js');
const {Intents, Client} = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed, Permissions } = require('discord.js');
const fs = require('fs');
const sleep = require('sleep-promise');
//const { SlashCommandBuilder } = require('@discordjs/builders');



var client = new Client({ intents: [
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES]});

require('dotenv').config();

//const g = require('./src/giveaway.json');



const prefix = process.env.PREFIX;



client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slash = new Discord.Collection();
client.admin = new Discord.Collection();



const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events/').filter(file => file.endsWith('.js'));
const slashFiles = fs.readdirSync('./src/slash/').filter(file => file.endsWith('.js'));
const adminFiles = fs.readdirSync('./src/admin/').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
}


for (const file of eventFiles){
    const event = require(`./src/events/${file}`);

    client.events.set(event.name, event);
}


for (const file of slashFiles){
    const command = require(`./src/slash/${file}`);
    client.slash.set(command.data.name, command);
}

for (const file of adminFiles){
    const command = require(`./src/admin/${file}`);
    client.admin.set(command.data.name, command);
}


client.once('ready', async () => {
    console.log(`==========================================`);
    console.log(`Eingeloggt als ${client.user.tag} auf ${client.guilds.cache.size} Servern.`);
    console.log(`==========================================`);
});



client.on("guildCreate", async (guild) => {
    await client.events.get("guildCreate").execute(client, guild, true);
});



//removed from a server
client.on("guildDelete", async (guild) => {
    console.log("Left a guild: " + guild.name);
    //remove from guildArray
});




client.on("guildMemberAdd", async (member) => {
    await client.events.get("guildCreate").execute(client, member.guild, false);
    //await sleep(500);
    //client.events.get("guildMemberAdd").execute(client, member, true);
});




client.on('interactionCreate', async (interaction) => {


    if (interaction.isCommand()) {

        console.log(client.slash)

        let command = client.slash.get(interaction.commandName);

        let admin_command = client.admin.get(interaction.commandName);

        if (command) {
            await command.execute(client, interaction);
        }

        if (admin_command) {
            client = await admin_command.execute(client, interaction);
        }

    }

});



client.on("modalSubmit", async (modal) => {

});





client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


});



client.login(process.env.TOKEN);