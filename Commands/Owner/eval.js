const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

    class EvalCommand extends Command {
        constructor() {
            super('eval', {
                aliases: ['eval', 'evaluate'],
                category: 'Owner',
                args: [{ 
                    id: 'code', type: 'string', match: 'content', default: null, 
                        prompt: {
                            start: `Please provide an expression for me to evaluate`,
                            retry: `Please provide an expression for me to evaluate`,    
                        } 
                }],
                description: {
                    usage: 'eval [ code ]',
                    examples: ['eval let i = 0'],
                    description: 'Evaluates JavaScript code'
                },
                cooldown: 6000,
                ratelimit: 2,
                ownerOnly: true
            })
        }

        exec(message, { code }) {

            try {
                let hrStart = process.hrtime();
                let hrDiff = process.hrtime(hrStart);
                let toEval = eval(code);
                    typeof toEval !== 'string' ? toEval = require('util').inspect(toEval) : '';

                const embed = new MessageEmbed()
                    .setTitle(`Executed in: *${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ""}${hrDiff[1] / 1000000}ms*`)
                    .setColor(this.client.colors['defaultColor'])
                    .addField(`Output:`, `\`\`\`js\n${toEval.length > 1900 ? 'Too Much Output to Show.' : toEval}\`\`\``)
                    .addField('Input:', `\`\`\`js\n${code.length > 1900 ? 'Too Much Input to show.' : code}\`\`\``)
                    .addField('Typeof', `\`\`\`css\n${typeof toEval}\`\`\``)
                message.util.send({ embed });

            } catch(err) {

                const embed = new MessageEmbed()
                    .setColor(this.client.colors['red'])
                    .setTitle(`${this.client.emojis.get('660343595626397699')} Error While Evaluating`)
                    .addField('Input:', `\`\`\`javascript\n${code.length > 1900 ? 'Too Much Input to show.' : code}\`\`\``)
                    .addField('Outputted Error:', `\`\`\`${err.message}\`\`\``)
                message.util.send({ embed });

            }

            /*(try {
                let toEvaluate = eval(args.one)
                const type = typeof toEvaluate;
                  if(type !== 'string') toEvaluate = require('util').inspect(toEvaluate);
                
                let hrStart = process.hrtime()
                let hrDiff;
                    hrDiff = process.hrtime(hrStart);

            const embed = new MessageEmbed()
                .setColor(this.client.colors['defaultColor'])
                .setAuthor(`Took: ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ""}${hrDiff[1] / 1000000}ms`)
                .setDescription(`Output:\n\`\`\`javascript\n${toEvaluate}\`\`\``, { maxLength: 1900 })
                .addField('**Input**', `\`\`\`javascript\n${args.one}\`\`\``, true)
                .addField('**Output Type**', `\`\`\`css\n${type}\`\`\``, true)
            return message.util.send(embed);

            } catch(err) {
            const error = new MessageEmbed()
                .setColor(this.client.colors['red'])
                .setDescription(`${this.client.emojis.get('660343595626397699')} Error: ${err.message}`)
            return message.util.send(error);

            } */ 
        } 
    }

module.exports = EvalCommand;