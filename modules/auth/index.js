import fastifyAutoload from "@fastify/autoload";
import fastifyCookie from "@fastify/cookie";
import fastifyPlugin from "fastify-plugin";
import fastifyCsrfProtection from "@fastify/csrf-protection";
import { join } from "desm";

import { config } from "../../shared/config.js";
import { GITHUB_PROVIDER_NAME } from "./constants/trusted-providers.js";

async function publishAuthModule(fastify, options) {
  await fastify.register(fastifyCookie, {
    secret: config.COOKIE_SECRET,
  });

  await fastify.register(fastifyCsrfProtection, {
    sessioPlugin: "@fastify/cookie",
    cookieOpts: { signed: true },
  });

  await fastify.register(fastifyAutoload, {
    dir: join(import.meta.url, "routes"),
    options: { prefix: options.prefix, provider: GITHUB_PROVIDER_NAME },
  });

  await fastify.register(fastifyAutoload, {
    dir: join(import.meta.url, "plugins"),
    options: {
      provider: GITHUB_PROVIDER_NAME,
    },
  });
}

export default fastifyPlugin(publishAuthModule);
