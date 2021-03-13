const Discord = require('discord.js')
const moment = require('moment')
const config = require('../config.json')
 
module.exports = {
    run: message => {
        const owneruser = message.guild.owner
        message.channel.send(new Discord.MessageEmbed()
            .addField('Propriétaire', `<@382943798482829322>`)
            .addField('Région', message.guild.region)
            .addField('Utilisateurs', `${message.guild.memberCount}`)
            .addField('Salons', `${message.guild.channels.cache.size} salons`)
            .addField('Emojis', `${message.guild.emojis.cache.size} emojis`)
            .addField('Rôles', `${message.guild.roles.cache.size}`)
            .addField('Nitro boost', `Tier : ${message.guild.premiumTier}\nNombre de boosts : ${message.guild.premiumSubscriptionCount}`)
            .setTitle(`Informations sur le serveur ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL())
            .setImage(message.guild.bannerURL()))

    // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
        .addField(`Commandes executer`, `> Nom de la commande: si\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'si',
    guildOnly: true
}