import chalk from 'chalk';

export const printError = (err) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + err);
};

export const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

export const printHelp = () => {
	console.log(`
${chalk.bgCyan(' HELP ')}
Without params - print weather
-h to print help
-c [CITY] to set city
-t [API_KEY] to save token
`);
};

export const printWeather = (res, icon) => {
	console.log(`
${chalk.bgMagenta(' WEATHER ')} Weather in ${res.name}
${icon}  ${res.weather[0].description}
Temperature ${res.main.temp}, feels like ${res.main.feels_like}
Humidity ${res.main.humidity}%
Wind speed ${res.wind.speed}
`);
};
