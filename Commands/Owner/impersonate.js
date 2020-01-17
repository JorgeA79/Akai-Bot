const { Command } = require('discord-akairo');
const { GuildMember } = require('discord.js');

    class ImpersonateCommand extends Command {
        constructor() {
            super('impersonate', {
                aliases: ['impersonate', 'i'],
                category: 'Owner',
                args: [{ 
                    id: 'member',
                    type: async (msg, str) => {
                        return await msg.mentions.users.first() || await this.client.users.fetch(str).catch(() => null) || await msg.guild.members.get(str);
                    },
                        prompt: {
                            start: `Please provide a @mention or id.`,
                            retry: `Please provide a **valid** @mention or id`,    
                        } 
                },

                {
                    id: 'msg',
                    type: 'string',
                    match: 'rest',
                        prompt: {
                            start: `Please provide a phrase to say.`,
                            retry: `Please provide a phrase to say.`
                        }
                }],
                description: {
                    usage: 'impersonate [ @mention | id ]',
                    examples: ['impersonate @slince no', 'impersonate 123456789012345678 who is you'],
                    description: 'Impersonates a member.'
                },
                cooldown: 6000,
                ratelimit: 2,
                ownerOnly: true,
                clientPermissions: ['MANAGE_MESSAGES', 'MANAGE_WEBHOOKS']
            })
        }

        async exec(message, { member, msg }) {

            if(member instanceof GuildMember) member = member
                message.delete();

        const hook = await message.channel.createWebhook(member.username, {
            avatar: member.displayAvatarURL()
        });

            await hook.send(msg).catch(err => {
                message.util.reply(`Error:\n\n${err}`)
            });

            await hook.delete();

        }
    }

module.exports = ImpersonateCommand;