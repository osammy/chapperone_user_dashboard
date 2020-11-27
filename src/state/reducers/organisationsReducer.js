import { SET_ORGANISATION } from "../types";

const INITIAL_STATE = {
  organisation: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ORGANISATION:
      return { ...state, organisation: action.payload };

    default:
      return state;
  }
};

export default userReducer;
