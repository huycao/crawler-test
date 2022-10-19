import App from "./server";
import LinkRoute from "./api/links";
import loadConfig from "./utils/configs";

loadConfig()

const app = new App([new LinkRoute()]);
app.listen();