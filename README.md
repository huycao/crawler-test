# Crawler test
This project includes 2 parts:

### Crawler API

#### Available Scripts
In this part directory, you can run:

##### `npm run dev`
To start the app in dev mode with typescript\
Open [http://localhost:4500](http://localhost:4500) to view it in the browser.

##### `npm run dev:tsc`
To compile typescript to javascript

##### `npm run dev:serve`
To start the app in dev mode with javascript

##### `npm start`
For production mode

### Note for scrape: 
[Puppeteer](https://www.npmjs.com/package/puppeteer) is a Node.js library which provides a high-level API to control Chrome/Chromium over the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/). Puppeteer runs in [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) mode by default, but can be configured to run in full (non-headless) Chrome/Chromium.

##### `npm run dev:scraper`
To start the scraper tool in dev mode

##### `npm run scraper`
To start the scraper tool in production mode

##### `npm run test`
Run the test cases.

### Crawler Site

##### `npm start`
For production mode
Open [http://localhost:5500](http://localhost:5500) to view it in the browser.
