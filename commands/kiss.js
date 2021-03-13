const config = require('../config.json')
const Discord = require('discord.js')
const replies = ['https://cdn.discordapp.com/attachments/797620792694145134/812771293048340581/source.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812771250795184158/giphy.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812771226849116270/1565581043_toradora_kiaa.gif']
const bot = new Discord.Client()

module.exports = {
    run: (message, args) => {
        const kissuser = args.join(' ')
        const member = message.mentions.members.first()
        if (!kissuser) return message.channel.send((new Discord.MessageEmbed)
        .setDescription(`<:kiss:817635307981504512> **${message.author.username}** embrasse **AcharnéBot** <:kiss:817635307981504512>`)
        .setImage(replies[Math.floor(Math.random() * replies.length)])
        .setColor('#f8f8f9'))
        message.channel.send((new Discord.MessageEmbed)
        .setDescription(`<:kiss:817635307981504512> **${message.author.username}** donne un câlin à **${member.user.username}** <:kiss:817635307981504512>`)
        .setImage(replies[Math.floor(Math.random() * replies.length)])
        .setColor('#f8f8f9'))

        // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
            .addField(`Commandes executer`, `> Nom de la commande: kiss\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'kiss'
}