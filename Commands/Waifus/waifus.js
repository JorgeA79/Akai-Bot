const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

var contents = fs.readFileSync("./waifus.json");
var jsonContent = JSON.parse(contents);

    class PingCommand extends Command {
        constructor() {
            super('waifu', {
                aliases: ['waifu', 'waifus'],
                category: 'Anime',
                description: {
                    usage: 'waifu',
                    examples: ['waifu Uraraka'],
                    description: 'Waifus! Display\'s your waifus information'
                },
                cooldown: 2000,
                ratelimit: 3
            })
        }

        async exec(message) {
            
            const args = msg.content.slice(prefix.length).split(` `);
		
	          if (!args[1]) {
	          return message.channel.send("You need to specify a Waifu");
	          }
            const waifus = {
	          "URARAKA":jsonContent.waifus[0],
          	"ATAGO":jsonContent.waifus[1],
	          "SYLPHYN":jsonContent.waifus[2],	
	           }
	           const embed = new Discord.MessageEmbed()
	              .setTitle(waifus[args[1].toUpperCase()].displayName)
	              .setDescription(waifus[args[1].toUpperCase()].description)
	              .addField("Anime/Game:", waifus[args[1].toUpperCase()].anime, true)
	              .addField("Gender:", waifus[args[1].toUpperCase()].gender, true)
	              .setThumbnail(waifus[args[1].toUpperCase()].image)
	           return msg.channel.send(embed);
            
        }
    }

module.exports = WaifuCommand;
