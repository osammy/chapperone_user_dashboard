// import { getUrl, requests } from "../../globals/requests";
import { SET_ORGANISATION } from "../types";
import { requests, getUrl } from "../../globals/requests";

export const setOrganisation = (org) => {
  return {
    type: SET_ORGANISATION,
    payload: org,
  };
};

export const getUserOrganisation = (userId) => {
  return async (dispatch) => {
    try {
      const url = `${getUrl("organisations")}/query`;
      const query = {
        "admins.userId": userId,
      };
      console.log(url);
      const response = await requests.getWithAuth(url, query);

      dispatch({
        type: SET_ORGANISATION,
        payload: response.data,
      });

      return response.data;
    } catch (e) {
      throw e;
    }
  };
};
