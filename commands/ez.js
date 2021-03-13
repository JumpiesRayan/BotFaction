const config = require('../config.json')
const Discord = require('discord.js')
const replies = ['https://cdn.discordapp.com/attachments/797620792694145134/812763802096631818/yw09bY.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812763783197491210/tenor_1.gif']
const bot = new Discord.Client()

module.exports = {
    run: (message, args) => {
        const ezuser = args.join(' ')
        const member = message.mentions.members.first()
        if (!ezuser) return message.channel.send((new Discord.MessageEmbed)
        .setDescription(`<:ez:794385065038839850> **${message.author.username}** ez **AcharnéBot** <:ez:794385065038839850>`)
        .setImage(replies[Math.floor(Math.random() * replies.length)])
        .setColor('#f8f8f9'))
        message.channel.send((new Discord.MessageEmbed)
        .setDescription(`<:ez:794385065038839850> **${message.author.username}** ez **${member.user.username}** <:ez:794385065038839850>`)
        .setImage(replies[Math.floor(Math.random() * replies.length)])
        .setColor('#f8f8f9'))

        // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
            .addField(`Commandes executer`, `> Nom de la commande: ez\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'ez'
}