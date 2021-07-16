import { IUser } from "../IUser";
import { fetchedUser, stateButtonActive, stateInput, userType } from "./types";

const initialState = {
  user: {
    password: "",
    email: "",
  },
  isActiveButton: false,
  fetchedUser: { message: "" },
  userTypes: "",
};

interface IAction {
  type: string;
  payload: any;
}
export const postUser = (state = initialState, action: IAction): IUser => {
  switch (action.type) {
    case stateInput:
      return { ...state, user: { ...state.user, ...action.payload } };
    case stateButtonActive:
      return { ...state, isActiveButton: action.payload };
    case fetchedUser:
      return { ...state, fetchedUser: { ...action.payload } };
    case userType:
      return { ...state, userTypes: action.payload };
    default:
      return state;
  }
};
