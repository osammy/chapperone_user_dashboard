/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

import { keys } from "../../constants";

function getUserToken() {
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
}

const getWithAuth = async (url, params) => {
  const token = await getUserToken();
  let options = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  if (params) {
    options.params = params;
  }

  return axios(options);
};

const postWithAuth = async (url, data) => {
  const token = await getUserToken();
  let options = {
    method: "POST",
    url,
    data,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  return axios(options);
};

const putWithAuth = async (url, data) => {
  const token = await getUserToken();

  let options = {
    method: "PUT",
    url,
    data,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  return axios(options);
};
//
const get = (url, params) => {
  let options = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (params) {
    options.params = params;
  }

  return axios(options);
};

const post = (url, data) => {
  let options = {
    method: "POST",
    url,
    data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(options);
};

const put = (url, data) => {
  let options = {
    method: "PUT",
    url,
    data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(options);
};

export default {
  put,
  post,
  get,
  postWithAuth,
  putWithAuth,
  getWithAuth,
};
