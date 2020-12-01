import { getUrl, requests } from "../../globals/requests";
import { SET_LATEST_CONTRACT } from "../types";

export const setLatestContract = (contract) => {
  return {
    type: SET_LATEST_CONTRACT,
    payload: contract,
  };
};

export const getLatestContract = (organisationId) => {
  return async (dispatch) => {
    try {
      // dispatch({
      //   type: LOADING_CARDS,
      //   payload: true,
      // });
      const url = `${getUrl(
        "contracts"
      )}/organisations/${organisationId}/latest`;
      const response = await requests.getWithAuth(url);

      dispatch({
        type: SET_LATEST_CONTRACT,
        payload: response.data,
      });

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
