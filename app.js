require('dotenv').config()
const { App } = require('@slack/bolt');


const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});


(async () => {
  await app.start(process.env.PORT || 3000)

  console.log('⚡️ Bolt app is running!');
})();

app.event('app_mention', async ({event, context, client, say}) => {
  try {
    await say({"blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Mention response test for <@{event.user}>.  Button:`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
          },
          "value": "test_click_123",
          "action_id": "first_button"
        }
      }
    ]});
  } catch (error) {
    console.error(error);
  }
});
