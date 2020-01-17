const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { duration } = require('../../Util/Functions');

    class UptimeCommand extends Command {
        constructor() {
            super('uptime', {
                aliases: ['uptime'],
                category: 'Miscellaneous',
                description: {
                    usage: 'uptime',
                    examples: ['uptime'],
                    description: 'Display\'s the bots uptime'
                },
                cooldown: 2000,
                ratelimit: 3
            })
        }

        exec(message) {
            return message.util.send(
                new MessageEmbed()
                    .setColor(this.client.colors['defaultColor'])
                    .setDescription(`\`${duration(this.client.uptime)}\``)
            );
        }
    }

module.exports = UptimeCommand;