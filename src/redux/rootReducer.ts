import { combineReducers } from "redux";
import { postUser } from "./postUser";

export const rootReducer = combineReducers({
  user: postUser 
})