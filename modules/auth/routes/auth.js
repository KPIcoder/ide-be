import fastifyPlugin from "fastify-plugin";

import { setAccessTokenInCookie } from "../services/auth-cookie.service.js";
import { authProviderConfig } from "../constants/trusted-providers.js";

async function loginWithTrustedProvider(fastify, options) {
  const { provider } = options;
  const { domain } = fastify;

  fastify.get(`/login/${provider}/callback`, async function (request, reply) {
    const { token } = await this[
      provider
    ].getAccessTokenFromAuthorizationCodeFlow(request);

    const loginCredentials = await authProviderConfig[provider].getUser(
      token.access_token
    );

    const user = await domain.user.authorize(loginCredentials);

    setAccessTokenInCookie(token.access_token, reply);

    reply.send({ data: user });
  });
}

export default fastifyPlugin(loginWithTrustedProvider);
