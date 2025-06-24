// index.js
const { Client, MessageMedia } = require("whatsapp-web.js");
const mime = require("mime-types");
const path = require("path");
const qrcode = require("qrcode-terminal");

// Cria cliente do WhatsApp
const client = new Client();
const prefixo = "!";

client.on("qr", (qr) => {
  console.log("Escaneie este QR Code com o WhatsApp do celular:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("🤖 Bot está online!");
});

client.on("message", async (message) => {
  const msg = message.body.toLowerCase();

  if (msg === `${prefixo}ping`) {
    message.reply("pong");
  } else if (msg === `${prefixo}hora`) {
    message.reply(`Agora são ${new Date().toLocaleTimeString()}`);
  } else if (msg === `${prefixo}menu`) {
    message.reply(
      `༆꙳ BOT DA SYLVA ࿐\n
      ---------------------------\n
      comandos disponiveis:\n
      ${prefixo}ping: Teste do bot\n
      ${prefixo}hora: Horario atual\n
      ${prefixo}menu: Lista de comandos do bot\n
      ${prefixo}comer: Coma alguem do grupo!\n
      ${prefixo}beijar: Beije alguem do grupo!\n
      ${prefixo}tapa: Dê um tapa em alguem do grupo!\n
      ${prefixo}mijar: mije em alguem do grupo!\n
      ---------------------------`
    );
  } else if (msg === prefixo) {
    message.reply(
      `comando não encontrado,\ndigite ${prefixo}menu para ver os comandos disponiveis!`
    );
  } else if (msg.startsWith(`${prefixo}comer`)) {
    if (message.mentionedIds.length === 0) {
      message.reply(`Mencione alguém para comer!`);
      return;
    }
    const autor = await message.getContact();
    const mencionado = await client.getContactById(message.mentionedIds[0]);
    const resposta = `${autor.pushname || autor.number} comeu ${
      mencionado.pushname || mencionado.number
    } e deixou ele(a) pedindo replay🤤😏`;
    message.reply(resposta, null, {
      mentions: [autor.id._serialized, mencionado.id._serialized],
    });
  } else if (msg.startsWith(`${prefixo}beijar`)) {
    if (message.mentionedIds.length === 0) {
      message.reply(`Mencione alguém para beijar!`);
      return;
    }
    const autor = await message.getContact();
    const mencionado = await client.getContactById(message.mentionedIds[0]);
    const resposta = `${autor.pushname || autor.number} beijou ${
      mencionado.pushname || mencionado.number
    } e deixou ele(a) pedindo replay🤤😏`;
    message.reply(resposta, null, {
      mentions: [autor.id._serialized, mencionado.id._serialized],
    });
  } else if (msg.startsWith(`${prefixo}mijar`)) {
    if (message.mentionedIds.length === 0) {
      message.reply(`Mencione alguém para mijar!`);
      return;
    }
    const autor = await message.getContact();
    const mencionado = await client.getContactById(message.mentionedIds[0]);
    const resposta = `${
      autor.pushname || autor.number
    } mijou na boquinha do(a) ${
      mencionado.pushname || mencionado.number
    } e deixou ele(a) pedindo replay🤤😏`;
    message.reply(resposta, null, {
      mentions: [autor.id._serialized, mencionado.id._serialized],
    });
  } else if (msg.startsWith(`${prefixo}tapa`)) {
    if (message.mentionedIds.length === 0) {
      message.reply(`Mencione alguém para dar uns tapas!`);
      return;
    }
    const autor = await message.getContact();
    const mencionado = await client.getContactById(message.mentionedIds[0]);
    const resposta = `${
      autor.pushname || autor.number
    } deu um tapa na cara do(a) ${
      mencionado.pushname || mencionado.number
    }, vai deixar?`;
    message.reply(resposta, null, {
      mentions: [autor.id._serialized, mencionado.id._serialized],
    });
  }
});

client.initialize();
