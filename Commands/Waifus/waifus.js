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
                    examples: ['waifu'],
                    description: 'Waifus! Display\'s your waifus information'
                },
                cooldown: 2000,
                ratelimit: 3
            })
        }

        async exec(message) {
            
	 const waifuI = jsonContent.waifus[Math.floor(Math.random() * jsonContent.waifus.length)]	
		
          const canvas = Canvas.createCanvas(850, 1262);
	  const ctx = canvas.getContext('2d');
          const bgl = await Canvas.loadImage('./Commands/Waifus/Cards/BackgroundL.png');
	  const waifu = await Canvas.loadImage(waifuI.image);		
	  const cardl = await Canvas.loadImage('./Commands/Waifus/Cards/CardInfoL.png');			
	  ctx.drawImage(bgl, 0, 0, canvas.width, canvas.height);
	  ctx.shadowBlur = 20;
	  ctx.shadowColor = "black";	
	  ctx.drawImage(waifu, 34, 57, 786, 1164);
	  ctx.drawImage(cardl, 0, 0, canvas.width, canvas.height);

	  ctx.font = applyText(canvas, `${waifuI.anime}!`);
	  ctx.fillStyle = '#ffffff';
	  ctx.fillStyle = waifuI.color;	
	  ctx.textAlign = "right";	
	  ctx.fillText(`${waifuI.anime}!`, 800, 1205);	
	  const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
  	  
	  const embed = new discord.MessageEmbed()
	  .setTitle(waifuI.displayName)
	  .setColor(waifuI.color)
 	  .attachFiles([attachment])
	  .setImage('attachment://welcome-image.png');	 	
	  message.channel.send(embed)
	  .then(msg => { msg.react('❤️')
		       }
        }
    }

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;
	do {

	ctx.font = `${fontSize -= 10}px Bebas`;
	} while (ctx.measureText(text).width > canvas.width - 500);
	return ctx.font;
};

module.exports = WaifuCommand;
