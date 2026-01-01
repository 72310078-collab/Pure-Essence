import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

export function setAdminHeader(isAdmin) {
  if (isAdmin) api.defaults.headers.common["x-admin"] = "1";
  else delete api.defaults.headers.common["x-admin"];
}
