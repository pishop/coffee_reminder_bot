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
const telegram = new Telegram(process.env.BOT_TOKEN);
const intervals = new IntervalHelper(client, telegram);
const queue = new Queue();

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
    ctx.replyWithSticker('CAADAgADxQADV08VCEQYKX_LsRKaAg')
});

initCommands(bot, telegram, client, intervals, queue);
bot.startPolling();
console.log(`Server ready!`);