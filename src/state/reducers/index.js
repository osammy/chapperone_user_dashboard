import { combineReducers } from "redux";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import { persistConfig } from "../../store";
import userReducer from "./userReducer";
import organisationsReducer from "./organisationsReducer";

const persistConfig = {
  key: "peristPayload",
  storage: storage,
  whitelist: ["organisation"], // which reducer want to store
};

export default persistCombineReducers(persistConfig, {
  userReducer,
  organisationsReducer,
});
