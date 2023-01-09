const { MessageEmbed, Permissions } = require("discord.js");
const fs = require("fs");
const sleep = require("sleep-promise");
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("bug-answere").setDescription("Answere to a bug2").setDescriptionLocalizations({
        de: "Antworte auf einen Bug-Report von einem User."
    })
        .addStringOption(option => option.setName("member_id").setDescription("Specify the member").setRequired(true))
        .addStringOption(option => option.setName("answere").setDescription("Specify the answere").setRequired(true)),
    async execute(client, interaction) {
        try {
            var member = interaction.options.getString("member_id");
            var answere = interaction.options.getString("answere");


            const ids = ["690582774641328168", "675723273937354775","716394389211185213"];
            if (!ids.includes(interaction.member.id.toString())) {
                client.commands.get("permission_error").execute(client, interaction);
                return client;
            }

            const user = client.users.cache.find(user => user.id === member.toString());
            if (user === undefined || user === null) return interaction.reply("Der angegebene User existiert nicht");

            const bugEmbed = new MessageEmbed()
                .setTitle("Response to your Bug Report")
                .setDescription("This is the Drippy Team's response to your bug:\n" + answere.toString())
                .setTimestamp()
                .setColor("#225781")
                .setThumbnail(interaction.guild.iconURL())

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
            }


            await user.send({embeds: [bugEmbed], components: [button]});
            await interaction.reply("Die Antwort wurde erfolgreich gesendet");
            return client;
        } catch (err) {
            await interaction.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei /bug-ans aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
            return client;
        }
    }
}