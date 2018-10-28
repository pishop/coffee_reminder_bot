export default function(bot, telegram, client, intervals, queue) {
    bot.command('add', async (ctx) => {
        const chatId = ctx.message.chat.id;
        if (chatId === 104990728) {
            queue.addMessage(telegram.sendMessage, { chatId, message: 'Дима, не балуй!'});
            return;
        }
        const regExp = /\/add ([0-9]{2}:[0-9]{2})/;
        const result = regExp.exec(ctx.message.text);

        if (!result || !result[1]) {
            queue.addMessage(telegram.sendMessage, { chatId, message: 'Пиши нормально!'});
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
                    queue.addMessage(telegram.sendMessage, { chatId, message: 'Пиши нормально!'});
                    return;
                }

                res.push(timeString);
                await client.setAsync(chatId, res.sort().join('.'));
            }

            queue.addMessage(telegram.sendSticker, { chatId, sticker: 'CAADAgADnAADV08VCF49wTfBNSDPAg'});
            intervals.updateInterval(chatId);
        } else {
            queue.addMessage(telegram.sendMessage, { chatId, message: 'Пиши нормально!'});
        }
    });

    bot.command('remove', async (ctx) => {
        const chatId = ctx.message.chat.id;
        if (chatId === 104990728) {
            queue.addMessage(telegram.sendMessage, { chatId, message: 'Дима, не балуй!'});
            return;
        }
        const regExp = /\/remove ([0-9]{2}:[0-9]{2})/;
        const result = regExp.exec(ctx.message.text);
        const schedule = await client.getAsync(chatId);
        if (!result || !result[1]) {
            queue.addMessage(telegram.sendMessage, { chatId, message: 'Пиши нормально!'});
            return;
        }

        const [hours, minutes] = result[1].split(':');
        if (schedule.indexOf(`${hours}:${minutes}`) !== -1) {
            await client.setAsync(chatId, schedule.split('.').filter(t => t !== `${hours}:${minutes}`).join('.'));
            queue.addMessage(telegram.sendSticker, { chatId, sticker: 'CAADAgADmAADV08VCDNXeDKFVNRvAg'});
            intervals.updateInterval(chatId);
        } else {
            queue.addMessage(telegram.sendMessage, { chatId, message: 'Пиши нормально!'});
        }
    });

    bot.command('clear', async (ctx) => {
        const chatId = ctx.message.chat.id;
        if (chatId === 104990728) {
            queue.addMessage(telegram.sendMessage, { chatId, message: 'Дима, не балуй!'});
            return;
        }
        await client.delAsync(chatId);
        queue.addMessage(telegram.sendSticker, { chatId, sticker: 'CAADAgADoAADV08VCBicBX8exqU0Ag'});
        intervals.updateInterval(chatId);
    });

    bot.command('fast', ctx => {
        const chatId = ctx.message.chat.id;
        if (chatId === 104990728) {
            queue.addMessage(telegram.sendMessage, { chatId, message: 'Дима, не балуй!'});
            return;
        }
        queue.addMessage(telegram.sendSticker, { chatId, sticker: 'CAADAgADnwADV08VCMRycuQqC77iAg'});
    });
    bot.command('list', async ctx => {
        const chatId = ctx.message.chat.id;
        if (chatId === 104990728) {
            queue.addMessage(telegram.sendMessage, { chatId, message: 'Дима, не балуй!'});
            return;
        }
        const schedulle = await client.getAsync(chatId);

        if (schedulle === null) {
            queue.addMessage(telegram.sendMessage, { chatId, message: 'Ничего нет'});
            return;
        }

        queue.addMessage(telegram.sendMessage, { chatId, message: 'Пойдем в ' + schedulle.split('.').join(', ')});
    });
}
