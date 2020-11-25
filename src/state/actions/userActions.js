import { getUrl, requests } from "../../globals/requests";
import {
  SET_USER,
  SET_BVN_DATA,
  LOADING_BVN_DATA,
  FAILED_TO_GET_BVN_DATA,
} from "../types";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setBvnData = (bvn) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: LOADING_BVN_DATA,
        payload: true,
      });
      dispatch({
        type: FAILED_TO_GET_BVN_DATA,
        payload: false,
      });

      const baseUrl = getUrl("paystack_banks");

      requests
        .getWithAuth(`${baseUrl}/${bvn}/resolve`)
        .then((response) => {
          const bvnData = response.data;
          dispatch({
            type: SET_BVN_DATA,
            payload: bvnData,
          });
          dispatch({
            type: LOADING_BVN_DATA,
            payload: false,
          });
          resolve(bvnData);
        })
        .catch((err) => {
          dispatch({
            type: LOADING_BVN_DATA,
            payload: false,
          });
          dispatch({
            type: FAILED_TO_GET_BVN_DATA,
            payload: true,
          });
          reject(err);
        });

      // setTimeout(() => {
      //   dispatch({
      //     type: SET_BVN_DATA,
      //     payload: mocks.bvnData,
      //   });
      //   dispatch({
      //     type: LOADING_BVN_DATA,
      //     payload: false,
      //   });
      //   resolve(mocks.bvnData);
    });
  };
};

// export const getUser = (user) => {
//   return {
//     type: SET_USER,
//     payload: mocks.user,
//   };
// };
