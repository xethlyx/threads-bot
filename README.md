# Adding to your server
https://discord.com/oauth2/authorize?client_id=870067042915590144&scope=bot+applications.commands&permissions=53687091200

This is currently run on my server, it isn't sharded and it isn't really made to scale.

# Commands
`/autothread <channel> <thread name>` Enable autothreading in the current channel, with the specified thread name

`/disableautothread <channel>` Disable autothreading in the current channel

# Self hosting
Example docker compose file
```yaml
version: '2'
services:
    threads-bot:
        image: xethlyx/threads-bot
        restart: unless-stopped
        environment:
          - DISCORD_TOKEN=yourtokenhere
          - ALLOWED_USERS=youruseridhere,yourotheruseridhere
        volumes:
          - /data/threads-bot:/app/settings
```
Optionally you can add `SKIP_COMMANDS=TRUE` after starting for the first time to skip initialization of commands (this will slightly increase startup times and reduce bugs if you're restarting frequently).
