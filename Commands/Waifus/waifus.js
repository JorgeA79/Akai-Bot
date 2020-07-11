const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
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
            
          const canvas = Canvas.createCanvas(500, 500);
	  const ctx = canvas.getContext('2d');
            
        }
    }

module.exports = WaifuCommand;
