import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersReducer";
import fragranceService from "./services/fragrances";
import fragranceReducer, { setFragrances } from "./reducers/fragranceReducer";
import registerReducer from "./reducers/registerReducer";
import loginReducer from "./reducers/loginReducer";

const store = configureStore({
  reducer: {
    users: usersReducer,
    fragrances: fragranceReducer,
    register: registerReducer,
    login: loginReducer,
  },
});

fragranceService.getAll().then((fragrances) => {
  store.dispatch(setFragrances(fragrances));
});

export default store;
