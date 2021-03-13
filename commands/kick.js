const Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à exclure.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas exclure le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas exclure ce membre.')
        if (!member.kickable) return message.channel.send('Le bot ne peut pas exclure ce membre.')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        await member.kick(reason)
        message.delete()
        message.channel.send((new Discord.MessageEmbed)
        .addField(`${member.user.tag} a été kick`, `Raison: ${reason}`))

        // ---------- | LOGS KICK | ------------

        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .addField(`『KICK』 ${member.user.tag}`, `Utilisateur: ${member}\nModérateur: ${message.author}\nRaison: ${reason}`))
            // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
        .addField(`Commandes executer`, `> Nom de la commande: kick\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'kick',
    guildOnly: true
}