export async function getGitHubUser(accessToken) {
  const res = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/vnd.github",
      "User-Agent": "online-ide-server",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const contract = await res.json();
  console.log(`Log in in with github:`);
  console.log(contract);
  return mapGitHubUserContractToModel(contract);
}

const mapGitHubUserContractToModel = (contract) => ({
  email: contract.email,
  nickname: contract.login,
});
