const config = require('../config.json'),
    fs = require('fs'),
    Discord = require('discord.js')
 
module.exports = {
    run: async (message, args, client) => {
        if (Object.values(client.db.tickets).some(ticket => ticket.author === message.author.id)) return message.channel.send('Vous avez déjà un ticket d\'ouvert.')
        let reason = message.content.split(" ")
        const raison = reason[1]
        if (!raison) return message.channel.send('Veuillez indiquer la raison de votre ticket')
        const channel = await message.guild.channels.create(`${raison} ${message.author.username}`, {
            type: 'text',
            parent: config.ticket.category,
            permissionOverwrites: [{
                id: message.guild.id,
                deny: 'VIEW_CHANNEL'
            }, {
                id: message.author.id,
                allow: 'VIEW_CHANNEL'
            }, ...config.ticket.roles.map(id => ({
                id,
                allow: 'VIEW_CHANNEL'
            }))]
        })
        client.db.tickets[channel.id] = {
            author: message.author.id
        }
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        channel.send(new Discord.MessageEmbed()
            .setDescription(`Bonjour ${message.member}, bienvenue dans votre ticket. Nous allons nous occuper de vous.`))
        message.delete()
        message.channel.send(`Votre ticket ${channel} a été créé !`)

        // ---------- | LOGS EXECTIONS DE LA COMMANDES | ------------

        message.guild.channels.cache.get(config.logs_command).send(new Discord.MessageEmbed()
            .addField(`Commandes executer`, `> Nom de la commande: new\n> Utilisateur: ${message.author}\n> ID de l'utilisateur: ${message.author.id}`))
    },
    name: 'new',
    guildOnly: true
}