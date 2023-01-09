const { MessageEmbed, Permissions } = require("discord.js");
const fs = require("fs");
const sleep = require("sleep-promise");
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("reload").setDescription("Reload some commands (Only andmin)").setDescriptionLocalizations({
        de: "Lade eine Gruppe von Befehlen neu (Nur Admins)"
    })
        .addStringOption(option =>
            option
                .setName("commands")
                .setDescription("Choice the command group")
                .addChoices(
                    { name: "Admin commands", value: "admin" },
                    { name: "Channel commands", value: "command" },
                    { name: "Slash commands", value: "slash" },
                    { name: "Events", value: "events" })
                .setRequired(true)),
    async execute(client, interaction) {
        //try {
            var commands = interaction.options.getString("commands");


            const ids = ["690582774641328168"];
            if (!ids.includes(interaction.member.id.toString())) {
                client.admin.get("permission_error").execute(client, interaction);
                return client;
            }

            if (commands === "admin") {
                delete client.admin
                client.admin = new Discord.Collection();
                const adminFiles = fs.readdirSync('./src/admin/').filter(file => file.endsWith('.js'));
                for (const file of adminFiles){
                    const command = require(`../admin/${file}`);
                    client.admin.set(command.data.name, command);
                }
            }

            else if (commands === "slash") {
                delete client.slash

                client.slash = new Discord.Collection();

                const slashFiles = fs.readdirSync('./src/slash/').filter(file => file.endsWith('.js'));

                for (const file of slashFiles) {
                    let command = require(`../slash/${file.toString()}`);
                    client.slash.set(command.data.name, command);
                }

            }

            else if (commands === "command") {
                delete client.commands
                client.commands = new Discord.Collection();
                const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
                for (const file of commandFiles){
                    const command = require(`../commands/${file}`);
                    client.commands.set(command.name, command);
                }
            }

            else if (commands === "events") {
                delete client.events
                client.events = new Discord.Collection();
                const eventFiles = fs.readdirSync('./src/events/').filter(file => file.endsWith('.js'));
                for (const file of eventFiles){
                    const event = require(`../events/${file}`);
                    client.events.set(event.name, event);
                }
            }



            const reloadEmbed = new MessageEmbed()
                .setTitle("Command Group Reaload")
                .setDescription("Die ausgewählte Command Gruppe wurde neu geladen: " + commands.toString() + " group")
                .setTimestamp()
                .setColor("#225781")
                .setThumbnail(interaction.guild.iconURL());

            const button = {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Sent by Codex",
                        "style": 2,
                        "custom_id": "codex",
                        "disabled": true
                    }
                ]
            };


            await interaction.reply({embeds: [reloadEmbed], components: [button]});
            return client;
        /*} catch (err) {
            await interaction.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei /reload aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
            return client;
        }
        */
    }
}