const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('assignrole')
        .setDescription('Assign a role to a user')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to assign the role to')
                .setRequired(true))
        .addRoleOption(option => 
            option.setName('role')
                .setDescription('The role to assign')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({ content: 'User not found in this guild.', flags: MessageFlags.Ephemeral });
        }

        try {
            await member.roles.add(role);
            return interaction.reply({ content: `Successfully assigned the role ${role.name} to ${user.username}.`, flags: MessageFlags.Ephemeral });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error while assigning the role.', flags: MessageFlags.Ephemeral });
        }
    },
};