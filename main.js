const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const config = require('./config')

const bot = new Telegraf(config.BOT_TOKEN);

bot.start((ctx) => {
    try {
        ctx.replyWithHTML(`<b>Hey, ${ctx.message.chat.first_name} 👋👋</b>\n\n<em>Welcome to <b>Weather Bot</b>.\n\nJust send your city or village's name & you will get the weather.\n\nBrought you by @tprojects</em>`)
    } catch (e) {}
})


bot.command('about', async(ctx) => {
    try {
        ctx.replyWithHTML(
            "<code>This bot and api are Open Sourced, You can find source code here</code> 👇",
            Markup.inlineKeyboard([
                [
                    Markup.button.url("Bot's Source Code", 'https://github.com/cachecleanerjeet/weather-bot'),
                ],
                [
                    Markup.button.url("API's source code", 'https://github.com/cachecleanerjeet/weather-api'),
                ]
            ])
        )
    } catch (e) {
        console.log(e)
    }
})


bot.command('help', (ctx) => {
    try {
        ctx.reply("Just send your city or village's name & you will get the weather.\n\nIf you have encountered any error or having problem, then message @t_projects")
    } catch (e) {}
});


bot.on('message', async(ctx) => {
    try {
        var weather_data = (await axios.get(`${config.API_URL}${ctx.message.text}`)).data
        if (weather_data.error === null && weather_data.result.length !== 0) {
            var data = weather_data.result[0]
            ctx.replyWithHTML(`Today's weather in <b><u>${data.location.name}</u></b>\n\n<b>${data.current.skytext}</b>\n\nCurrent Temperature: <b>${data.current.temperature} °C</b>\nFeels like: <b>${data.current.feelslike} °C</b>\nHumidity : <b>${data.current.humidity} %</b><em>\n\nBrought you by @t_projects</em>`);
        } else {
            ctx.reply("Sorry, Nothing Found.\n\nKindly send your city/village name again.\nMake sure if there is a space in your city/village name give that space or try with a big city name nearby you.\n\nIf this problem persists send a message at @t_projects.");
        }
    } catch (e) {}
})

bot.launch()