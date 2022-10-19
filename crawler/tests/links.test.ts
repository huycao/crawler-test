import request from 'supertest';
import App from '../src/server';
import LinkRoute from "../src/api/links";
import { Links } from '../src/api/links/schema';

afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Links', () => {
    describe('[POST] /api/links', () => {
        it('response should have the save link', () => {
            const data: typeof Links = {
                link: 'https://www.linkedin.com/pulse/growth-diversity-my-career-cgi-inne-siera-chartered-mcipd/?trackingId=Vyg3eRRXQ4GUS8pxnvicpA%3D%3D'
            }

            const linkRoute = new LinkRoute();
            const app = new App([linkRoute]);
            const link = JSON.parse(JSON.stringify(data)).link;
            return request(app.getServer()).post('/api/links').send(data).expect(201, {data: link, message: 'Data has been saved'});
        });
    });
    describe('[GET] /api/links', () => {
        it('response statusCode 200', () => {
            const linkRoute = new LinkRoute();
            const app = new App([linkRoute]);
            return request(app.getServer()).get('/api/links').expect(200);
        });
    });
});