const Discord = require('discord.js')
const moment = require('moment')
const config = require('../config.json')
 
module.exports = {
    run: (message, args, client) => {
        const member = message.mentions.members.first() || message.member
        message.channel.send(new Discord.MessageEmbed()
            .addField('Membre', member)
            .addField('Tag', member.user.tag)
            .addField('ID', `${member.id}`)
            .addField('Date de création du compte', moment(member.user.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'))
            .addField('Date d\'arrivée sur le serveur', moment(member.joinedAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'))
            .setThumbnail(member.user.displayAvatarURL()))

    // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
        .addField(`Commandes executer`, `> Nom de la commande: ui\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'ui',
    guildOnly: true
}