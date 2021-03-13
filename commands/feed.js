const config = require('../config.json')
const Discord = require('discord.js')
const replies = ['https://cdn.discordapp.com/attachments/797620792694145134/812780272926851082/original.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812780256909197332/313.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812779857548935248/kanzashi-eating.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812779844504911983/giphy_1.gif', 'https://cdn.discordapp.com/attachments/797620792694145134/812779828788985936/tumblr_mw48km34yJ1skw6elo1_500.gif']
const client = new Discord.Client()

module.exports = {
    run: (message, args) => {
        const feeduser = args.join(' ')
        const member = message.mentions.members.first()
        if (!feeduser) return message.channel.send((new Discord.MessageEmbed)
        .setDescription(`**${message.author.username}** nourrit **AcharnéBot**`)
        .setImage(replies[Math.floor(Math.random() * replies.length)])
        .setColor('#f8f8f9'))
        message.channel.send((new Discord.MessageEmbed)
        .setDescription(`**${message.author.username}** nourrit **${member.user.username}**`)
        .setImage(replies[Math.floor(Math.random() * replies.length)])
        .setColor('#f8f8f9'))

        // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
            .addField(`Commandes executer`, `> Nom de la commande: feed\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'feed'
}