import { build } from "./app.js";
import { config } from "./shared/config.js";

const options = {
  logger: { level: "info" },
};

const app = await build(options);

console.log(app.printRoutes());

const port = config.PORT;

app.listen({ port });
