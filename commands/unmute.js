const Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à unmute.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez unmute le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas unmute ce membre.')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas unmute ce membre.')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return message.channel.send('Ce joueur n\'est pas mute.')
        await member.roles.remove(muteRole)
        message.delete()
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`${member.tag} a été unmute`)) 

        // ---------- | LOGS UNMUTE | ------------

        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .addField(`『UNMUTE』 ${member.user.tag}`, `Utilisateur: ${member}\nModérateur: ${message.author}\nRaison: ${reason}`))

        // ---------- | LOGS EXECUTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
        .addField(`Commandes executer`, `> Nom de la commande: unmute\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'unmute',
    guildOnly: true
}