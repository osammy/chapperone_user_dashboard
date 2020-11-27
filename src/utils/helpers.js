/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-undef */
import numeral from "numeral";

import { differenceInDays } from "./date";
import { message } from "antd";

function generateReference() {
  let text = "";
  const alphaNumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 11; i++) {
    text += alphaNumeric.charAt(Math.floor(Math.random() * 11));
  }

  return `ACCT_${text}`;
}

function generateRandomStrings(n) {
  let text = "";
  const alphaNumeric =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < n; i++) {
    text += alphaNumeric.charAt(Math.floor(Math.random() * n));
  }

  return `ACCT_${text}`;
}

const defaultToast = (message, type) => {
  const DEFAULT_DURATION = 3000;
  const options = {
    text: message || "No error message provided",
    buttonText: "Okay",
    type: type || "default",
    duration: DEFAULT_DURATION,
  };
  Toast.show(options);
};

const displayMessage = (e, toastType) => {
  const showMessage = (messageText) => {
    const text = messageText ? messageText : "Error message not provided";
    const type = toastType ? toastType : "error";

    message[type](text);
  };

  let dataResponseErrMsg, dataErrMsg, errMsg;
  try {
    dataResponseErrMsg = e.response.data.message;
    if (typeof dataResponseErrMsg !== "string") {
      throw new Error("Err message must be a string");
    }
  } catch (dataErr) {
    try {
      dataErrMsg = e.data.message;
      if (typeof dataErrMsg !== "string") {
        throw new Error("Err message must be a string");
      }
    } catch (err) {
      errMsg = e.message || "An Error Ocurred";
    }
  }

  const msg = dataResponseErrMsg || dataErrMsg || errMsg;

  showMessage(msg);
};

const displayToastMessage = (e, toastType, timeout, btnText) => {
  const displayMessage = (message) => {
    const DEFAULT_DURATION = 3000;
    const duration = timeout ? timeout : DEFAULT_DURATION;
    const buttonText = btnText ? btnText : "Okay";
    const text = message ? message : "Error message not provided";
    const type = toastType ? toastType : "default";
    const options = {
      text,
      buttonText,
      type,
      duration,
    };
    Toast.show(options);
  };

  let dataResponseErrMsg, dataErrMsg, errMsg;
  try {
    dataResponseErrMsg = e.response.data.message;
    if (typeof dataResponseErrMsg !== "string") {
      throw new Error("Err message must be a string");
    }
  } catch (dataErr) {
    try {
      dataErrMsg = e.data.message;
      if (typeof dataErrMsg !== "string") {
        throw new Error("Err message must be a string");
      }
    } catch (err) {
      errMsg = e.message || "An Error Ocurred";
    }
  }

  const msg = dataResponseErrMsg || dataErrMsg || errMsg;

  displayMessage(msg, timeout, btnText);
};

const capitalize = (s) => {
  if (typeof s !== "string") {
    return "";
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};
const toCurrency = (value, currency) => {
  let formattedValue;
  console.log(value, currency);
  let amount;

  try {
    if (typeof value !== "number") {
      amount = Number(value);
    }
    currency = currency.toUpperCase();

    switch (currency) {
      case "GBP":
        formattedValue = `£${parseFloat(amount).toFixed(2)}`;
        break;
      case "USD":
        formattedValue = numeral(amount).format("$0,00");
        break;
      case "NGN":
        formattedValue = `₦${numeral(amount).format("0,00")}`;
        break;
      default:
        formattedValue = numeral(amount).format("$0,00");
    }
  } catch (e) {
    console.log(e);
    formattedValue = "";
  }

  return formattedValue;
};

function convertFromCurrency(value, preferredFormat) {
  let formattedValue;
  if (!value) {
    return value;
  }

  if (typeof value !== "string") {
    return value;
  }

  if (value[0] === "$") {
    formattedValue = numeral(value).value();
  } else {
    const withoutCurrency = value.substring(1, value.length);
    formattedValue = numeral(withoutCurrency).value();
  }

  if (preferredFormat) {
    switch (preferredFormat) {
      case "string":
        formattedValue = `${formattedValue}`;
        break;
      default:
      // formattedValue = Number(formattedValue);
    }
  }

  return formattedValue;
}

const getValidator = (type) => {
  const containsOnlyNumbers = (value) => {
    try {
      if (typeof value === "number") {
        value = String(value);
      }
      const numbers = /^[0-9]+$/;
      if (value.match(numbers)) {
        return true;
      }
    } catch (e) {}
    return false;
  };

  const containsSpecialCharacter = (value) => {
    try {
      if (typeof value === "number") {
        value = String(value);
      }
      const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (value.match(format)) {
        return true;
      }
    } catch (e) {}
    return false;
  };

  const isEmpty = (value) => {
    if (!value || value === "") {
      return true;
    }
    return false;
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  if (type === "string") {
    return {
      containsOnlyNumbers,
      containsSpecialCharacter,
      isEmpty,
      validateEmail,
    };
  }
};

export default {
  toCurrency,
  convertFromCurrency,
  displayToastMessage,
  capitalize,
  generateReference,
  defaultToast,
  getValidator,
  displayMessage,
  generateRandomStrings,
};
