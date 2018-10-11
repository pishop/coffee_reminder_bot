const Telegraf = require('telegraf');
require('dotenv').load();

const bot = new Telegraf(process.env.BOT_TOKEN);

const coffeeSchedule = {};

bot.start(ctx => ctx.replyWithSticker('CAADAgADxQADV08VCEQYKX_LsRKaAg'));

bot.command('add', (ctx) => {
    const regExp = /\/add ([0-9]{2}:[0-9]{2})/;
    const result = regExp.exec(ctx.message.text);
    if (result && result[1]) {
        const [hours, minutes] = result[1].split(':');
        if (hours >= 0 && hours < 24 && minutes >= 0 && minutes <= 59) {
            coffeeSchedule[`${hours}${minutes}`] = `${hours}:${minutes}`;
            ctx.replyWithSticker('CAADAgADnAADV08VCF49wTfBNSDPAg');
        } else {
            ctx.reply('Пиши нормально!');
        }
    } else {
        ctx.reply('Пиши нормально!');
    }
});

bot.command('remove', (ctx) => {
    const regExp = /\/remove ([0-9]{2}:[0-9]{2})/;
    const result = regExp.exec(ctx.message.text);
    console.log(ctx.message.text);
    if (result && result[1]) {
        const [hours, minutes] = result[1].split(':');
        console.log(hours, minutes);
        if (coffeeSchedule[`${hours}${minutes}`]) {
            coffeeSchedule[`${hours}${minutes}`] = undefined;
            ctx.replyWithSticker('CAADAgADmAADV08VCDNXeDKFVNRvAg');
        } else {
            ctx.reply('Пиши нормально!');
        }
    } else {
        ctx.reply('Пиши нормально!');
    }
});

bot.command('fast', ctx => ctx.replyWithSticker('CAADAgADnwADV08VCMRycuQqC77iAg'));
bot.command('list', ctx => {
    const times = Object.values(coffeeSchedule);
    if (times.length === 0) {
        ctx.reply('Ничего нет');
    } else {
        ctx.reply('Пойдем в ' + times.join(', '));
    }
});

bot.startPolling();