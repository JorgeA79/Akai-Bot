const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

    class UserinfoCommand extends Command {
        constructor() {
            super('userinfo', {
                aliases: ['userinfo', 'user', 'whois'],
                category: 'Miscellaneous',
                args: [{ 
                    id: 'member', type: 'member', default: _ => _.member
                }],
                description: {
                    usage: 'userinfo < @Mention | id | username >',
                    examples: ['userinfo @host', 'userinfo 123456789012345678', 'userinfo host'],
                    description: 'Display\'s user information'
                },
                category: 'Miscellaneous',
                cooldown: 3000,
                ratelimit: 3
            });
        }

        async exec(message, { member }) {
            let roles = member.roles.first(15).filter(r => r.name !== '@everyone').sort((a, b) => b.position - a.position).map(r => r).join(', ');
                if(member.roles.size > 16) roles += `**... 15/${member.roles.size - 1}**`;
            let object = { online: `\`Online\` ${this.client.emojis.get('660283475223379988')}`, idle: `\`Idle\` ${this.client.emojis.get('660283475034636288')}`, dnd: `\`Do Not Disturb\` ${this.client.emojis.get('660283474527387649')}`, offline: `\`Offline\` ${this.client.emojis.get('660283474783109125')}`};
            let object2 = { online: `${this.client.emojis.get('660283475223379988')}`, idle: `${this.client.emojis.get('660283475034636288')}`, dnd: `${this.client.emojis.get('660283474527387649')}`, offline: `${this.client.emojis.get('660283474783109125')}`};
            let obj = { false: 'No', true: 'Yes'}   
        
            const embed = new MessageEmbed()
                .setColor(member.displayHexColor)
                .setTitle(`${object2[member.presence.status]} **${member.user.tag}'s User Information**`)
                .setThumbnail(member.user.displayAvatarURL())
                .addField('**User ID**', `\`${member.id}\``, true)
                .addField('**User Nickname**', `\`${member.displayName}\``, true)
                .addField('**User Discriminator**', `\`#${member.user.discriminator}\``, true)
                .addField('**User Joined At**', `\`${new Date(member.joinedAt).toLocaleString('en-GB', { dateStyle: 'full' })}\``, true)
                .addField('**User Created At**', `\`${new Date(member.user.createdAt).toLocaleString('en-GB', { dateStyle: 'full' })}\``, true)
                .addField('**Bot User**', `\`${obj[member.user.bot]}\``, true)
                .addField('**User Presence**', `${object[member.presence.status]}`, true)
                .addField('**User Game**', `\`${member.presence.game || 'No Game'}\``, true)
                .addField('**Boosting Since**', `\`${new Date(member.premiumSinceTimestamp).toLocaleString('en-GB', { dateStyle: 'full' }) || 'Never Boosted'}\``, true)
                .addField('**User Permissions**', `\`\`\`${member.permissions.toArray().join(', ')}\`\`\``)
                .addField('**Highest Role**', `${member.roles.highest || 'No highest role!'}`)
                .addField(`**Roles [ ${member.roles.size - 1} ]**`, `${roles || 'No roles!'}`)
            return message.util.send({ embed });
        }
    }

module.exports = UserinfoCommand;