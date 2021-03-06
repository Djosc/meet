const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar('v3');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

const credentials = {
	client_id: process.env.CLIENT_ID,
	project_id: process.env.PROJECT_ID,
	client_secret: process.env.CLIENT_SECRET,
	calendar_id: process.env.CALENDAR_ID,
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	redirect_uris: ['https://djosc.github.io/meet/'],
	javascript_origins: [
		'https://djosc.github.io',
		'http://localhost:3000',
		'http://127.0.0.1:8080',
	],
};
const { client_secret, client_id, redirect_uris, calendar_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

module.exports.getAuthURL = async () => {
	const authURL = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});

	return {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify({
			authURL: authURL,
		}),
	};

	// Use this code if you don't use the http event with the LAMBDA-PROXY integration
	// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.getAccessToken = async (event) => {
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

	const code = decodeURIComponent(`${event.pathParameters.code}`);

	return new Promise((resolve, reject) => {
		oAuth2Client.getToken(code, (err, token) => {
			// if (!['access-control-allow-origin']) {
			// 	res['access-control-allow-origin'] = { value: '*' };
			// }

			if (err) {
				return reject(err);
			}
			return resolve(token);
		});
	})
		.then((token) => {
			return {
				statusCode: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(token),
			};
		})
		.catch((err) => {
			console.error(err);
			return {
				statusCode: 500,
				body: JSON.stringify(err),
			};
		});
};

module.exports.getCalendarEvents = async (event) => {
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

	const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);

	oAuth2Client.setCredentials({ access_token });

	return new Promise((resolve, reject) => {
		calendar.events.list(
			{
				calendarId: calendar_id,
				auth: oAuth2Client,
				timeMin: new Date().toISOString(),
				singleEvents: true,
				orderBy: 'startTime',
			},
			(error, response) => {
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			}
		);
	})
		.then((response) => {
			return {
				statusCode: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({ events: response.data.items }),
			};
		})
		.catch((err) => {
			return {
				statusCode: 500,
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(err),
			};
		});
};
