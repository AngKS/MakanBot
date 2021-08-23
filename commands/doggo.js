
const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'doggo',
    aliases : ['doggo', 'gimme'],
    syntax : "./doggo",
    description : "Generates a paragraph of Doggo Ipsum",
    execute(client, arg, msg){

        arg.length > 0 ? arg = arg : arg = 1

        if (arg > 3) return msg.reply("pupper's head hurts ;(")

        const poems = [
            "Over hill, over dale, Thorough bush, thorough brier, Over park, over pale,Thorough flood, thorough fire! I do wander everywhere,Swifter than the moon\'s sphere; And I serve the Fairy Queen, To dew her orbs upon the green; The cowslips tall her pensioners be; In their gold coats spots you see; Those be rubies, fairy favours; In those freckles live their savours; I must go seek some dewdrops here, And hang a pearl in every cowslip\'s ear.",
            "When forty winters shall beseige thy brow, And dig deep trenches in thy beauty's field, Thy youth's proud livery, so gazed on now, Will be a tatter'd weed, of small worth held: Then being ask'd where all thy beauty lies, Where all the treasure of thy lusty days, To say, within thine own deep - sunken eyes, Were an all - eating shame and thriftless praise. How much more praise deserved thy beauty's use, If thou couldst answer 'This fair child of mine Shall sum my count and make my old excuse, ' Proving his beauty by succession thine! This were to be new made when thou art old, And see thy blood warm when thou feel'st it cold",
            "Is it for fear to wet a widow's eye That thou consumest thyself in single life ? Ah! if thou issueless shalt hap to die. The world will wail thee, like a makeless wife; The world will be thy widow and still weep That thou no form of thee hast left behind, When every private widow well may keep By children's eyes her husband's shape in mind. Look, what an unthrift in the world doth spend Shifts but his place, for still the world enjoys it; But beauty's waste hath in the world an end, And kept unused, the user so destroys it. No love toward others in that bosom sits That on himself such murderous shame commits."
        ]
        let doggoSpeech = ['bark', 'ruff', 'pupper', 'floof', 'lotsa', 'wag', 'heck', 'treat', 'fluff', 'hangry', 'spoof']

        let doggoGenerator = (para = 1) =>{
            let wholeText = []
            for (var i = 0; i < para; i++){
                let tempText = []
                // Select random phrase
                let randPoem = Math.floor(Math.random() * poems.length)
                let wordArr = poems[randPoem].split(" ")
                // let randNum = Math.floor(Math.random() * doggoSpeech.length)
                for (let word in wordArr) {
                    let randNum = Math.floor(Math.random() * doggoSpeech.length)
                    let change = Math.round(Math.random() * 1) + 0
                    change === 1 ? tempText.push(doggoSpeech[randNum]) : tempText.push(wordArr[word])

                }
                wholeText.push(tempText.join(" "))
            }
            return wholeText


        }

        let embedCreator = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${arg} ${arg === 1 ? 'paragraph' : 'paragraphs'} of Doggo Ipsum`)
            .setURL('https://www.github.com/angks/MakanBot')
            .setAuthor(`Requested by ${msg.member.displayName}`, msg.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail('https://github.com/AngKS/MakanBot/blob/master/doge.jpg?raw=true')
            .setDescription(
                doggoGenerator(arg).join("\n\n")
            )
            .addField('Inline field title', 'Some value here', true)
            .setTimestamp()
            .setFooter('Brought to you by AKS', 'https://angks.github.io/static/media/520x520.ebb5c5d5.png');


        return msg.channel.send(embedCreator)
    }
}