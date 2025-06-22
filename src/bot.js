const venom = require("venom-bot");

venom
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage(async (message) => {
    if (message.body === "$ping") {
      await client.sendText(message.from, "pong!");
    }
  });
}
