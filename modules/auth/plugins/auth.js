import OAuth from "@fastify/oauth2";
import fastifyPlugin from "fastify-plugin";

import { config } from "../../../shared/config.js";
import { authProviderConfig } from "../constants/trusted-providers.js";

async function authWithGithub(fastify, opts) {
  const { provider } = opts;
  const startRedirectPath = `/login/${provider}`;
  const callbackUri = `${config.API_V1_BASE_URL}/login/${provider}/callback`;

  await fastify.register(OAuth, {
    name: provider,
    credentials: {
      client: {
        id: authProviderConfig[provider].clientId,
        secret: authProviderConfig[provider].clientSecret,
      },
      auth: authProviderConfig[provider].auth,
    },
    startRedirectPath,
    callbackUri,
    scope: authProviderConfig[provider].scope,
  });
}

export default fastifyPlugin(authWithGithub, { name: "authorization" });
