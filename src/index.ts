import { Client, Intents } from 'discord.js';
import { registerCommands, registerInteraction } from './commandProcessor';
import { messageCreated } from './messageCreated';
import { settingsInitialize } from './settings';

async function main() {
	const client = new Client({
		intents: [
			Intents.FLAGS.GUILD_MESSAGES
		],
	});

	await settingsInitialize();

	client.on('messageCreate', messageCreated);
	client.on('ready', async () => {
		console.log('Bot started');

		await registerInteraction(client);
		await registerCommands(client);
	});

	client.login(process.env.DISCORD_TOKEN);
}

main();
