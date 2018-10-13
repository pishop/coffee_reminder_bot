import 'babel-polyfill';
import Telegraf from 'telegraf';
import Telegram from 'telegraf/telegram';
import redis from 'redis';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis);

import { IntervalHelper } from './intervalHelper';
import loadCommands from './commands';

new IntervalHelper();

if (process.env.NODE_ENV === 'dev') {
    require('dotenv').load();
}

const client = redis.createClient(process.env.REDIS_URL);

const bot = new Telegraf(process.env.BOT_TOKEN);
const telegram = new Telegram(process.env.BOT_TOKEN);

bot.start(async ctx => {
    const chat = await ctx.getChat();
    IntervalHelper.updateInterval(chat.id, client, telegram);
    ctx.replyWithSticker('CAADAgADxQADV08VCEQYKX_LsRKaAg')
});

loadCommands(bot, telegram, client);
bot.startPolling();