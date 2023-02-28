import axios from "axios";
import { LOGIN_USER, AUTH_USER, LOGOUT_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios.post(`/api/user/login`, dataToSubmit).then((response) => response.data);
  console.log("loginUser 실행됨", request);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth(userId) {
  const request = axios.post(`/api/employees`, { "userId": userId }).then((response) => response.data);
  console.log("auth 실행됨", request);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios.get(`/api/user/logout`).then((response) => response.data);
  console.log("logoutUser 실행됨", request);
  
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
