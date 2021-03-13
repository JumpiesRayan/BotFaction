const config = require('../config.json')
const Discord = require('discord.js')

module.exports = {
    run: (message, args, client) => {
        const member = message.mentions.members.first() || message.member
        let avatar = member.user.displayAvatarURL({size: 4096, dynamic: true})
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Voici la photo de profil a **${member.user.username}**`)
            .setImage(avatar))

    // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
        .addField(`Commandes executer`, `> Nom de la commande: pp\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'pp',
}