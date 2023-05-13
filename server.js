const TelegramBot = require('node-telegram-bot-api');

const token = '6162090783:AAEySY5npu0syvX6l2dsaBwe0P0KjQrS5f4';

const bot = new TelegramBot(token, { polling: true });


let punteggi = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMsg = `Benvenuto al gioco dei dadi!\n\nIn questo gioco, devi lanciare un dado e cercare di ottenere il numero più alto rispetto al bot.\n\nPer iniziare il gioco, invia il comando /gioca.`;
  bot.sendMessage(chatId, welcomeMsg);
});

bot.onText(/\/gioca/, (msg) => {
  const chatId = msg.chat.id;

  // Se l'utente non ha mai giocato, inizializziamo il suo punteggio a 0
  if (!punteggi[chatId]) {
    punteggi[chatId] = 0;
  }

  // Genera un numero casuale da 1 a 6 per il giocatore
  const NumeroUtente = Math.floor(Math.random() * 6) + 1;
    
  // Genera un numero casuale da 1 a 6 per il bot
  const NumeroBot = Math.floor(Math.random() * 6) + 1;

  let Vincitore = `Hai lanciato il dado e hai ottenuto ${NumeroUtente}.\n`;
  Vincitore += `Il bot ha lanciato il dado e ha ottenuto ${NumeroBot}.\n\n`;

  if (NumeroUtente > NumeroBot) {
    Vincitore += 'Hai vinto!';
    // Incrementa il punteggio dell'utente
    punteggi[chatId]++;
  } else if (NumeroUtente < NumeroBot) {
    Vincitore += 'Il bot ha vinto.';
  } else {
    Vincitore += 'Pareggio!';
  }
  
  Vincitore += `\n\nIl tuo punteggio attuale è: ${punteggi[chatId]}`;

  bot.sendMessage(chatId, Vincitore);
});
