const puppeteer = require('puppeteer');
const fs = require('fs');
const path = './covidReport.json';
const url =
	'https://twitter.com/search?q=%22ang%20Department%20of%20Health%20ay%20nakapagtala%20ng%22%20since%3A2021-08-28&src=typed_query&f=live';
let covidTally = {};
covidTally.covidReport = [];

if (fs.existsSync(path)) {
	fs.readFile(path, 'utf8', (err, jsonString) => {
		try {
			covidTally = JSON.parse(jsonString);
		} catch (err) {
			console.log('Error', err);
		}
	});
}

puppeteer
	.launch()
	.then(function (browser) {
		return browser.newPage();
	})
	.then(function (page) {
		return page
			.goto(url, {
				waitUntil: 'networkidle2',
			})
			.then(function () {
				return page.$$eval('article div[lang]', (tweets) =>
					tweets.map((tweet) => tweet.textContent)
				);
			});
	})
	.then(function (html) {
		const recentTweet = html.filter(
			(tweet) => tweet.indexOf('naitalang kaso sa bansa') != -1
		);
		const tweet = recentTweet[0];

		const dayCases = tweet.substring(
			tweet.indexOf('nakapagtala ng') + 15,
			tweet.indexOf('na karagdagang') - 1
		);

		const dayRecoveries = tweet.substring(
			tweet.indexOf('namang naitalang') + 17,
			tweet.indexOf('na gumaling') - 1
		);

		const dayDeaths = tweet.substring(
			tweet.indexOf('gumaling at') + 12,
			tweet.indexOf('na pumanaw') - 1
		);

		const activeCasePercentage = tweet.substring(
			tweet.indexOf('bansa,') + 7,
			tweet.indexOf('% (')
		);

		const activeCaseTotal = tweet.substring(
			tweet.indexOf('% (') + 3,
			tweet.indexOf(') ang')
		);

		const reportDate = tweet.substring(
			tweet.indexOf('PM,') + 4,
			tweet.indexOf(', ang Department')
		);

		const dailyRecord = {
			reportDate: reportDate,
			newCases: dayCases,
			recoveries: dayRecoveries,
			deaths: dayDeaths,
			activeCasePercentage: activeCasePercentage,
			activeCaseTotal: activeCaseTotal,
			generatedAt: new Date(),
		};

		covidTally.covidReport.push(dailyRecord);
		const json = JSON.stringify(covidTally);

		fs.writeFile(path, json, function (err) {
			if (err) throw err;
			console.log('Scraping done..');
		});
	})
	.catch(function (err) {
		//handle error
		console.log('Error', err);
	});
