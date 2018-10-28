export class Queue {
    messages = {};

    addMessage(method, { chatId, ...rest }) {
        if (this.messages[chatId]) {
            this.messages[chatId].push(() => { method(chatId, ...rest) });
        } else {
            this.messages[chatId] = [() => method(chatId, ...rest)];
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