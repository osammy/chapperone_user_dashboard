import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

import ReduxThunk from "redux-thunk";
import reducers from "./state/reducers";

const persistConfig = {
  key: "peristPayload",
  storage: storage,
  whitelist: ["organisation", "latest_contract"], // which reducer want to store
};
const rootReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk, logger))
);

const persistor = persistStore(store);

export { store, persistor };
