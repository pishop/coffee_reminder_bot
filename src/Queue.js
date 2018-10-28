export class Queue {
    messages = {};

    addMessage(fn, chatId, param) {
        if (this.messages[chatId]) {
            this.messages[chatId].push({ fn, chatId, param });
        } else {
            this.messages[chatId] = [{ fn, chatId, param }];
        }

        const interval = setInterval(() => {
            if (this.messages[chatId] && this.messages[chatId].length > 0) {
                const { fn, chatId, param } = this.messages[chatId][0];
                fn(chatId, param);
                this.messages[chatId] = this.messages[chatId].slice(1);
            } else {
                clearInterval(interval);
            }
        }, 4000);
    }
}