const path = require("path")

module.exports = {
    name: "play",
    description: "The bot will join the current voice channel you are in and say whatever TODO item you have previously added.",
    syntax: "aks play",
    execute(client, arg, msg) {
        if (!msg.member.voice.channel) {
            return msg.reply("You need to be in a voice channel!")
        }
        else {
            client.distube.play(msg, arg.join(" "))
            
        }

    }
}