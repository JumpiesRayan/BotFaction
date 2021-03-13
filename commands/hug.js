const config = require('../config.json')
const Discord = require('discord.js')
const replies = ['https://cdn.discordapp.com/attachments/797620792694145134/812768582605602866/anime-hug.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812768595381714984/8572a1d1ebaa45fae290e6760b59caac.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812768604616392764/r9aU2xv.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812768620069388349/BlueDecimalAardwolf-small.gif']
const bot = new Discord.Client()

module.exports = {
    run: (message, args) => {
        const huguser = args.join(' ')
        const member = message.mentions.members.first()
        if (!huguser) return message.channel.send((new Discord.MessageEmbed)
        .setDescription(`<:hug:817635248245964841> **${message.author.username}** donne un câlin à **AcharnéBot** <:hug:817635248245964841>`)
        .setImage(replies[Math.floor(Math.random() * replies.length)])
        .setColor('#f8f8f9'))
        message.channel.send((new Discord.MessageEmbed)
        .setDescription(`<:hug:817635248245964841> **${message.author.username}** donne un câlin à **${member.user.username}** <:hug:817635248245964841>`)
        .setImage(replies[Math.floor(Math.random() * replies.length)])
        .setColor('#f8f8f9'))

        // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
            .addField(`Commandes executer`, `> Nom de la commande: hug\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'hug'
}