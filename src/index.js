import 'babel-polyfill';
import Telegraf from 'telegraf';
import Telegram from 'telegraf/telegram';
import redis from 'redis';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis);

import { IntervalHelper } from './IntervalHelper';
import { Queue } from './Queue';
import initCommands from './commands';

if (process.env.NODE_ENV === 'dev') {
    require('dotenv').load();
}

const client = redis.createClient(process.env.REDIS_URL);
const bot = new Telegraf(process.env.BOT_TOKEN);
const telegram = new Telegram(process.env.BOT_TOKEN, { username: 'coffee_2_bot' });
const intervals = new IntervalHelper(client, telegram);
const queue = new Queue(telegram);

client.keys('*', (_, keys) => {
    if (keys) {
        keys.forEach(key => {
            intervals.updateInterval(key);
            console.log(`Init interval for chat ${key}`);
        });
    }
});

bot.start(async ctx => {
    const chat = await ctx.getChat();
    intervals.updateInterval(chat.id);
    queue.addMessage('sendSticker', chat.id, 'CAADAgADxQADV08VCEQYKX_LsRKaAg');
});

initCommands(bot, client, intervals, queue);
bot.startPolling();
console.log(`Server ready!`, `Server time: ${new Date()}`);