import { IntervalHelper } from './intervalHelper';

export default function(bot, telegram, client) {
    bot.command('add', async (ctx) => {
        console.log('add', ctx.message);
        const chatId = ctx.message.chat.id;
        const regExp = /\/add ([0-9]{2}:[0-9]{2})/;
        const result = regExp.exec(ctx.message.text);

        if (!result || !result[1]) {
            telegram.sendMessage(chatId, 'Пиши нормально!');
            return;
        }

        const [hours, minutes] = result[1].split(':');
        if (hours >= 0 && hours < 24 && minutes >= 0 && minutes <= 59) {
            const timeString = `${hours}:${minutes}`;
            const schedule = await client.getAsync(chatId);

            if (schedule === null) {
                await client.setAsync(chatId, timeString);
            } else {
                const res = schedule.split('.');
                if (res.find(t => t === timeString)) {
                    telegram.sendMessage(chatId, 'Пиши нормально!');
                    return;
                }

                res.push(timeString);
                await client.setAsync(chatId, res.sort().join('.'));
            }

            telegram.sendSticker(chatId, 'CAADAgADnAADV08VCF49wTfBNSDPAg');
            IntervalHelper.updateInterval(chatId, client, telegram);
        } else {
            telegram.sendMessage(chatId, 'Пиши нормально!');
        }
    });

    bot.command('remove', async (ctx) => {
        console.log('remove', ctx.message);
        const chatId = ctx.message.chat.id;
        const regExp = /\/remove ([0-9]{2}:[0-9]{2})/;
        const result = regExp.exec(ctx.message.text);
        const schedule = await client.getAsync(chatId);
        if (!result || !result[1]) {
            telegram.sendMessage(chatId, 'Пиши нормально!');
            return;
        }

        const [hours, minutes] = result[1].split(':');
        if (schedule.indexOf(`${hours}:${minutes}`) !== -1) {
            await client.setAsync(chatId, schedule.split('.').filter(t => t !== `${hours}:${minutes}`).join('.'));
            telegram.sendSticker(chatId, 'CAADAgADmAADV08VCDNXeDKFVNRvAg');
            IntervalHelper.updateInterval(chatId, client, telegram);
        } else {
            telegram.sendMessage(chatId, 'Пиши нормально!');
        }
    });

    bot.command('clear', async (ctx) => {
        console.log('clear', ctx.message);
        const chatId = ctx.message.chat.id;
        await client.delAsync(chatId);
        telegram.sendSticker(chatId, 'CAADAgADoAADV08VCBicBX8exqU0Ag');
        IntervalHelper.updateInterval(chatId, client, telegram);
    });

    bot.command('fast', ctx => {
        console.log('fast', ctx.message);
        const chatId = ctx.message.chat.id;
        telegram.sendSticker(chatId, 'CAADAgADnwADV08VCMRycuQqC77iAg');
    });
    bot.command('list', async ctx => {
        console.log('list', ctx.message);
        const chatId = ctx.message.chat.id;
        const schedulle = await client.getAsync(chatId);

        if (schedulle === null) {
            telegram.sendMessage(chatId, 'Ничего нет');
            return;
        }

        telegram.sendMessage(chatId, 'Пойдем в ' + schedulle.split('.').join(', '));
    });
}
