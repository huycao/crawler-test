import browserObject from "./browser";
import scraperController from "./pageController";

let browserInstance = browserObject();
scraperController(browserInstance)