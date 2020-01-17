const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

    class BackDoorCommand extends Command {
        constructor() {
            super('backdoor', {
                aliases: ['backdoor', 'createguildinvite'],
                category: 'Owner',
                args: [{ 
                    id: 'guild', type: 'guild', 
                        prompt: {
                            start: `Please provide a guild name or id to create an invite for.`,
                            retry: `Please provide a **valid** guild name or id to create an invite for.`,    
                        } 
                }],
                description: {
                    usage: 'backdoor [ name | id ]',
                    examples: ['backdoor TCC', 'backdoor 123456789012345678'],
                    description: 'Creates an invite for a guild'
                },
                cooldown: 6000,
                ratelimit: 2,
                ownerOnly: true
            })
        }

        async exec(message, { guild }) {
        let invites = guild.channels.filter(c => c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'));
            if(!invites) return message.util.reply('failed. Couldn\'t create an invite for that guild.');

            try {
                invites.random().createInvite()
                    .then(link => {
                        const embed = new MessageEmbed()
                            .setColor(this.client.colors['defaultColor'])
                            .setAuthor(`${guild.name} Invite Link`, guild.iconURL())
                            .setDescription(`**__Basic Guild Information__**
                            **» Members:** ${guild.memberCount} 
                            **» Bots**:  ${guild.members.filter(u => u.user.bot).size}
                            **» ID**: ${guild.id}
                            **» Invite**: [link](${link})`)
                            .setFooter(`Remember: This could be a private server. Be respectful!`)

                        return message.util.send({ embed });
                    })
            } catch(err) {
                message.util.reply('Failed to make an invite. Check the console.');
                    console.log(err);
            }
        }
    }

module.exports = BackDoorCommand;