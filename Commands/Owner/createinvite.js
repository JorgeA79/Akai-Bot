const { Command } = require('discord-akairo')
const { MessageEmbed, Permissions } = require('discord.js');

    class CreateInviteCommand extends Command {
        constructor() {
            super('createinvite', {
                aliases: ['createinvite', 'botinvite'],
                category: 'Owner',
                args: [{ 
                    id: 'one', type: 'number', match: 'content', default: null, 
                        prompt: {
                            start: `Please provide permissions for the invite.`,
                            retry: `Please provide permissions for the invite`,    
                        } 
                }],
                description: {
                    usage: 'createinvite [ permissions ]',
                    examples: ['createinvite ADMINISTRATOR', 'createinvite 8'],
                    description: 'Creates an invite for the bot'
                },
                cooldown: 6000,
                ratelimit: 2,
                ownerOnly: true
            })
        }

        async exec(message, args) {
        const perms = new Permissions(args.one);
            this.client.generateInvite(perms.toArray())
                .then(link => {
                    return message.util.send(new MessageEmbed().setColor(this.client.colors['defaultColor']).setDescription(`Information:\nLink: **[click me](${link})**\n\nPermissions:\`\`\`js\n${perms.toArray().join(', ')}\`\`\``));
            })
        }
    }

module.exports = CreateInviteCommand;