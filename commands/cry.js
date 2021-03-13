const config = require('../config.json')
const Discord = require('discord.js')
const replies = ['https://media.discordapp.net/attachments/779117442420178974/818196036480532480/3c691659f01aba24f6a6deed24305989.gif','https://media.discordapp.net/attachments/779117442420178974/818196050141511681/6bd73801b4f4eff060238e39a523505f.gif', 'https://media.discordapp.net/attachments/779117442420178974/818196055262494720/giphy.gif']
const client = new Discord.Client()

module.exports = {
    run: (message, args) => {
        message.channel.send((new Discord.MessageEmbed)
        .setDescription(`<:crying:818196783649259521> **${message.author.username}** pleure de tristesse <:crying:818196783649259521>`)
        .setImage(replies[Math.floor(Math.random() * replies.length)])
        .setColor('#f8f8f9'))

        // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
            .addField(`Commandes executer`, `> Nom de la commande: cry\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'cry'
}