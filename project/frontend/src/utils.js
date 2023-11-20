const URL = "http://localhost:65535";

export async function checkAuth(token) {
  const response = await fetch(URL + "/auth/is-authed", {
    headers: {
      token
    }
  });
  const parsedResponse = await response.json();
  if (parsedResponse.success === true) {
    return parsedResponse.result.accountType;
  }
  return null;
}
