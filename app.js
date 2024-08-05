import fastify from "fastify";
import fastifyAutoload from "@fastify/autoload";
import fastifySensible from "@fastify/sensible";
import { join } from "desm";

import { domain } from "./domain/index.js";

export async function build(options = {}) {
  const app = fastify(options);

  app.decorate("domain", domain);

  await app.register(fastifySensible);

  await app.register(fastifyAutoload, {
    dir: join(import.meta.url, "modules"),
    maxDepth: 1,
  });

  return app;
}
