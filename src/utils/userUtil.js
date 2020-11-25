import jwt_decode from "jwt-decode";

import { keys } from "../constants";

export const getUserFromlocalStorage = () => {
  return new Promise((resolve, reject) => {
    localStorage
      .getItem(keys.TOKEN_KEY)
      .then((token) => {
        if (!token) {
          throw new Error("Credential is not found");
        }
        const user = jwt_decode(token);
        resolve(user);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const setUserRegStatusInlocalStorage = async (status) => {
  try {
    await localStorage.setItem(keys.HAS_REGISTERED_KEY, status);
  } catch (e) {
    throw e;
  }
  return true;
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
  return new Promise((resolve, reject) => {
    localStorage
      .getItem(keys.TOKEN_KEY)
      .then((token) => {
        if (!token) {
          reject(new Error("Credentials not found"));
        } else {
          resolve(token);
        }
      })
      .catch(reject);
  });
};

const setUserToken = (token) => {
  return new Promise((resolve, reject) => {
    localStorage
      .setItem(keys.TOKEN_KEY, token)
      .then(() => {
        resolve(true);
      })
      .catch(reject);
  });
};

const removeUserToken = () => {
  return new Promise((resolve, reject) => {
    localStorage
      .removeItem(keys.TOKEN_KEY)
      .then(() => {
        resolve(true);
      })
      .catch(reject);
  });
};

const removeUserRegisteration = () => {
  return new Promise((resolve, reject) => {
    localStorage
      .removeItem(keys.HAS_REGISTERED_KEY)
      .then(() => {
        resolve(true);
      })
      .catch(reject);
  });
};
export default {
  getUserFromlocalStorage,
  generateRandomStrings,
  validateEmail,
  getUserToken,
  setUserToken,
  removeUserToken,
  removeUserRegisteration,
  setUserRegStatusInlocalStorage,
};
