import { Message } from 'discord.js';
import { settingsGet } from './settings';

export async function messageCreated(message: Message) {
	if (!message.guild) return;
	if (message.author.bot) return;

	const serverSettings = await settingsGet(message.guild.id);

	const threadMessage = serverSettings.enabledChannels[message.channel.id];
	if (!threadMessage) return;

	console.log('Creating thread for message');
	message.startThread(threadMessage, 60).catch(console.error);
}