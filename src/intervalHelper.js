export class IntervalHelper {
    static intervals = {};

    constructor() {
        IntervalHelper.intervals = {};
    }

    static async updateInterval(chatId, client, telegram) {
        if (IntervalHelper.intervals[chatId]) {
            clearInterval(IntervalHelper.intervals[chatId]);
        }

        const schedule = await client.getAsync(chatId);
        if (schedule === null) {
            return;
        }

        IntervalHelper.intervals[chatId] = setInterval(async () => {
            const date = new Date();
            const milisec = ((date.getTimezoneOffset() / 60 * -1) + 3) * 60 * 60 * 1000;
            const dataMinsk = new Date(date.getTime() + milisec);
            const [hours, minutes] = [dataMinsk.getHours(), dataMinsk.getMinutes()];
            console.log('checked', schedule, hours, minutes);
            if (schedule.indexOf(`${hours}:${minutes < 10 ? '0' + minutes : minutes}`) !== -1) {
                telegram.sendSticker(chatId, 'CAADAgADnwADV08VCMRycuQqC77iAg');
            }
        }, 10000);
    }
}