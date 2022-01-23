import axios from 'axios';
import { getKeyValue, TOKENDICTIONARY } from './storage.service.js';

export const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '⛅';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '⚡';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';

		default:
			break;
	}
};

export const getWeather = async () => {
	const token = process.env.TOKEN ?? (await getKeyValue(TOKENDICTIONARY.token));
	const city = process.env.CITY ?? (await getKeyValue(TOKENDICTIONARY.city));

	if (!token) {
		throw new Error(
			'API KEY is not set, please, set your API KEY with command -t [API_KEY]',
		);
	}
	if (!city) {
		throw new Error(
			'City is not set, please, set your city with command -s [city]',
		);
	}

	const { data } = await axios.get(
		'https://api.openweathermap.org/data/2.5/weather',
		{
			params: { q: city, appid: token, lang: 'en', units: 'metric' },
		},
	);

	return data;
};
