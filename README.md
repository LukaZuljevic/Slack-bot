Slack Bot

1. Clone the repository

git clone <repo-url>

2. Install dependencies

npm install

3. Setup env file

Create a .env file in the root directory and add:

SLACK_BOT_TOKEN=<your-slack-bot-token>
SLACK_SIGNING_SECRET=<your-slack-signing-secret>
SLACK_APP_TOKEN=<your-slack-app-token>
API_KEY=<your-giphy-api-key>

4. Configure slack app

Go to slack API dashboard

Select or create a new slack app

Enable socket mode under app-level tokens

Add the following OAuth & Permissions scopes:

commands

chat:write

Add slash commands:

/mygif 

/sticker

Install the App to your workspace and copy the tokens to .env

5. Start the Bot

nodemon app.js

6. Test the Bot

Go to your Slack workspace and try(number represents number of items that you want):

/mygif 5 funny cats

/sticker 3 happy dog
