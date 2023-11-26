export async function checkAuth(token) {
  const URL = process.env.REACT_APP_URL;
  const response = await fetch(URL + "/auth/is-authed", {
    headers: {
      token
    }
  });
  const parsedResponse = await response.json();
  if (parsedResponse.success === true) {
    return [parsedResponse.result.accountType, parsedResponse.result.username];
  }
  return null;
}
