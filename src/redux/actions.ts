import { Dispatch } from "react";
import { api } from "../api";
import { fetchedUser, stateButtonActive, stateInput, userType } from "./types";

interface ILocalUser {
  password: string | undefined;
  email: string | undefined;
}
export interface ILive {
  input: string;
  name: string;
}
interface ILiveReturn {
  [x: string]: string;
}
export interface IForm {
  type: string;
  payload: ILiveReturn;
}
export interface IButton {
  type: string;
  payload: boolean;
}
interface IMessage {
  message: string;
}
interface Liked {
  type: string;
  payload: IMessage;
}
export function setUser(form: ILive): IForm {
  return {
    type: stateInput,
    payload: { [form.name]: form.input },
  };
}

export function setButton(post: boolean): IButton {
  return {
    type: stateButtonActive,
    payload: post,
  };
}

export function fetchUsers(path: string, body: ILocalUser) {
  return async (dispatch: Dispatch<Liked>): Promise<void> => {
    const response = await fetch(`${api}/api/auth/${path}`, {
      method: "Post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    dispatch({ type: fetchedUser, payload: json });
  };
}
interface IUserType {
  type: string;
  payload: string;
}
export function removeMessage(path: string, body: ILocalUser) {
  return {
    type: fetchedUser,
    payload: { message: "" },
  };
}
export function setUserTypes(post: string): IUserType {
  return {
    type: userType,
    payload: post,
  };
}
