/* eslint-disable no-undef */
import numeral from 'numeral';
import ImagePicker from 'react-native-image-crop-picker';

// import storage from '@react-native-firebase/storage';

import {Toast} from 'native-base';
import {differenceInDays} from './date';
import dateUtil from './date';
import {requests} from '../globals/requests';

function generateReference() {
  let text = '';
  const alphaNumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < 11; i++) {
    text += alphaNumeric.charAt(Math.floor(Math.random() * 11));
  }

  return `ACCT_${text}`;
}

function generateRandomStrings(n) {
  let text = '';
  const alphaNumeric =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < n; i++) {
    text += alphaNumeric.charAt(Math.floor(Math.random() * n));
  }

  return `ACCT_${text}`;
}

function pickSingleImage(options) {
  return new Promise((resolve, reject) => {
    const isIos = Platform.OS === 'ios';

    ImagePicker.openPicker({...options, mediaType: 'photo'})
      .then((image) => {
        const uniqueString = generateRandomStrings(5);
        const filename = isIos
          ? `${uniqueString}-${image.filename}`
          : `${uniqueString}-${uri.replace(/^.*[\\\/]/, '')}`;

        const uri = image.path;
        // const type = response.type;
        const source = {
          uri,
          type: 'photo',
          name: filename,
        };
        resolve(source);
      })
      .catch(reject);
  });
}

async function uploadFileToFirebase(image, refNode) {
  // const FireBaseStorage = storage();
  // const ref = FireBaseStorage.ref(refNode);
  // await ref.putFile(image.uri);
  // return ref.getDownloadURL();
}
function validateImages(images, options) {
  if (!Array.isArray(images)) {
    images = [images];
  }
  const {max_size_per_image, max_no_of_images, total_images_size} = options;
  const optionsInvalid =
    !max_size_per_image || !max_no_of_images || !total_images_size || !images;

  if (optionsInvalid) {
    return {
      error: true,
      images: [],
      message: 'One or more image validation options are missing',
    };
  }
  // const max_size_per_image = 6 * 1024 * 1024; // 6mb is max iage size per image
  // const max_no_of_images = 6;
  // const total_images_size = 10 * 1024 * 1024; // max sum of all the sizes of images to be uploaded
  const copyOfImages = [...images];
  let total = 0;

  if (images.length > max_no_of_images) {
    return {
      error: true,
      images: [],
      message: `Image(s) must not exceed ${max_no_of_images} in number.`,
    };
  }
  for (let i = 0; i < copyOfImages.length; i++) {
    if (copyOfImages[i].size > max_size_per_image * 1024 * 1024) {
      return {
        error: true,
        images: [],
        message: `Each image size must not exceed ${max_size_per_image}mb`,
      };
    }

    total += copyOfImages[i].size;
  }

  if (total > total_images_size * 1024 * 1024) {
    return {
      error: true,
      images: [],
      message: `Total sum of all Image(s) size must not exceed ${total_images_size}mb`,
    };
  }

  return {
    error: false,
    images: copyOfImages,
    message: 'Success',
  };
}

async function handleImageUpload() {
  try {
    const imageObj = await pickSingleImage();
    const validOptions = {
      max_size_per_image: 3, //
      max_no_of_images: 1,
      total_images_size: 1,
    };

    const result = validateImages(imageObj, validOptions);
    if (result.error) {
      const customError = {
        title: 'Image Upload failed!',
        message: result.message,
      };
      return;
    }
    // const refNode = `/user_assets/${imageObj.filename}`;
    // const imageUrl = await uploadFileToFirebase(imageObj, refNode);
    // const body = {avatar: imageUrl};
    // const {_id} = await getUserFromAsyncStorage();
  } catch (e) {
    // this.setState({imageUploadLoading: false});
    console.log(e);
  }
}

