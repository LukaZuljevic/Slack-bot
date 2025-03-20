const { App } = require("@slack/bolt");
require("dotenv").config();

const { formatMessage } = require("./formatMessage");
const { fetchDataWithGiphy } = require("./api");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.command("/mygif", async ({ command, ack, respond }) => {
  await ack();

  const { itemNumber, itemContent, error } = formatMessage(command.text);

  if (error) {
    await respond({
      text: `${error}`,
    });
    return;
  }

  const attachments = await fetchDataWithGiphy({ itemNumber, itemContent });

  try {
    await app.client.chat.postMessage({
      channel: command.channel_id,
      text: "Here are you GIFs!",
      attachments: attachments,
    });
  } catch (error) {
    console.error("Error sending message to Slack:", error);
  }
});

app.command("/sticker", async ({ command, ack, respond }) => {
  await ack();
});

(async () => {
  await app.start();

  app.logger.info("⚡️ Bolt app is running!");
})();
