const { App } = require("@slack/bolt");
require("dotenv").config();

const { handleCommand } = require("./commands");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.command("/mygif", async ({ command, ack, respond }) => {
  await handleCommand(command, ack, respond, app, "gifs");
});

app.command("/sticker", async ({ command, ack, respond }) => {
  await handleCommand(command, ack, respond, app, "stickers");
});

(async () => {
  await app.start();
  app.logger.info("⚡️ Bolt app is running!");
})();
