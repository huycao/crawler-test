import { Request, Response, NextFunction } from "express";
import RedisClient from "../../utils/redis";
import { extractRootDomain } from "../../utils/util";

const client = RedisClient.instance;

export default class LinkController {
  public postLinks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await client.connect();
      const key = extractRootDomain(req.body.link)
      await client.lPush(key, req.body.link);
      client.quit();
      res.status(201).json({ data: req.body.link, message: 'Data has been saved' });
    } catch (error) {
      next(error);
    }
  };
  public getLinks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await client.connect();
      const key = 'linkedin.com';
      const link = await client.brPop(key, 1);
      client.quit();
      res.status(200).json({ data: link });
    } catch (error) {
      next(error);
    }
  };
}