require('dotenv').config();
const {App} = require('@slack/bolt');
const fetch = require('node-fetch');


const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});


(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

app.event('app_mention', async ({event, context, client, say}) => {
  console.log(event);
  mention = event.text.split(' ');
  if (mention.length != 2) {
    return;
  }
  username = mention[1];
  console.log(username);
  res = await fetch(`https://hacktoberfestchecker.jenko.me/prs?username=${username}`); // TODO: replace with built-in checks
  json = await res.json();

  console.log(json.prs.length);

  try {
    await say(`PR count for GitHub user ${username}: ${json.prs.length}`);
  } catch (error) {
    console.error(error);
  }
});


app.command('/slacktoberfest', async ({command, ack, body, say}) => {
  await ack();

  console.log(body);
  username = body.text;

  res = await fetch(`https://hacktoberfestchecker.jenko.me/prs?username=${username}`); // TODO: replace with built-in checks
  json = await res.json();

  console.log(json.prs.length);

  try {
    await say(`PR count for GitHub user ${username}: ${json.prs.length}`);
  } catch (error) {
    console.error(error);
  }
});
