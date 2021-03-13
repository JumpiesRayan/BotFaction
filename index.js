// ---------- | CONFIGURATION | ------------

 const Discord = require('discord.js')
 const config = require('./config.json')
 const fs = require('fs')
 const ms = require('ms')
 const xpfile = require('./xp.json')
 const notif = require('./notif.json')
 const parseDuration = require('parse-duration')
 const humanizeDuration = require('humanize-duration')
 const client = new Discord.Client({fetchAllMembers: true, partials: ['MESSAGE', 'REACTION']})


 client.login(config.token)
 client.commands = new Discord.Collection()
 client.db = require('./db.json')

 fs.readdir('./commands', (err, files) => {
     if (err) throw err
     files.forEach(file => {
         if (!file.endsWith('.js')) return
         const command = require(`./commands/${file}`)
         client.commands.set(command.name, command)
     })
 })

 // ---------- | EXECUTION DES COMMANDES | ------------

 client.on('message', message => {
     const args = message.content.trim().split(/ +/g)
     const commandName = args.shift().toLowerCase()
     if (!commandName.startsWith(config.prefix)) return
     const command = client.commands.get(commandName.slice(config.prefix.length))
     if (!command) return
     if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.')
     command.run(message, args, client)
 })

 // ---------- | PLAYER JOIN | ------------

 client.on('guildMemberAdd', member => {
     member.guild.channels.cache.get(config.greeting.channel).send(`${member}`, new Discord.MessageEmbed()
         .setDescription(`Bienvenue à toi ${member.user}. Grâce à toi nous sommes désormais ${member.guild.memberCount} !`)
         .setImage('')
         .setTitle('Oh ! un nouveau membre !')
         .setColor('RANDOM'))
     member.roles.add(config.greeting.role)
 })

 // ---------- | PLAYER LEFT | ------------

 client.on('guildMemberRemove', member => {
     member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
         .setDescription(`Au revoir ${member.user.tag} 😢`)
         .setImage(``)
         .setTitle(`Un membre vient de partir`)
         .setColor('RANDOM'))
 })

 // ---------- | STATUT DU BOT | ------------

 client.on('ready', () => {
     const statuses = [
         () => `c\'est le serveur a Tyamss !`,
         () => `Ethalia`,
         () => `Histeria`,
         () => `Hevolia`
     ]
     let i = 0
     setInterval(() => {
         client.user.setActivity(statuses[i](), {
             type: 'PLAYING'
         })
         i = ++i % statuses.length
     }, 1e3)
     console.log(`${client.user.tag} est ON !`)
 })

 // ---------- | MUTE ROLE | ------------

 client.on('channelCreate', channel => {
     if (!channel.guild) return
     const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted')
     if (!muteRole) return
     channel.createOverwrite(muteRole, {
         SEND_MESSAGES: false,
         CONNECT: false,
         ADD_REACTIONS: false
     })
 })

 // ---------- | GIVEAWAY | ------------

 client.on('message', async message => {
     let args = message.content.substring(config.prefix).split(" ")

     if (message.content.startsWith(`${config.prefix}gstart`)) {
         if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
         let time = args[1]
         if (!time) return message.channel.send('Veuillez preciser le temps du giveaway')

         if (!args[1].endsWith("d") &&
             !args[1].endsWith("h") &&
             !args[1].endsWith("m") &&
             !args[1].endsWith("s"))
             return message.channel.send("Vous devez utiliser d (jours), h (heures), m (minutes) ou s (secondes)")

         let gchannel = message.mentions.channels.first();
         if (!gchannel) return message.channel.send("Je ne trouve pas ce channel sur le serveur.")

         let prize = args.slice(3).join(" ")
         if (!prize) return message.channel.send('Quel est le prix ?')

         message.delete()
         gchannel.send("<@&792243739241218048> il y a un nouveau giveaway 🎉")
         let gembed = new Discord.MessageEmbed()
             .setTitle('Nouveau Giveaway')
             .setColor('RANDOM')
             .setDescription(`Réagissez avec 🎉 pour participer au concours!\nHébergé par **${message.author}**\nTemps: **${time}** \nPrix: ** ${prize} **`)
             .setTimestamp(Date.now + ms(args[1]))
         let m = await gchannel.send(gembed)
         m.react("🎉")
         setTimeout(() => {
             if (m.reactions.cache.get("🎉").count <= 1) {
                 return message.channel.send("Pas assez de joueurs ont réagi pour que je designer un gagnant !")
             }

             let winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
             gchannel.send(`Félicitations ${winner}! Vous venez de gagner ** ${prize} **!`);
         }, ms(args[1]));
     }
 })

 // ---------- | LOGS GENERAL | ------------

 // MessageDelete
 client.on('messageDelete', async message => {
     message.guild.channels.cache.get(config.logs_general).send(new Discord.MessageEmbed()
         .addField(`Message supprimer`, `> Message envoyer par: ${message.author}\n> Salon: ${message.channel}\n> Message supprimer: ${message.content}`))
 })
 // MessageEdited
 // RoleUpdate
 client.on('roleUpdate', async (oldRole, newRole) => {
     const EmbedRoleUpdate = (new Discord.MessageEmbed)
         .addField(`Role mis a jour`, `> Nouveau nom du role: ${newRole.name}\n> Ancien nom du role: ${oldRole.name}\n> Nouvelle couleur: ${newRole.color}\n> Ancienne couleur: ${oldRole.color}\n> ID du role: ${newRole.id}`)

     client.guilds.cache.get(config.serveurID).channels.cache.get(config.logs_general).send(EmbedRoleUpdate)
 })
 // RoleCreate
 client.on('roleCreate', async (role) => {
     const EmbedRoleCreate = (new Discord.MessageEmbed)
         .addField(`Nouveau role`, `> Nom du role: ${role.name}\n> Couleur du role: ${role.color}\n> ID du role: ${role.id}`)

     client.guilds.cache.get(config.serveurID).channels.cache.get(config.logs_general).send(EmbedRoleCreate)
 })
 // RoleDelete
 client.on('roleDelete', async (role) => {
     const EmbedRoleDelete = new Discord.MessageEmbed()
         .addField(`Role supprimer`, `> Nom du role: ${role.name}\n> Couleur du role: ${role.color}\n> ID du role: ${role.id}`)

     client.guilds.cache.get(config.serveurID).channels.cache.get(config.logs_general).send(EmbedRoleDelete)
 })

 // ---------- | SYSTEME DE MUSIQUE | ------------

 // ---------- | SYSTEME DE LEVEL | ------------


 client.on("message", function (message) {
     if (message.author.Client) return;
     var addXP = Math.floor(Math.random() * 25); //lorsque je tape addXP, il choisit au hasard un nombre compris entre 1 et 50   [  Math.floor(Math.random() * 10)  ]
     // lvl 1 statics
     if (!xpfile[message.author.id]) {
         xpfile[message.author.id] = {
             xp: 0,
             level: 1,
             reqxp: 100
         }
         // catch errors
         fs.writeFile("./xp.json", JSON.stringify(xpfile), function (err) {
             if (err) console.log(err)
         })
     }

     xpfile[message.author.id].xp += addXP

     if (xpfile[message.author.id].xp > xpfile[message.author.id].reqxp) {
         xpfile[message.author.id].xp -= xpfile[message.author.id].reqxp // il soustraira d'xp chaque fois que vous passerez d'un lvl
         xpfile[message.author.id].reqxp *= 1.5 // XP que vous devez augmenter si le niveau 1 est de 100 xp donc le niveau 2 sera de 200 xp (multiplié par 2 [   .reqxp *= 2  ])
         xpfile[message.author.id].reqxp = Math.floor(xpfile[message.author.id].reqxp) // XP Round
         xpfile[message.author.id].level += 1 // Ajoute 1 niveau quand au joueur qui a levl up.

         // code quand quelqu'un passe d'un niveau.       
         message.guild.channels.cache.get(config.xpchannel).send(message.author,new Discord.MessageEmbed()
         .addField(`<:smile:818648895441338428> GG ${message.author.username} <:smile:818648895441338428>`, `Tu viens de monter d'un niveau !\nTu es maintenant niveau **${xpfile[message.author.id].level}**`)
         .setColor('#149775'))

     }
     // Erreur logs
     fs.writeFile("./xp.json", JSON.stringify(xpfile), function (err) {
         if (err) console / log(err)
     })

     //if someone typed in chat =level it will make a embed 
     if (message.content.startsWith("$rank")) {
         let user = message.mentions.users.first() || message.author

         let embedxp = new Discord.MessageEmbed()
             .setTitle(`Carte d'xp a ${user.username}`)
             .setColor("#149775")
             .addField(`*Niveau:*`, `*${xpfile[user.id].level}*`)
             .addField("*XP:* ", `*${xpfile[user.id].xp}  /  ${xpfile[user.id].reqxp}*`)
             .setThumbnail(user.displayAvatarURL())
         message.channel.send(embedxp)
     }
 })

