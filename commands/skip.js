const path = require("path")

module.exports = {
    name: "skip",
    description: "The current music playing will be skipped",
    syntax: "aks skip",
    execute(client, arg, msg) {
        if (!msg.member.voice.channel) {
            return msg.reply("You need to be in a voice channel!")
        }
        else {
            client.distube.skip(msg)

        }

    }
}