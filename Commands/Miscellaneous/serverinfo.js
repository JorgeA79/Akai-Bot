const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

    class ServerInfoCommand extends Command {
        constructor() {
            super('serverinfo', {
                aliases: ['serverinfo', 'server', 'guild'],
                category: 'Miscellaneous',
                description: {
                    usage: 'serverinfo',
                    examples: ['serverinfo'],
                    description: 'Display\'s guild info'
                },
                cooldown: 2000,
                ratelimit: 3
            })
        }

        exec(message) {
            let region = {
                "brazil": ":flag_br: `Brazil`",
                "eu-central": ":flag_eu: `Central Europe`",
                "singapore": ":flag_sg: `Singapore`",
                "us-central": ":flag_us: `U.S. Central`",
                "sydney": ":flag_au: `Sydney`",
                "us-east": ":flag_us: `U.S. East`",
                "us-south": ":flag_us: `U.S. South`",
                "us-west": ":flag_us: `U.S. West`",
                "eu-west": ":flag_eu: `Western Europe`",
                "vip-us-east": ":flag_us: `VIP U.S. East`",
                "london": ":flag_gb: `London`",
                "amsterdam": ":flag_nl: `Amsterdam`",
                "hongkong": ":flag_hk: `Hong Kong`",
                "russia": ":flag_ru: `Russia`",
                "southafrica": ":flag_za: `South Africa`"
            };
    
            let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
            let roles = message.guild.roles.filter(r => r.name !== '@everyone').sort((a, b) => b.position > a.position ? 1 : -1).first(15).map(r => r).join(', ');
                if(message.guild.roles.size > 16) roles += `... 15/${message.guild.roles.size - 1}`
            const embed = new MessageEmbed()
                .setColor(this.client.colors['defaultColor'])
                .setAuthor(`${message.guild.name} Information`, message.guild.iconURL())
                .setThumbnail(message.guild.iconURL())
                .addField('**Server ID**', `\`${message.guild.id}\``, true)
                .addField('**Server Owner**', `\`${this.client.users.get(message.guild.ownerID).tag}\``, true)
                .addField('**Region**', `${region[message.guild.region]}`, true)
                .addField('**Total | Users | Bots**', `\`${message.guild.memberCount} | ${message.guild.members.filter(u => !u.user.bot).size} | ${message.guild.members.filter(u => u.user.bot).size}\``, true)
                .addField('**Total | Text | Voice**', `\`${message.guild.channels.size} | ${message.guild.channels.filter(c => c.type === 'text').size} | ${message.guild.channels.filter(c => c.type === 'voice').size}\``, true)
                .addField('**AFK Channel**', `\`${message.guild.afkChannel ? message.guild.afkChannel : 'None'}\``, true)
                .addField('**Boosts**', `**Tier ${message.guild.premiumTier}**\n\`${message.guild.premiumSubscriptionCount}/30\``, true)
                .addField('**Verification Level**', `\`${verifLevels[message.guild.verificationLevel]}\``, true)
                .addField('**Created At**', `\`${new Date(message.guild.createdAt).toLocaleString('en-GB', { dateStyle: 'full'})}\``, true)
                .addField('**Emojis**', `\`${message.guild.emojis.size}\``, true)
                .addField('**Verified**', `\`${message.guild.verified ? '`Yes`' : '`No`'}\``, true)
                .addField('**Partnered**', `\`${message.guild.verified ? '`Yes`' : '`No`'}\``, true)
                .addField('**Static Emojis**', `${message.guild.emojis.first(15).filter(e => !e.animated).map(x => x).join(' ') || 'None'}`)
                .addField('**Animated Emojis**', `${message.guild.emojis.first(15).filter(e => e.animated).map(x => x).join(' ')|| 'None'}`)
                .addField('**Guild Features**', `\`\`\`${message.guild.features.join(', ') || 'No Features'}\`\`\``)
                .addField(`**Roles [ ${message.guild.roles.size - 1} ]**`, `${roles}`)
              message.channel.send(embed);
        }
    }

module.exports = ServerInfoCommand;