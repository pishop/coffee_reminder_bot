export class Queue {
    messages = {};
    intervals = {};

    constructor(telegram) {
        this.telegram = telegram;
    }

    addMessage = (fn, chatId, param) => {
        if (this.messages[chatId]) {
            this.messages[chatId].push({ fn, param });
        } else {
            this.messages[chatId] = [{ fn, param }];
        }

        if (!this.intervals[chatId]) {
            const interval = setInterval(() => {
                if (this.messages[chatId] && this.messages[chatId].length > 0) {
                    const { fn, param } = this.messages[chatId][0];
                    this.telegram[fn](chatId, param);
                    this.messages[chatId] = this.messages[chatId].slice(1);
                } else {
                    clearInterval(interval);
                    delete this.intervals[chatId];
                }
            }, 4000);
            this.intervals[chatId] = interval;
        }
    }
}