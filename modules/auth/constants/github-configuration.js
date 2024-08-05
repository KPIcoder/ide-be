import fastifyOauth2 from "@fastify/oauth2";
import { config } from "../../../shared/config.js";
import { getGitHubUser } from "../services/auth-github.service.js";

export const githubConfiguration = {
  clientId: config.GITHUB_CLIENT_ID,
  clientSecret: config.GITHUB_CLIENT_SECRET,

  auth: fastifyOauth2.GITHUB_CONFIGURATION,

  getUser: getGitHubUser,
  scope: ["user", "repo"],
};
