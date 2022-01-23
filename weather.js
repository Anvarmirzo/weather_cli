#!/usr/bin/env node

import 'dotenv/config';
import { getArgs } from './helpers/args.js';
import { getIcon, getWeather } from './services/api.service.js';
import {
	printError,
	printHelp,
	printSuccess,
	printWeather,
} from './services/log.service.js';
import { saveKeyValue, TOKENDICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
	if (!token.length) return printError('Token is not found');
	try {
		await saveKeyValue(TOKENDICTIONARY.token, token);
		printSuccess('Token saved');
	} catch (err) {
		printError(err.message);
	}
};

const saveCity = async (city) => {
	if (!city.length) return printError('City is not found');

	try {
		await saveKeyValue(TOKENDICTIONARY.city, city);
		printSuccess('City saved');
	} catch (err) {
		printError(err.message);
	}
};

const getForecast = async () => {
	try {
		const data = await getWeather();
		printWeather(data, getIcon(data.weather[0].icon));
	} catch (e) {
		if (e?.response?.status === 404) {
			printError('Wrong city');
		} else if (e?.response?.status === 401) {
			printError('Wrong token');
		} else {
			printError(e.message);
		}
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);

	if (args.h) return printHelp();

	if (args.c) return saveCity(args.c);

	if (args.t) return saveToken(args.t);

	getForecast();
};

initCLI();
