const { MessageEmbed, Permissions} = require("discord.js");
const fs = require("fs");
const sleep = require("sleep-promise");
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create_ticket")
        .setDescription("Create a message to be able to create support tickets.")
        .setDefaultMemberPermissions(Permissions.FLAGS.ADMINISTRATOR)
        .setDescriptionLocalizations({
        de: "Erstelle eine Nachricht, um Support Tickets erstellen zu können."
    })
        .addChannelOption(option => option
            .setName("channel")
            .setDescription("Set the channel. Support tickets are opened in the same category.")
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName("ticket_message")
            .setDescription("Set the message from the ticket.")
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName("ticket_welcome_message")
            .setDescription("Create the message that will be sent when the ticket is opened.")
            .setRequired(true)
        ),
    async execute(client, interaction) {
        try {
            var channel = interaction.options.getChannel("channel");
            var ticket_message = interaction.options.getString("ticket_message");
            var ticket_welcome_message = interaction.options.getString("ticket_welcome_message");

            console.log(channel.id)
            console.log(ticket_message)
            console.log(ticket_welcome_message)


            const ticketEmbed = new MessageEmbed()
                .setTitle("**Ticket Support**")
                .setDescription(`**Create Ticket**\n${ticket_message.toString()}`)
                .setColor("#fd9978")


            const button = {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Create Ticket",
                        "style": 3,
                        "custom_id": `ticket:::${interaction.guild.id.toString()}:::${channel.id.toString()}:::${ticket_welcome_message.toString()}`,
                    }
                ]
            };

            console.log("test")



            await channel.send({embeds: [ticketEmbed], components: [button]});

            return interaction.reply("Ticket message created successfully!")

        } catch (err) {
            client.error(err);
        }
    }
}