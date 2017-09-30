# DiscordTimezoneBot
This is a bot to allow people to set their timezone so others can check what is their localtime 

# commands
## !timezone set \<hour\>
  set the timezone for the current user, can be both positive and negative
  
## !timezone get \<nickname\>
  prints the user's timezone

## !localtime \<nickname\>
  prints the localtime of that user

# Setup
This uses NodeJS, so first you need to make sure NodeJS is installed
1. Download index.js and package.json
2. Open command line and type `npm install`, this will install everything which is needed
3. Create a file called `bot-config.json`, it should contain the following stuff:
  ```JSON
  {
    "bot_token": "<BOT TOKEN>"
  }
  ```
4. Type in the command line `node index.js`
5. The bot should be running!

# User data
  all of the user data is saved inside a file called `user-timezone-data.json`
  the it is just an array of the userID as the key and the timezone as the value
