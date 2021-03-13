const config = require('../config.json')
const Discord = require('discord.js')

 
module.exports = {
    run: (message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const memberMp = message.mentions.members.first()
        if (!memberMp) return message.channel.send('Veuillez mentionner le joueur que vous voulez mp')
        if (!args[0]) return message.channel.send('Veuillez indiquer du texte à envoyer.')
        message.delete()
        memberMp.createDM().then(channel => {
            channel.send(message.content.trim().slice(`${config.prefix}mp ${memberMp}`.length))
        })

        // ---------- | LOGS EXECUTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
            .addField(`Commandes executer`, `> Nom de la commande: mp\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'mp',
}