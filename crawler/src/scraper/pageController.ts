import * as fs from "fs";
import pageScraper from "./pageScraper";

async function scrapeAll(browserInstance: any) {
    let browser;
	try{
		browser = await browserInstance;
		const scrapedData = await pageScraper.scraper(browser);	
		await browser.close();
		if (Object.keys(scrapedData).length > 0) {
			try {
				fs.writeFileSync("data.json", JSON.stringify(scrapedData), {encoding: "utf8", flag:'a+'});
				console.log("The data has been scraped and saved successfully! View it at './data.json'");
			} catch (error) {
				console.log(error)
			}
		}else {
			console.log("Can't crawl because the links are empty");
		}
		
	}catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

export default scrapeAll;