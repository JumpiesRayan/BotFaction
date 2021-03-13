const config = require('../config.json')
const Discord = require('discord.js')
 
module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Voici la liste des commandes')
            .addField('> 🎲  fun', 'kiss, feed, hug, cry, ez, slap, pp, 8ball, say, mp')
            .addField('> 📊  sondage', 'poll')
            .addField('> 🎉  giveaway', 'gstart')
            .addField('> 🎵  music', 'En maintenance')
            .addField('> 🆙  niveau', 'rank')
            .addField('> ⚔️  staff', 'ban, tban, kick, tmute, unmute, clear')
            .addField('> 🎟️  tickets', 'new, close')
            .addField('> 🗃️  utiles', 'shop, ui, si, bi'))

            // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
        .addField(`Commandes executer`, `> Nom de la commande: help\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'help'
}