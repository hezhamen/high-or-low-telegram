// telegram bot
const TelegramBot = require("node-telegram-bot-api");
const secret = require("dotenv");

const token = secret.config().parsed.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  // pick a random number between 1 and 100
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  bot.sendMessage(msg.chat.id, "Welcome to, High or low game");
  bot.sendMessage(msg.chat.id, "Guess a number between 1 and 100");
  // wait for response
  bot.on("message", (msg) => {
    // check if the message is a number
    if (isNaN(msg.text)) {
      bot.sendMessage(msg.chat.id, "Please enter a number");
    } else {
      // check if the number is higher or lower
      if (msg.text > randomNumber) {
        bot.sendMessage(msg.chat.id, "Your number is higher");
      } else if (msg.text < randomNumber) {
        bot.sendMessage(msg.chat.id, "Your number is lower");
      } else {
        bot.sendMessage(msg.chat.id, "You guessed it!");
      }
    }
  });
});
