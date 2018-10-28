export class Queue {
    messages = {};

    addMessage(method, chatId, param) {
        if (this.messages[chatId]) {
            this.messages[chatId].push(() => { method(chatId, param) });
        } else {
            this.messages[chatId] = [() => method(chatId, param)];
        }

        const interval = setInterval(() => {
            if (this.messages[chatId] && this.messages[chatId].length > 0) {
                this.messages[chatId][0]();
                this.messages[chatId] = this.messages[chatId].slice(1);
            } else {
                clearInterval(interval);
            }
        }, 4000);
    }
}