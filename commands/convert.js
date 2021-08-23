
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'convert',
    aliases: ['convert', 'Convert'],
    syntax: "./convert",
    description: "Convert text to Doggo Lingo",
    execute(client, arg, msg) {

        if (arg[0] === undefined) return msg.reply("Pupper's head hurts from nothingness! 🐶🥺")
        if (!(isNaN(arg[0]))) return msg.reply("Doggo heckin good at maff!")
        let doggoSpeech = ['bark', 'ruff', 'pupper', 'floof', 'lotsa', 'wag', 'heck', 'treat', 'fluff', 'hangry', 'spoof']
        // Convertor
        let doggoConvertor = (text) =>{
            let tempText = []
            let dogeWords = {1 : 0, 0 : 0}
            let probability = 0.3
            let wordArr = text.split(" ")
                do {
                    for (let word in wordArr) {
                        let randNum = Math.floor(Math.random() * doggoSpeech.length)
                        let change = Math.round(Math.random() * 1) + 0
                        if (change === 1) {
                            tempText.push(doggoSpeech[randNum])
                            dogeWords[1]++
                        }
                        else {
                            tempText.push(wordArr[word])
                            dogeWords[0]++
                        }
                    }
                }
                while ((dogeWords[1] / text.length) > probability)

            if (tempText.join(" ") === text) doggoConvertor(text)
            return tempText.join(" ")
        }



        let embedCreator = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Doggo lingo for ${arg.join(" ")}`)
            .setURL('https://www.github.com/angks/MakanBot')
            .setAuthor(`Requested by ${msg.member.displayName}`, msg.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail('https://github.com/AngKS/MakanBot/blob/master/doge.jpg?raw=true')
            .setDescription(
                `## ${doggoConvertor(arg.join(" "))}`
            )
            // .addField('Inline field title', 'Some value here', true)
            .setTimestamp()
            .setFooter('Brought to you by AKS', 'https://angks.github.io/static/media/520x520.ebb5c5d5.png');


        return msg.channel.send(doggoConvertor(arg.join(" ")))
    }
}