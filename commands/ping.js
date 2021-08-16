
module.exports = {
    name : "ping",
    aliases : ["pong"],
    syntax : "./ ping",
    description : "Fetches the Bot's Ping",
    execute(client, arg, msg){
        const msgAuthor = msg.author
        const adjectives = ["Why the fk did you talk to me?", "STFU I'm Busy", "Go find out yourself idiot!"]
        var adj = Math.floor(Math.random() * adjectives.length) + 1
        return msg.channel.send("Pinging")
            .then(msg => {
                msg.edit('',
                    {
                        embed: {
                            author: {
                                name: `${adjectives[adj]}`,
                                icon_url: msg.author.displayAvatarURL(),
                            },
                            description: [
                                `Why you so laggy? **Stupid ${Date.now() - msg.createdAt} ms.**`, "Even my Grandmother runs faster than this...", "Did you not pay your internet bills?",
                            ].join("\n"),
                            color: "#07c3f2",
                            footer: {
                                text: "Requested by " + msgAuthor.tag,
                                icon_url: `${msgAuthor.displayAvatarURL({ dynamic: true })}`
                            },
                            timestamp: new Date()
                        }
                    })
            })
            .catch(error => {
                console.error("I-I couldn\'t ping...\n", error);
                return msg.channel.send(":x: I-I failed to ping... Sorry!")
            })
    }
    


}