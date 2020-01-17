const { Listener } = require('discord-akairo');
//const { PlayerManager } = require('discord.js-lavalink'); 
//const { nodes } = require('../Util/config');

    class ReadyListener extends Listener {
        constructor() {
            super('ready', {
                emitter: 'client',
                event: 'ready'
            })
        }

        async exec() {

               /* this.client.player = new PlayerManager(this.client, nodes, {
                    user: this.client.user.id,
                    shards: this.client.shard ? this.client.shard.count : 0
                }) */

            let statuses = [
                `a:help | ${this.client.users.size} users`,
                `a:help | ${this.client.guilds.size} guilds`,
                `a:help | ${this.client.channels.size} channels`,
                `a:help | Owner: ${this.client.users.fetch('535585397435006987').tag}`
            ], i = 0;

                this.client.user.setStatus('dnd');
                this.client.user.setActivity(statuses[i++ % statuses.length], { type: 'PLAYING' });

            console.log(`${this.client.user.tag} has booted into the Discord world.`);

        }
    }

module.exports = ReadyListener;