/* eslint-disable import/no-anonymous-default-export */
import jwt_decode from "jwt-decode";

import { keys } from "../constants";

export const getUserFromLocalStorage = () => {
  const token = window.localStorage.getItem(keys.TOKEN_KEY);
  if (!token) {
    throw new Error("Credential is not found");
  }
  const user = jwt_decode(token);
  return user;
};

export const setUserRegStatusInLocalStorage = (status) => {
  return window.localStorage.setItem(keys.HAS_REGISTERED_KEY, status);
};

export const generateRandomStrings = (n) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < n; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

const getUserToken = () => {
  return window.localStorage.getItem(keys.TOKEN_KEY);
};

const setUserToken = (token) => {
  window.localStorage.setItem(keys.TOKEN_KEY, token);
};

const removeUserToken = () => {
  window.localStorage.removeItem(keys.TOKEN_KEY);
};

export default {
  getUserFromLocalStorage,
  generateRandomStrings,
  validateEmail,
  getUserToken,
  setUserToken,
  removeUserToken,
};
