## Weather Bot
**Weather bot for Telegram, made using TelegrafJS**
<br><br>
[![Send a Message](https://img.shields.io/badge/Send--a--Message-blue?logo=copy&style=for-the-badge "Send a Message")](https://t.me/weatheroftoday_bot)
<br><br>
[![Demo](https://telegra.ph/file/953a69be9c44165012bc1.gif "Demo")](https://t.me/weatheroftoday_bot "Demo")
<br><br>

### Features :

- Powerful
- Correct Result
- Open Sourced
- Free

### Deploy :
**You need few things to deploy this bot:**
- Deploy your Weather API Server <br>
https://github.com/cachecleanerjeet/weather-api
- System with nodejs installed (version 10 +)

**Deploy 👇**

- Clone this Repository

```bash
git clone https://github.com/cachecleanerjeet/weather-bot.git
```

- Open <tt>config.js</tt> & enter your Bot API TOKEN in <tt>BOT_TOKEN</tt> section & replace the Weather API Url in <tt>API_URL</tt> Section & save it
- Now install the Dependencies

```bash
npm install
```

- Now install forever js so that <tt>main.js</tt> will run after you close the shell

```bash
npm install forever -g
```
- Now start the process

```bash
forever start main.js
```
- Your bot will work now
- To stop the process go to that directory & 

```bash
forever stop main.js
```
<br>

### This Project is Using [Weather Api](https://github.com/cachecleanerjeet/weather-api "Weather API") of [Mine](https://tu.hin.life "Mine")


### Star this Repo if you Liked it ⭐⭐⭐
