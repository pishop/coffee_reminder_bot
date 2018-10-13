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
            const [hours, minutes] = [date.getHours(), date.getMinutes()];

            if (schedule.indexOf(`${hours}:${minutes < 10 ? '0' + minutes : minutes}`) !== -1) {
                telegram.sendSticker(chatId, 'CAADAgADnwADV08VCMRycuQqC77iAg');
            }
        }, 60000);
    }
}