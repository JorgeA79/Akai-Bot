const { Command } = require('discord-akairo');
const discord = require('discord.js');
const fs = require('fs');

var contents = fs.readFileSync("./JSON/waifus.json");
var jsonContent = JSON.parse(contents);

const Canvas = require('canvas');
const { join } = require('path');
const { registerFont } = require('canvas');
registerFont('./Bebas.ttf', { family: 'Bebas' })


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
            
          const canvas = Canvas.createCanvas(850, 1262);
	  const ctx = canvas.getContext('2d');
          const bgl = await Canvas.loadImage('./Commands/Waifus/Cards/BackgroundL.png');
	  const waifu = await Canvas.loadImage('./Commands/Waifus/Cards/List/Atago.png');		
	  const cardl = await Canvas.loadImage('./Commands/Waifus/Cards/CardInfoL.png');			
	  ctx.drawImage(bgl, 0, 0, canvas.width, canvas.height);
	  ctx.drawImage(waifu, 40, 68, 786, 1164);	
	  ctx.drawImage(cardl, 0, 0, canvas.width, canvas.height);	
	  const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
	  message.channel.send(`:round_pushpin:  |  Profile card of ${message.author.username}`, attachment);	
        }
    }

module.exports = WaifuCommand;
