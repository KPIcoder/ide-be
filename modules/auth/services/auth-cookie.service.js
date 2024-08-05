const AUTH_COOKIE_KEY = "accessToken";

export function setAccessTokenInCookie(accessToken, reply) {
  reply.setCookie(AUTH_COOKIE_KEY, accessToken, {
    // TODO: refactor these options
    httpOnly: true,
    maxAge: 24 * 60 * 60, // 1 day
  });
}

export function checkAuthCookieValidity(req) {
  const cookie = req.cookies[AUTH_COOKIE_KEY];
  if (!cookie) return false;
  const value = req.unsignCookie(cookie);

  return value.valid;
}

export function removeAuthCookie(reply) {
  return reply.clearCookie(AUTH_COOKIE_KEY);
}
