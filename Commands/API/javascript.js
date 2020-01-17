const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const qs = require('querystring');

    class JavaScriptCommand extends Command {
        constructor() {
            super('javascript', {
                aliases: ['javascript', 'js'],
                category: 'API',
                args: [{ 
                    id: 'one', type: 'string', match: 'content', default: null, 
                        prompt: {
                            start: `Please provide a query to search for`,
                            retry: `Please provide a **valid** query to search for`,    
                        } 
                }],
                description: {
                    usage: 'javascript [ query ]',
                    examples: ['javascript map'],
                    description: 'Displays the searched query off of the MDN JavaScript documentation'
                },
                cooldown: 6000,
                ratelimit: 2
            })
        }

        async exec(message, args) {
        let img = 'https://cdn.discordapp.com/attachments/638917156448501762/665022874720927744/opengraph-logo.png';
        const queryString = qs.stringify({ q: args.one });

            await fetch(`https://mdn.pleb.xyz/search?${queryString}`)
                .then(res => res.json()).then(body => {
                let { Summary, URL, Title } = body;

                const embed = new MessageEmbed()
                     .setColor(this.client.colors['defaultColor'])
                     .setTitle(`JavaScript: ${Title}`)
                     .setThumbnail(img)
                     .setURL(`https://developer.mozilla.org${URL}`)
                     .setDescription(Summary.replace(/<[^>]*>?/gm, ''))
                     .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL())
                return message.util.send({ embed });
                
            })
        }
    }

module.exports = JavaScriptCommand;