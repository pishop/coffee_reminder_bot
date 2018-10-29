const username = 'coffee_2_bot';

export default function(bot, client, intervals, queue) {
    bot.command(['add', `add@${username}`], async (ctx) => {
        const fromId = ctx.message.from.id;
        const chatId = ctx.message.chat.id;
        if (fromId === Number(104990728)) {
            queue.addMessage('sendMessage', chatId, 'Дима, не балуй!');
            return;
        }
        const regExp = /\/add ([0-9]{2}:[0-9]{2})/;
        const result = regExp.exec(ctx.message.text);

        if (!result || !result[1]) {
            queue.addMessage('sendMessage', chatId, 'Пиши нормально!');
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
                    queue.addMessage('sendMessage', chatId, 'Пиши нормально!');
                    return;
                }

                res.push(timeString);
                await client.setAsync(chatId, res.sort().join('.'));
            }

            queue.addMessage('sendSticker', chatId, 'CAADAgADnAADV08VCF49wTfBNSDPAg');
            intervals.updateInterval(chatId);
        } else {
            queue.addMessage('sendMessage', chatId, 'Пиши нормально!');
        }
    });

    bot.command(['remove', `remove@${username}`], async (ctx) => {
        const fromId = ctx.message.from.id;
        const chatId = ctx.message.chat.id;
        if (fromId === Number(104990728)) {
            queue.addMessage('sendMessage', chatId, 'Дима, не балуй!');
            return;
        }
        const regExp = /\/remove ([0-9]{2}:[0-9]{2})/;
        const result = regExp.exec(ctx.message.text);
        const schedule = await client.getAsync(chatId);
        if (!result || !result[1]) {
            queue.addMessage('sendMessage', chatId, 'Пиши нормально!');
            return;
        }

        const [hours, minutes] = result[1].split(':');
        if (schedule.indexOf(`${hours}:${minutes}`) !== -1) {
            await client.setAsync(chatId, schedule.split('.').filter(t => t !== `${hours}:${minutes}`).join('.'));
            queue.addMessage('sendSticker', chatId, 'CAADAgADmAADV08VCDNXeDKFVNRvAg');
            intervals.updateInterval(chatId);
        } else {
            queue.addMessage('sendMessage', chatId, 'Пиши нормально!');
        }
    });

    bot.command(['clear', `clear@${username}`], async (ctx) => {
        const fromId = ctx.message.from.id;
        const chatId = ctx.message.chat.id;
        if (fromId === Number(104990728)) {
            queue.addMessage('sendMessage', chatId, 'Дима, не балуй!');
            return;
        }
        await client.delAsync(chatId);
        queue.addMessage('sendSticker', chatId, 'CAADAgADoAADV08VCBicBX8exqU0Ag');
        intervals.updateInterval(chatId);
    });

    bot.command(['fast', `fast@${username}`], ctx => {
        const fromId = ctx.message.from.id;
        const chatId = ctx.message.chat.id;
        if (fromId === Number(104990728)) {
            queue.addMessage('sendMessage', chatId, 'Дима, не балуй!');
            return;
        }
        queue.addMessage('sendSticker', chatId, 'CAADAgADnwADV08VCMRycuQqC77iAg');
    });
    bot.command(['list', `list@${username}`], async ctx => {
        const fromId = ctx.message.from.id;
        const chatId = ctx.message.chat.id;
        if (fromId === Number(104990728)) {
            queue.addMessage('sendMessage', chatId, 'Дима, не балуй!');
            return;
        }
        const schedulle = await client.getAsync(chatId);

        if (schedulle === null) {
            queue.addMessage('sendMessage', chatId, 'Ничего нет');
            return;
        }

        queue.addMessage('sendMessage', chatId, 'Пойдем в ' + schedulle.split('.').join(', '));
    });
}
