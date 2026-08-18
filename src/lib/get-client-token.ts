export function getClientToken() {
  if (typeof window === "undefined") return "";
  let token = localStorage.getItem("quizzy_client_token");
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem("quizzy_client_token", token);
  }
  return token;
}