const defaultToast = (message, type) => {
  const DEFAULT_DURATION = 3000;
  const options = {
    text: message || 'No error message provided',
    buttonText: 'Okay',
    type: type || 'default',
    duration: DEFAULT_DURATION,
  };
  Toast.show(options);
};

const displayToastMessage = (e, toastType, timeout, btnText) => {
  const displayMessage = (message) => {
    const DEFAULT_DURATION = 3000;
    const duration = timeout ? timeout : DEFAULT_DURATION;
    const buttonText = btnText ? btnText : 'Okay';
    const text = message ? message : 'Error message not provided';
    const type = toastType ? toastType : 'default';
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
    if (typeof dataResponseErrMsg !== 'string') {
      throw new Error('Err message must be a string');
    }
  } catch (dataErr) {
    try {
      dataErrMsg = e.data.message;
      if (typeof dataErrMsg !== 'string') {
        throw new Error('Err message must be a string');
      }
    } catch (err) {
      errMsg = e.message || 'An Error Ocurred';
    }
  }

  const msg = dataResponseErrMsg || dataErrMsg || errMsg;

  displayMessage(msg, timeout, btnText);
};

const capitalize = (s) => {
  if (typeof s !== 'string') {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const toCurrency = (value, type) => {
  if (typeof value !== 'number') {
    amount = Number(value);
  }
  let formattedValue;
  if (type && type === 'foreign') {
    formattedValue = numeral(value).format('$0,0');
  } else {
    formattedValue = `₦${numeral(value).format('0,0')}`;
  }
  return formattedValue;
};

function convertFromCurrency(value, preferredFormat) {
  let formattedValue;
  if (!value) {
    return value;
  }

  if (typeof value !== 'string') {
    return value;
  }

  if (value[0] === '₦') {
    const withoutCurrency = value.substring(1, value.length);
    formattedValue = numeral(withoutCurrency).value();
  } else if (value[0] === '$') {
    formattedValue = numeral(value).value();
  }

  if (preferredFormat) {
    switch (preferredFormat) {
      case 'string':
        formattedValue = `${formattedValue}`;
        break;
      default:
      // formattedValue = Number(formattedValue);
    }
  }

  return formattedValue;
}

function getTarget(principal, tenure, frequency) {
  try {
    principal = numeral(principal).value();
    const today = new Date();
    const endDate = dateUtil.addMonths(today, Number(tenure));
    let multiplier;
    switch (frequency) {
      case 'daily':
        multiplier = dateUtil.differenceInDays;
        break;
      case 'weekly':
        multiplier = dateUtil.differenceInWeeks;
        break;
      case 'monthly':
        multiplier = dateUtil.differenceInMonths;
        break;
      case 'yearly':
        multiplier = dateUtil.differenceInYears;
        break;
    }
    return Number(principal) * multiplier(endDate, today);
  } catch (e) {
    console.log(e);
    return 0;
  }
}

const interestEarnings = (principal, interestRate, startDate, endDate) => {
  if (typeof startDate === 'string') {
    startDate = new Date(startDate);
  }

  if (typeof endDate === 'string') {
    endDate = new Date(endDate);
  }
  const periods = differenceInDays(endDate, startDate); // annually
  // 100 to make it a fraction and 365 to calculate its value per day
  const val = 1 + Number(interestRate) / (100 * 365);
  return principal * (Math.pow(val, periods) - 1);
};

const getSavingsPlanInfo = (planType) => {
  const plan = planType.toLowerCase();
  const AS_LONG_AS_POSSIBLE = 2000; //MONTHS
  const DEFAULT_MIN_AMOUNT = 1000;
  const DEFAULT_MAX_AMOUNT = 1000000;

  switch (plan) {
    case 'diamond':
      return {
        currency: 'NGN',
        interest: 4,
        penal: 0,
        minTenure: 0,
        maxTenure: AS_LONG_AS_POSSIBLE,
        minAmount: DEFAULT_MIN_AMOUNT,
        maxAmount: DEFAULT_MAX_AMOUNT,
      };
    case 'pearl':
      return {
        currency: 'NGN',
        interest: 7,
        penal: 3,
        minTenure: 3,
        maxTenure: 48,
        minAmount: DEFAULT_MIN_AMOUNT,
        maxAmount: DEFAULT_MAX_AMOUNT,
      };
    case 'sapphire':
      return {
        currency: 'NGN',
        interest: 13,
        penal: 3,
        minTenure: 12,
        maxTenure: AS_LONG_AS_POSSIBLE, // AN UNREALISTIC LARGE VALUE TO MARK UPPER LIMIT
        minAmount: DEFAULT_MIN_AMOUNT,
        maxAmount: DEFAULT_MAX_AMOUNT,
      };
    case 'ruby':
      return {
        currency: 'NGN',
        interest: 7,
        penal: 3,
        minTenure: 3,
        maxTenure: 11, // AN UNREALISTIC LARGE VALUE TO MARK UPPER LIMIT
        minAmount: DEFAULT_MIN_AMOUNT,
        maxAmount: DEFAULT_MAX_AMOUNT,
      };
    case 'wadiah':
      return {
        currency: 'NGN',
        interest: 0,
        penal: 0,
        minTenure: 3,
        maxTenure: 48,
        minAmount: DEFAULT_MIN_AMOUNT,
        maxAmount: DEFAULT_MAX_AMOUNT,
      };
    case 'casual':
      return {
        currency: 'NGN',
        interest: 8,
        penal: 0,
        minTenure: 1,
        maxTenure: 48,
        minAmount: DEFAULT_MIN_AMOUNT,
        maxAmount: DEFAULT_MAX_AMOUNT,
      };
    case 'emerald':
      return {
        currency: 'USD',
        interest: 2,
        penal: 6,
        minAmount: 1,
        maxAmount: 100000,
        minTenure: 6,
        maxTenure: AS_LONG_AS_POSSIBLE,
      };
  }
};

function getInvestmentsInfo(investmentType) {
  const plan = investmentType.toLowerCase();
  let details = {};
  let defaultOptions = {};

  function getTenureRange(start) {
    const startAt = start ? start : 3;
    return Array(270)
      .fill(0)
      .map((_, n) => n + startAt)
      .filter((n) => n % 3);
  }

  switch (plan) {
    case 'starter':
      defaultOptions = {
        interest: 10,
        allowedTenure: [
          3,
          6,
          9,
          12,
          15,
          18,
          21,
          24,
          27,
          30,
          33,
          36,
          39,
          42,
          45,
          48,
          51,
          54,
          57,
          60,
          63,
          66,
          69,
          72,
        ],
        slots: 300,
        volume: 75000000,
      };
      details = {
        id: 'str1',
        currency: 'NGN',
        plan: 'starter',
        options: [
          {
            ...defaultOptions,
            amount: 10000,
            id: 1,
          },
          {
            ...defaultOptions,
            amount: 20000,
            id: 2,
          },
          {
            ...defaultOptions,
            amount: 50000,
            id: 3,
          },
          {
            ...defaultOptions,
            amount: 100000,
            id: 4,
          },
        ],
      };
      break;
    case 'standard':
      defaultOptions = {
        interest: 12,
        allowedTenure: [
          6,
          9,
          12,
          15,
          18,
          21,
          24,
          27,
          30,
          33,
          36,
          39,
          42,
          45,
          48,
          51,
          54,
          57,
          60,
          63,
          66,
          69,
          72,
        ],
      };
      details = {
        id: 'std1',
        currency: 'NGN',
        plan: 'standard',
        options: [
          {
            ...defaultOptions,
            amount: 250000, //250,000
            id: 1,
            slots: 300,
            volume: 75000000,
          },
          {
            ...defaultOptions,
            amount: 500000,
            id: 2,
            slots: 250,
            volume: 125000000, // 75,000,000
          },
          {
            ...defaultOptions,
            amount: 750000,
            id: 3,
            slots: 199,
            volume: 149250000, // 149,250,000
          },
          {
            ...defaultOptions,
            amount: 1000000,
            id: 4,
            slots: 150,
            volume: 150000000, // 150,000,000
          },
        ],
      };
      break;
    case 'vip':
      defaultOptions = {
        interest: 14,
        allowedTenure: [
          3,
          6,
          9,
          12,
          15,
          18,
          21,
          24,
          27,
          30,
          33,
          36,
          39,
          42,
          45,
          48,
          51,
          54,
          57,
          60,
          63,
          66,
          69,
          72,
        ],
      };
      details = {
        id: 'vip1',
        currency: 'NGN',
        plan: 'vip',
        options: [
          {
            ...defaultOptions,
            amount: 1250000, //1,250,000
            id: 1,
            slots: 100,
            volume: 125000000, //125,000,000
          },
          {
            ...defaultOptions,
            amount: 1500000,
            id: 2,
            slots: 83,
            volume: 124500000, // 124,500,000
          },
          {
            ...defaultOptions,
            amount: 2000000,
            id: 3,
            slots: 75,
            volume: 131250000, // 131,250,000
          },
          {
            ...defaultOptions,
            amount: 3000000,
            id: 4,
            slots: 60,
            volume: 150000000, // 150,000,000
          },
        ],
      };
      break;
    case 'vvip':
      defaultOptions = {
        interest: 18,
        allowedTenure: [
          3,
          6,
          9,
          12,
          15,
          18,
          21,
          24,
          27,
          30,
          33,
          36,
          39,
          42,
          45,
          48,
          51,
          54,
          57,
          60,
          63,
          66,
          69,
          72,
        ],
      };
      details = {
        id: 'vvip',
        currency: 'NGN',
        plan: 'vvip',
        options: [
          {
            ...defaultOptions,
            amount: 1250000, //1,250,000
            id: 1,
            slots: 100,
            volume: 125000000, //125,000,000
          },
        ], //
      };
      break;
  }

  return details;
}

function getProjectedValue(principal, tenor, frequency, plan) {
  try {
    const target = getTarget(principal, tenor, frequency);
    const startDate = new Date();
    const endDate = dateUtil.addMonths(startDate, Number(tenor));
    const planInfo = getSavingsPlanInfo(plan);
    const interest = interestEarnings(
      target,
      planInfo.interest,
      startDate,
      endDate,
    );

    return target + interest;
  } catch (e) {
    return 0;
  }
}

const getValidator = (type) => {
  const containsOnlyNumbers = (value) => {
    try {
      if (typeof value === 'number') {
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
      if (typeof value === 'number') {
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
    if (!value || value === '') {
      return true;
    }
    return false;
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  if (type === 'string') {
    return {
      containsOnlyNumbers,
      containsSpecialCharacter,
      isEmpty,
      validateEmail,
    };
  }
};

async function uploadToCloud(file) {
  const data = new FormData();

  data.append('file', file);
  data.append('upload_preset', 'stashbox');
  data.append('cloud_name', 'innovate');
  const url = 'https://api.cloudinary.com/v1_1/innovate/upload';
  return requests.post(url, data);
}

const loans = {
  interest: {
    NYSC: {
      SAVER_RATE: 2.8, // Rate is you are a current saver on the platform
      RATE: 3,
    },
    PHARMACY: {
      SAVER_RATE: 2.8, // Rate is you are a current saver on the platform
      RATE: 2.5,
    },
  },
};

export default {
  uploadFileToFirebase,
  toCurrency,
  convertFromCurrency,
  displayToastMessage,
  capitalize,
  interestEarnings,
  generateReference,
  defaultToast,
  getSavingsPlanInfo,
  getValidator,
  getProjectedValue,
  getTarget,
  getInvestmentsInfo,
  handleImageUpload,
  uploadToCloud,
  pickSingleImage,
  loans,
};