// ---------------- | Reaction Role NOTIF | --------------------

 client.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = notif.reactionRole[reaction.message.id]
    if (!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
    else reaction.users.remove(user)
})

client.on('messageReactionRemove', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = notif.reactionRole[reaction.message.id]
    if (!reactionRoleElem || !reactionRoleElem2.removable) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})

// ---------- | ANTI-INSULTE | ------------

client.on('message', async message => {

    if (message.content.search("fdp") > -1) {
        message.delete()
    }

    if (message.content.search("f.d.p") > -1) {
        message.delete()
    }

    if (message.content.search("FDP") > -1) {
        message.delete()
    }

    if (message.content.search("F D P") > -1) {
        message.delete()
    }

    if (message.content.search("Fdp") > -1) {
    message.delete()
    }


    if (message.content.search("pute") > -1) {
        message.delete()
    }

    if (message.content.search("PUTE") > -1) {
        message.delete()
    }

    if (message.content.search("P U T E") > -1) {
        message.delete()
    }

    if (message.content.search("p u t e") > -1) {
        message.delete()
    }

    if (message.content.search("p.u.t.e") > -1) {
        message.delete()
    }

    if (message.content.search("P.U.T.E") > -1) {
        message.delete()
    }

    if (message.content.search("Pute") > -1) {
        message.delete()
    }


    if (message.content.search("Tg") > -1) {
        message.delete()
    }

    if (message.content.search("tg") > -1) {
        message.delete()
    }

    if (message.content.search("TG") > -1) {
        message.delete()
    }

    if (message.content.search("tG") > -1) {
        message.delete()
    }

    if (message.content.search("Ta gueule") > -1) {
        message.delete()
    }

    if (message.content.search("ta gueule") > -1) {
        message.delete()
    }

    if (message.content.search("ta geule") > -1) {
        message.delete()
    }

    if (message.content.search("Ta geule") > -1) {
        message.delete()
    }

    if (message.content.search("ta yeule") > -1) {
        message.delete()
    }

    if (message.content.search("enculer") > -1) {
        message.delete()
    }

    if (message.content.search("ntm") > -1) {
    message.delete()
    }

    if (message.content.search("Ntm") > -1) {
    message.delete()
    }

    if (message.content.search("nique") > -1) {
    message.delete()
    }

    if (message.content.search("Nique") > -1) {
    message.delete()
    }

    if (message.content.search("salope") > -1) {
    message.delete()
    }

    if (message.content.search("slp") > -1) {
    message.delete()
    }

    if (message.content.search("Enculer") > -1) {
    message.delete()
    }

    if (message.content.search("Battard") > -1) {
    message.delete()
    }

    if (message.content.search("battard") > -1) {
    message.delete()
    }

    if (message.content.search("batard") > -1) {
    message.delete()
    }

    if (message.content.search("Batard") > -1) {
    message.delete()
    }

    if (message.content.search("conar") > -1) {
    message.delete()
    }

    if (message.content.search("Conar") > -1) {
    message.delete()
    }

    if (message.content.search("Connard") > -1) {
    message.delete()
    }

    if (message.content.search("Conard") > -1) {
    message.delete()
    }

    if (message.content.search("conard") > -1) {
    message.delete()
    }

    if (message.content.search("bz") > -1) {
    message.delete()
    }

    if (message.content.search("Baiser") > -1) {
    message.delete()
    }

    if (message.content.search("baiser") > -1) {
    message.delete()
    }

    if (message.content.search("baize") > -1) {
    message.delete()
    }

    if (message.content.search("Baize") > -1) {
    message.delete()
    }

    if (message.content.search("Connar") > -1) {
    message.delete()
    }

    if (message.content.search("connar") > -1) {
    message.delete()
    }

})