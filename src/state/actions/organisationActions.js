// import { getUrl, requests } from "../../globals/requests";
import { SET_ORGANISATION } from "../types";
import { requests, getUrl } from "../../globals/requests";

export const setOrganisation = (org) => {
  return {
    type: SET_ORGANISATION,
    payload: org,
  };
};

export const getCards = (userId, params) => {
  return async (dispatch) => {
    try {
      // dispatch({
      //   type: LOADING_CARDS,
      //   payload: true,
      // });
      const url = `${getUrl("organisations")}`;
      const response = await requests.getWithAuth(url, params);

      // dispatch({
      //   type: GET_CARDS,
      //   payload: response.data,
      // });
      // dispatch({
      //   type: LOADING_CARDS,
      //   payload: false,
      // });
      return response.data;
    } catch (e) {
      // dispatch({
      //   type: LOADING_CARDS,
      //   payload: false,
      // });
      throw e;
    }
  };
};
