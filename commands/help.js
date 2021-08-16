var Discord = require("discord.js")

module.exports = {
    name : "help",
    syntax : "aks help [command]",
    description : "Enter aks help + command name to display help for that particular command.",
    execute(client, arg, msg){
        if (arg.length <= 0){
            // let commands = require('./commands/')
            // return msg.channel.send(`Please input a command you want to seek help.\nList of Commands:\n`, commands.commandEmbed)
            return msg.channel.send("I'm kinda dumb so i don't really know what i can do right now...")
        }
        else{

            var commandFile = require(`./${arg}`)
            let helpEmbed = new Discord.MessageEmbed()
                .setTitle(`aks ${arg} Command`)
                .setColor("#07c3f2")
                .setDescription(
                    `**Command Name**: ${commandFile.name}
                    **Command Description**: ${commandFile.description}`
                )
                .addFields(
                    { name: 'Command Syntax:', value: `**${commandFile.syntax}**` },
                    { name: `Requested by: ${msg.author.tag}`}
                )
            return msg.channel.send(helpEmbed)
        }
        
    }
}