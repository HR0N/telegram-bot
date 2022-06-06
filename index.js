const TelegramApi = require('node-telegram-bot-api');
const mysql = require("mysql2");

const token = `5399648161:AAGO3-jdK6yEG9hJFy5_vhz5AvdDAfz4PN4`;

const bot = new TelegramApi(token, {polling: true});

this.state = {
    pass: '5555555',
    pass_confirm: false,
    write_sms: false,
};
const confirm_password = (pass) => {
    if(pass === this.state.pass){
        this.state.pass_confirm = true;
        setTimeout(() => {this.state.pass_confirm = false}, 300);
    }
};
const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Start', callback_data: '/start'}, {text: 'Stop', callback_data: '/stop'}],
            [{text: 'Enter sms code', callback_data: '/enter_sms_code'}]
        ]
    })
};

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'start script'},
        {command: '/stop', description: 'stop script'},
        {command: '/enter_code', description: 'enter sms code'},
        {command: '/buttons', description: 'i want use buttons'},
    ]);
    bot.on('message', async msg =>{
        const text = msg.text;
        const data = msg.data;
        const chatId = msg.chat.id;
        if(this.state.write_sms){
            this.state.write_sms = false;
            if(text.length !== 6){
                return bot.sendMessage(chatId, 'This is piece of shit, not the valid code. Must by 6 symbols');
            }
            update_code(parseInt(text));
            return bot.sendMessage(chatId, 'Ok, be proud of yourself... Maybe you spelled it right.');
        }
        if(text === '/start'){
            let message = `Run the script... ${seagull_voice()}`;
            return bot.sendMessage(chatId, message);
        }
        if(text === '/stop'){
            let message = `Stop the script... ${seagull_voice()}`;
            return bot.sendMessage(chatId, message);
        }
        if(text === '/enter_code'){
            lthis.state.write_sms = true;
            return bot.sendMessage(chatId, `Enter code from sms ${seagull_voice()}`);
        }
        if(text === '/buttons'){
            return bot.sendMessage(chatId, 'Choose the destiny ٩(͡๏̯͡๏)۶', gameOptions);
        }
        return bot.sendMessage(chatId, `What do u want from me?`);
    });
    bot.on('callback_query', msg =>{
        this.state.write_sms = false;
      const data = msg.data;
      const chatId = msg.message.chat.id;
      if(data === '/enter_sms_code'){
          this.state.write_sms = true;
          return bot.sendMessage(chatId, `Enter code from sms ${seagull_voice()}`);
      }
      if(data === '/start'){
            let message = `Run the script... ${seagull_voice()} \n Wait, may need sms verification.`;
            return bot.sendMessage(chatId, message);
        }
      if(data === '/stop'){
            let message = `Stop the script... ${seagull_voice()}`;
            return bot.sendMessage(chatId, message);
        }
    })
};

start();

const seagull_voice = ()=>{
    let random = Math.floor(Math.random() * 100);
    if(random > 95){ return ' кья-кья-кья'}else{return ''}
};
const connection = mysql.createConnection({
    host: "pr435071.mysql.tools",
    user: "pr435071_api",
    database: "pr435071_api",
    password: "s5+5+sYaF6"
});

const post_code = (code) => {
    connection.query("INSERT INTO `bird_bot`(`code`) VALUES ("+code+")",
        function(err, results, fields) {
            console.log(err);
            console.log(results); // собственно данные
            console.log(fields); // мета-данные полей
        });
    connection.end();
};
const update_code = (code) => {
    connection.query("UPDATE `bird_bot` SET `code`="+code+" WHERE id=1",
        function(err, results, fields) {
            console.log(err);
            console.log(results); // собственно данные
            console.log(fields); // мета-данные полей
        });
    connection.end();
};

