const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const sleep = require("sleep-promise");
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("infos").setDescription("Some info about the bot").setDescriptionLocalizations({
        de: "Einige Informationen über den Bot"
    }),
    async execute(client, interaction) {
        try {

            const infoEmbed = new MessageEmbed()
                .setColor("#1f8a4c")
                .setTitle("Info")
                .setDescription("Here are a few bot infos")
                .addFields(
                    {name: "Name", value: "Codex#4669", inline: false},
                    {name: "Number of servers: ", value: "Count: " + client.guilds.cache.size, inline: false},
                    {name: "Developer: ", value: "R.M.S Titanic#7956", inline: false},
                    {name: "Version: ", value: "0.1.0 Alpha", inline: false},
                    {name: "Last Update: ", value: "12.01.2023", inline: false},
                    {name: "Bug Report", value: `Bugs can be reported via /bug [bug].`, inline: false}
                )
                .setTimestamp()



            await interaction.reply({embeds: [infoEmbed], ephemeral: true});

        } catch (err) {
            await interaction.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei /infos aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }


    }
}