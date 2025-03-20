const formatMessage = (message) => {
  const parts = message.trim().split(" ");
  const itemNumber = parts[0];
  let error = null;

  if (isNaN(itemNumber))
    error =
      "Please enter the command in this format: /command <number> <message>";

  if (itemNumber < 1 || itemNumber > 25)
    error = "Enter a number between 1 and 25";

  const itemContent = parts.slice(1).join(" ");

  return { itemNumber, itemContent, error };
};
module.exports = { formatMessage };
