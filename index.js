const Telegraf = require('telegraf');
const request = require('request');
const { Markup } = require('telegraf');

//replace with your own bot's api key (get it from botfather)
const API_TOKEN = '1252739181:AAHBM-ivKFOsANlYgrLdfQzA51MPA5dW4Y4';

//replace with your own weather api url
//crete one here https://github.com/cachecleanerjeet/weather-api
//or use that default
const API_URL = 'https://weather.thetuhin.com';


const bot = new Telegraf(API_TOKEN);
//bot's commands
bot.start((ctx) => ctx.reply("<b>Hey, " + (ctx.message.chat.first_name) + " 👋👋</b>\n\n<em>Welcome to <b>Weather Bot</b>.\n\nJust send your city or village's name & you will get the weather.\n\nBrought you by @t_projects</em>", { parse_mode: "HTML" }, ));
bot.command('about', (ctx) => ctx.reply("<em>This bot is running by <a href='https://tu.hin.life' >Tuhin's</a> <a href='https://github.com/cachecleanerjeet/weather-api'>Weather API</a> \n\n<a href='https://github.com/cachecleanerjeet'>Check out Github for More Projects</a></em>\n\n<em>If you have encountered any error or having problem, then message @t_projects</em>", { parse_mode: "HTML" }, ));
bot.command('help', (ctx) => ctx.reply("Just send your city or village's name & you will get the weather.\n\nIf you have encountered any error or having problem, then message @t_projects"));
var donatetxt = "I know you will ignore this but still, Donating any amount (Rs.1 to Infinity) will help @t_projects";
bot.command('donate', (ctx) => ctx.reply(
    donatetxt,
    Markup.inlineKeyboard([
        Markup.urlButton('Donate via UPI', 'https://upier.org/pay/?vpa=donate2tuhin@airtel'),
    ]).extra(),
));
//when recieved any message
bot.on('message', (ctx) => {

    //getting name and msg info
    var recmsg = ctx.message.text;
    var recfname = ctx.message.chat.first_name;

    // requesting from api
    var formattedmsg = recmsg.replace(/ /gi, '+');
    var options = {
        'method': 'GET',
        'url': API_URL + '/loc?query=' + formattedmsg
    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        //getting message
        var response = (response.body);
        var data = JSON.parse(response);

        //error handeling
        var checkresponse = data.current_observation.wind;

        if (checkresponse === undefined) {
            ctx.reply("Sorry, Nothing Found.\n\nKindly send your city/village name again.\nMake sure if there is a space in your city/village name give that space or try with a big city name nearby you.");
        } else {
            var location = data.location.city + ',' + data.location.region + ', ' + data.location.country;
            var todaytype = data.current_observation.condition.text;
            var todaymaxtemp = data.forecasts[0].high + ' °C';
            var todaymintemp = data.forecasts[0].low + ' °C';
            var todayhumidity = data.current_observation.atmosphere.humidity + ' %';
            var todaypressure = data.current_observation.atmosphere.pressure + ' mb';
            var todaysunrise = data.current_observation.astronomy.sunrise;
            var todaysunset = data.current_observation.astronomy.sunset;

            ctx.reply("Today's weather in <b><u>" + location + "</u></b>\n\n<b>" + todaytype + "</b>\n\nMaximum Temperature : <b>" + todaymaxtemp + "</b>\nMinimum Temperature : <b>" + todaymintemp + "</b>\nHumidity : <b>" +
                todayhumidity + "</b>\nPressure : <b>" + todaypressure + "</b>\nSunrise : <b>" + todaysunrise + "</b>\nSunset : <b>" + todaysunset + "</b><em>\n\nBrought you by @t_projects</em>", { parse_mode: "HTML" });
        }
    });
})

bot.launch()