import { convert } from "html-to-text";
import RedisClient from "../utils/redis";

const client = RedisClient.instance;

const scraperObject = {
	async getUrl(): Promise<any> {
		try {
			await client.connect();
			const key = 'linkedin.com';
			const link = await client.brPop(key, 1);
			client.quit();
			return (link) ? link.element : null;
		} catch (error) {
			console.log(error)
		}
		return null;
	},
	async scraper(browser: any) {
		const link = await this.getUrl();
		if (link === null) {
			return {}
		}
		let page = await browser.newPage();
		console.log(`Navigating to ${link}...`);
		await page.goto(link);

		await page.waitForSelector('.details');
		const cover_img = await page.$eval('.cover-img__image-position img[src]', (img: any) => img.getAttribute('src'));
		const article_content = await page.waitForSelector('.article-content');
		const article_title = await article_content.$eval('h1', (el: any) => el.innerText);
		const article_author = await article_content.$eval('.base-main-card__info h3', (el: any) => el.innerText);
		const article_published = await article_content.$eval('.base-main-card__metadata', (el: any) => el.innerText);
		const article_body = await article_content.$eval('.article-content__body', (el: any) => el.innerHTML);
		const social_details = await page.waitForSelector('.social-details');
		const reaction_counts = await social_details.$eval('.social-counts-reactions__social-counts-numRections', (el: any) => el.innerText);
		const comments_tracking = await social_details.$('[data-tracking-control-name="pulse-article_social-details_social-action-counts_comments-text"]', (el: any) => el.innerText);
		const comments_counts_text = await (await comments_tracking.getProperty('textContent')).jsonValue()
		const comments_counts_convert = convert(comments_counts_text, { wordwrap: 130 })
		const comments_count = comments_counts_convert.split(' ')[0];
		const comments_list = await social_details.$$eval('.comments section', (comments: any[]) => {
			comments = comments.map(comment => comment.querySelector('.comment__body-wrapper').innerText)
			return comments;
		})

		const comments = [];
		for (const i in comments_list) {
			const parser = comments_list[i].split('\n');
			comments.push({
				author: parser[0],
				comment: parser[1]
			})
		}
		const scrapedData = {
			coverImage: cover_img,
			title: article_title,
			author: article_author,
			published: article_published,
			body: article_body,
			socialReaction: {
				liked: reaction_counts,
				comments: comments_count
			},
			comments: comments
		};
		return scrapedData;
	}
}

export default scraperObject;