import { createStore, combineReducers, applyMiddleware } from "redux";
import { createForms } from "react-redux-form";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { InitialFeedback } from "./forms";
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Promotions } from "./promotions";
import { Leaders } from "./leaders";
import { Favorites } from "./favorites";

import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const config = {
  key: 'root',
  storage,
  debug: true
}


export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
        dishes: Dishes,
        comments: Comments,
        promotions: Promotions,
        leaders: Leaders,
        favorites:Favorites
    }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store)

  return { persistor, store };
};