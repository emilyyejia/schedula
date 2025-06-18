import sendRequest from "./sendRequest";
const BASE_URL = "/api/auth";
export async function signUp(userData) {
  const res = await sendRequest(BASE_URL + "/signup", "POST", userData);
  localStorage.setItem("token", res.token);
  localStorage.setItem("user", res.user);
  return res.user;
}

export async function logIn(credentials) {
  const res = await sendRequest(`${BASE_URL}/login`, "POST", credentials);
  console.log(res)
  localStorage.setItem("token", res.token);
  localStorage.setItem("user", res.user);
  return res.user;
}

export async function checkUser(email) {
  const url = `${BASE_URL}/checkuser?email=${encodeURIComponent(email)}`;
  const user = await sendRequest(url, "GET");
  return user.exists;
}

export async function googleLogin(token) {
  const res = await sendRequest(`${BASE_URL}/googlelogin`, "POST", { token });
  localStorage.setItem("token", res.token);
  return res;
}

export function getUser() {
  
  return localStorage.getItem("user");
}

export function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}


export function getToken() {
  return localStorage.getItem("token");
}