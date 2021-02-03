/* eslint-disable import/no-anonymous-default-export */
import jwt_decode from "jwt-decode";

import { keys } from "../constants";

const getUserFromLocalStorage = () => {
  const token = window.localStorage.getItem(keys.TOKEN_KEY);
  if (!token) {
    throw new Error("Credential is not found");
  }
  const user = jwt_decode(token);
  return user;
};

const getLatestContract = () => {
  const contract = window.localStorage.getItem(keys.CONTRACT_KEY);
  if (!contract) {
    throw new Error("Latest Contract is not found");
  }
  return JSON.parse(contract);
};

const setLatestContract = (contract) => {
  window.localStorage.setItem(keys.CONTRACT_KEY, JSON.stringify(contract));
};
const setOrganisation = (organisation) => {
  window.localStorage.setItem(keys.ORG_KEY, JSON.stringify(organisation));
};
const getOrganisation = () => {
  const organisation = window.localStorage.getItem(keys.ORG_KEY);
  if (!organisation) {
    throw new Error("Error occured on org found");
  }
  return JSON.parse(organisation);
};

const setUserRegStatusInLocalStorage = (status) => {
  return window.localStorage.setItem(keys.HAS_REGISTERED_KEY, status);
};

const generateRandomStrings = (n) => {
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
  getLatestContract,
  setUserRegStatusInLocalStorage,
  setLatestContract,
  getOrganisation,
  setOrganisation,
};
