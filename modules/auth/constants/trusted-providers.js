import { githubConfiguration } from "./github-configuration.js";

export const GITHUB_PROVIDER_NAME = "github";

export const GOOGLE_PROVIDER_NAME = "google";

export const PROVIDER_NAMES = [GITHUB_PROVIDER_NAME, GOOGLE_PROVIDER_NAME];

export const authProviderConfig = {
  [GITHUB_PROVIDER_NAME]: githubConfiguration,
};
