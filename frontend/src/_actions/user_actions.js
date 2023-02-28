import axios from "axios";
import { LOGIN_USER, AUTH_USER, LOGOUT_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios.post(`/api/login`, dataToSubmit,
  ).then((response) => {
    console.log(response);
    window.localStorage.setItem("Authorization", response.headers.authorization);
  });
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
  console.log("logoutUser 실행됨");
  
  return {
    type: LOGOUT_USER,
    payload: null,
  };
}
