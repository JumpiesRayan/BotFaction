const config = require('../config.json')
const Discord = require('discord.js')
const replies = ['https://cdn.discordapp.com/attachments/797620792694145134/812781544904327188/akari-slap.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812781554514395177/4e9ea150354ad3159339b202cbc6cad9.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812781562046447616/BQM6jEZ-UJLgGUuvrNkYUFk2Ae92E1tAeAfjk_pGLpKnHfWiikue5-m1fMe8_1TjRXlLKNwbrQTs1EfUN5ol3A.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812781592396169216/fm49srQ.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812781579281760307/tenor_1.gif']
const bot = new Discord.Client()

module.exports = {
    run: (message, args) => {
        const slapuser = args.join(' ')
        const member = message.mentions.members.first()
        if (!slapuser) return message.channel.send((new Discord.MessageEmbed)
        .setDescription(`<:slap:817635201635188746> **${message.author.username}** donne une claque à **AcharnéBot** <:slap:817635201635188746>`)
        .setImage(replies[Math.floor(Math.random() * replies.length)])
        .setColor('#f8f8f9'))
        message.channel.send((new Discord.MessageEmbed)
        .setDescription(`<:slap:817635201635188746> **${message.author.username}** donne une claque à **${member.user.username}** <:slap:817635201635188746>`)
        .setImage(replies[Math.floor(Math.random() * replies.length)])
        .setColor('#f8f8f9'))

        // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
            .addField(`Commandes executer`, `> Nom de la commande: slap\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'slap'
}