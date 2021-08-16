const path = require("path")

module.exports = {
    name: "stop",
    description: "The bot will stop any audio its playing",
    syntax: "aks stop",
    execute(client, arg, msg) {
        if (!msg.member.voice.channel) {
            return msg.reply("You need to be in a voice channel!")
        }
        else {
            client.distube.stop(msg)
            return msg.channel.send("Music has been stopped! Goodbye!")
        }

    }
}