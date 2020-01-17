const { Command } = require('discord-akairo');

    class TokenCommand extends Command {
        constructor() {
            super('token', {
                aliases: ['token', 'checktoken'],
                category: 'Owner',
                args: [{ 
                    id: 'token', type: 'string', match: 'content', default: null, 
                        prompt: {
                            start: `Please provide a token`,
                            retry: `Please provide a token`,    
                        } 
                }],
                description: {
                    usage: 'token [ token ]',
                    examples: ['token NJKjfjaASJDh.FSHDKdlfjskj._not_a_real_token.fahFDHSh'],
                    description: 'Evaluates a token'
                },
                cooldown: 6000,
                ratelimit: 2,
                ownerOnly: true,
                clientPermissions: ['MANAGE_MESSAGES']
            })
        }

        async exec(message, { token }) {
        const regex = /([\w-]+={0,2})\.([\w-]+={0,2})\.([\w-]+={0,2})/g.exec(
          token
        );
        if (!regex) return message.util.reply("couldn't find a match.");
        const [, botID] = regex;

        BigInt(Buffer.from(botID, "base64").toString());
        if (message.deleteable) await message.delete();
        message.util.send(
          `\`\`\`Token Found! This might belong to the bot with the id of: ${BigInt(
            Buffer.from(botID, "base64").toString()
          )}. Remember: seeing if the token is valid is against the ToS\`\`\``
        );

        }
    }

module.exports = TokenCommand;