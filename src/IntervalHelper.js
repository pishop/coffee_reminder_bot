export class IntervalHelper {
    static intervals = {};

    constructor(client, telegram) {
        this.client = client;
        this.telegram = telegram;
    }

    async updateInterval(chatId) {
        if (IntervalHelper.intervals[chatId]) {
            clearInterval(IntervalHelper.intervals[chatId]);
        }

        const schedule = await this.client.getAsync(chatId);
        if (schedule === null) {
            return;
        }

      IntervalHelper.intervals[chatId] = setInterval(async () => {
            const date = new Date();
            // convert to Minsk timezone TODO FIX
            const milisec = ((date.getTimezoneOffset() / 60 * -1) + 3) * 60 * 60 * 1000;
            const dataMinsk = new Date(date.getTime() + milisec);
            const [hours, minutes] = [dataMinsk.getHours(), dataMinsk.getMinutes()];
            if (schedule.split('.').find(t => t === `${hours}:${minutes < 10 ? '0' + minutes : minutes}`)) {
                this.telegram.sendSticker(chatId, 'CAADAgADnwADV08VCMRycuQqC77iAg');
            }
        }, 60000);
    }
}