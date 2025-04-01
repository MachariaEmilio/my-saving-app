import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/feature/detais.mjs"
export default configureStore({
  reducer: {
   userdetails:dataReducer
  },
});
