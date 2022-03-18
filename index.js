require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api')
const express = require('express')
const axios = require('axios')

const {TEL_API_TOKEN, TELEGRAM_API_URI, PORT} = process.env;
const URI = `/webhook/${TEL_API_TOKEN}`
const app = express();
const bot = new TelegramApi(TEL_API_TOKEN, {polling: true})

bot.setMyCommands([
    {command: '/start', description: 'Hello World'},
    {command: '/sync', description: 'Sync data from server'}
])

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    console.log('message:', msg)

    try {
        if (text === '/start') {
            return bot.sendMessage(chatId, `Welcome to Telegram Bot.`);
        }
        return bot.sendMessage(chatId, 'There is not such command.');
    }catch(ex) {
        return bot.sendMessage(chatId, `Something was wrong. ${ex}`);
    }
})