import puppeteer from 'puppeteer';

describe('show/hide and events details', () => {
	let browser;
	let page;
	beforeAll(async () => {
		jest.setTimeout(30000);
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 250,
			ignoreDefaultArgs: ['--disable-extensions'],
		});
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.event');
	});

	afterAll(() => {
		browser.close();
	});

	test('An event element is collapsed by default', async () => {
		const eventDetails = await page.$('.description');
		expect(eventDetails).toBeNull();
	});

	test('User can expand an event to see its details', async () => {
		await page.click('.show-details-btn');

		const eventDetails = await page.$('.description');
		expect(eventDetails).toBeDefined();
	});

	test('User can collapse an event to hide its details', async () => {
		await page.click('.hide-details-btn');
		const eventDetails = await page.$('.details');
		expect(eventDetails).toBeNull();
	});
});
