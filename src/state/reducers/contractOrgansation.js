import { SET_LATEST_CONTRACT } from "../types";

const INITIAL_STATE = {
  latest_contract: {},
};

const contractsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LATEST_CONTRACT:
      return { ...state, latest_contract: action.payload };

    default:
      return state;
  }
};

export default contractsReducer;
