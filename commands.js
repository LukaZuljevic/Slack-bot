const { formatMessage } = require("./formatMessage");
const { fetchDataWithGiphy } = require("./api");

const handleCommand = async (command, ack, respond, app, type) => {
  await ack();

  const { itemNumber, itemContent, error } = formatMessage(command.text);

  if (error) {
    await respond({ text: `${error}` });
    return;
  }

  const attachments = await fetchDataWithGiphy(itemNumber, itemContent, type);

  try {
    await app.client.chat.postMessage({
      channel: command.channel_id,
      text:
        attachments.length > 0
          ? `Rezultati za: "${itemContent}" 😊`
          : `Nema rezultata za: "${itemContent}" 😔`,
      attachments: attachments,
    });
  } catch (error) {
    console.error("Error sending message to Slack:", error);
  }
};

module.exports = { handleCommand };
