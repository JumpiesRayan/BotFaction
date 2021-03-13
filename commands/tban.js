const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration'),
    Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à bannir.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas bannir le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas Bannir ce membre.')
        if (!member.bannable) return message.channel.send('Le bot ne peut pas bannir ce membre.')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Veuillez indiquer une durée valide.')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        await member.ban({reason})
        message.delete()
        message.channel.send(new Discord.MessageEmbed()
        .addField(`${member.user.tag} a été ban`, `Durée: ${humanizeDuration(duration, {language: 'fr'})}\nRaison: ${reason}`))
        setTimeout(() => {
            message.guild.members.unban(member)
            message.guild.channels.cache.get(config.logs).send(`${member.user.tag} a été débanni.`)
        }, duration)

        // ---------- | LOGS TEMP BAN | ------------

        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .addField(`『BAN』 ${member.user.tag}`, `Utilisateur: ${member}\nModérateur: ${message.author}\nRaison: ${reason}`)
            .setColor('#8E0B02'))

        // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
            .addField(`Commandes executer`, `> Nom de la commande: tban\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'tban',
    guildOnly: true
}