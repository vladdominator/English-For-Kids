import { IButton, IForm, ILive } from "./redux/actions";

export interface ILocalUser {
  password?: string;
  email?: string;
}
export interface IFetchedUser {
  message: string;
}
export interface IUser {
  user?: ILocalUser;
  isActiveButton?: boolean;
  setButton?(title: boolean): IButton;
  setUser?(title: ILive): IForm;
  fetchedUser?: IFetchedUser;
  removeMessage?(): void;
  userTypes?: string;
}
export interface IState {
  user: IUser;
}
