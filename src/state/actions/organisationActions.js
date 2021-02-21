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

      const response = await requests.getWithAuth(url, query);
      console.log(query);

      console.log("response.data === ");
      console.log(response.data);

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

export const getUserOrganisationById = (id) => {
  return async (dispatch) => {
    try {
      const url = `${getUrl("organisations")}/${id}`;

      const response = await requests.getWithAuth(url);

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
