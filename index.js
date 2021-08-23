const Discord = require('discord.js')
const fs = require("fs")
const ms = require("ms")
const ytdl = require("ytdl-core")
const { clear } = require('console')
const path = require("path")
const distube = require("distube")

const bot_token = process.env['token']
const prefix = process.env['prefix']

const client = new Discord.Client()
client.commands = new Discord.Collection()
const embedMSG = new Discord.MessageEmbed()
const category = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

client.distube = new distube(client, { searchSongs: false, emitNewSongOnly: true })
// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\``
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });



client.once('ready', () => {
    console.log("Beep Boop! I'm Online.")
    const channel = client.channels.cache.get('776715690161209364');
    client.user.setStatus("online", "Made by @AKS")
    // channel.send("everyone Annyeong!! AKS-Bot is Ready to Rock!!!");
})

client.once('disconnect', () => {
    connection.disconnect()
    console.log('Goodbye! It was fun while it lasted... Sad that you have to shut me down. 😭😭')

})

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    let commandsNames = `${category.get(command.category)} ${command.name}`;
    category.set(command.category, commandsNames);
    client.commands.set(command.name, command);
    if (category.get(command.category) == undefined) commandsNames = `${command.name}`;
    console.log(commandsNames)

}

// Listen for Messages
client.on('message', async (msg) => {
    if (msg.author.bot) return null
    if (msg.content.toLowerCase().startsWith(prefix)) {
        // Bot Commands
        let arg = msg.content.slice(prefix.length).trim().split(/ +/)
        let command = arg.shift().toLowerCase()
        console.log(arg)

        // if (!client.commands.has(command)) return;
        if (!command) {
            return msg.channel.send("Are you fkin illiterate!? Write something i can Understand")
        }
        else {
            try {

                if (command == 'vege') {
                    return msg.reply("-tarian!🥦🥦🥦 EAT YOUR FUCKING VEGETABLES!!!")
                }
                
                else {
                    client.commands.get(`${command}`).execute(client, arg, msg);
                }

            } catch (error) {
                console.error(error);
                msg.reply('there was an error trying to execute that command!');
            }
        }

    }



})



client.login(bot_token)