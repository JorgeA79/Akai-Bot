const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

var contents = fs.readFileSync("./JSON/waifus.json");
var jsonContent = JSON.parse(contents);

    class WaifuCommand extends Command {
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
            
            const args = message.content.slice('p!').split(` `);
		
	          if (!args[1]) {
	          return message.channel.send("You need to specify a Waifu");
	          }
            	  const waifus = {
	          "URARAKA":jsonContent.waifus[0],
          	  "ATAGO":jsonContent.waifus[1],
	          "SYLPHYN":jsonContent.waifus[2],	
	           }
	           const embed = new MessageEmbed()
	              .setTitle(waifus[args[1].toUpperCase()].displayName)
	              .setDescription(waifus[args[1].toUpperCase()].description)
	              .addField("Anime/Game:", waifus[args[1].toUpperCase()].anime, true)
	              .addField("Gender:", waifus[args[1].toUpperCase()].gender, true)
	              .setThumbnail(waifus[args[1].toUpperCase()].image)
	           return message.channel.send(embed);
            
        }
    }

module.exports = WaifuCommand;
