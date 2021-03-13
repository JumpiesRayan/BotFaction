const Discord = require('discord.js')
const replies = ['Oui', 'Non', 'Peut être']
const config = require('../config.json')
    
 
module.exports = {
    run: (message, args) => {
        const question = args.join(' ')
        if (!question) return message.channel.send('Veuillez indiquer une question.')
        message.channel.send(replies[Math.floor(Math.random() * replies.length)])

        // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
            .addField(`Commandes executer`, `> Nom de la commande: 8ball\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
        
    },
    name: '8ball'
}