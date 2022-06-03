const TelegramApi = require('node-telegram-bot-api');

const token = `5399648161:AAGO3-jdK6yEG9hJFy5_vhz5AvdDAfz4PN4`;

const bot = new TelegramApi(token, {polling: true});

bot.on('message', msg =>{
    const text = msg.text;
    const chatId = msg.chat.id;
    if(text === 'Как дела?'){
        bot.sendMessage(chatId, `Да... Одиночество нас всех убивает.\nВот тебе номер проститутки =) 066 189 87 42`);
    }else bot.sendMessage(chatId, `${text} значит? \nПошел нахуй бомжара ебучий!`);

});