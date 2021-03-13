const config = require('../config.json')
const Discord = require('discord.js')
 
module.exports = {
    run: message => {
        
        message.channel.send('Voici le shop de la faction\n\nhttps://discord.gg/hs9V9ar83Z')

        // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
            .addField(`Commandes executer`, `> Nom de la commande: shop\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'shop'
}