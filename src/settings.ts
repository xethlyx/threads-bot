import fss from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

export interface ServerSettings {
	enabledChannels: Record<string, string>;
}

const defaultSettings: ServerSettings = {
	enabledChannels: {}
};

const settingsFolder = path.join(__dirname, '..', 'settings');
const settingsFile = path.join(settingsFolder, 'settings.db');

let database: Database;

export async function settingsInitialize() {
	// Nothing to initialize if the settings folder already exists
	if (!fss.existsSync(settingsFolder)) {
		await fs.mkdir(settingsFolder);
	}

	database = await open({
		filename: settingsFile,
		driver: sqlite3.Database
	});

	const query = `CREATE TABLE if NOT EXISTS settings (
		serverId TEXT UNIQUE NOT NULL,
		serverSettings TEXT
	)`;
	await database.run(query);

	console.log('Database initialized');
}

export async function settingsGet(serverId: string): Promise<ServerSettings> {
	const query = 'SELECT serverSettings FROM settings WHERE serverId = ?';
	const params = [serverId];

	const result = await database.get(query, params);
	if (!result || !result.serverSettings) return defaultSettings;

	return JSON.parse(result.serverSettings);
}

export async function settingsSet(serverId: string, newSettings: ServerSettings): Promise<void> {
	const query = 'INSERT OR REPLACE INTO settings (serverId, serverSettings) VALUES (?, ?)';
	const params = [serverId, JSON.stringify(newSettings)];

	await database.run(query, params);
}