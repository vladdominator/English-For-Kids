import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { IFetchedUser, ILocalUser, IState, IUser } from "../../IUser";
import {
  setButton,
  setUser,
  fetchUsers,
  setUserTypes,
  IButton,
  IForm,
  ILive,
  removeMessage,
} from "../../redux/actions";
import "./UserModal.scss";

interface IUserLive {
  changeUser(title: string): void;
  user?: ILocalUser;
  isActiveButton?: boolean;
  setButton?(title: boolean): IButton;
  setUser?(title: ILive): IForm;
  fetchedUser?: IFetchedUser;
  userTypes?: string;
  removeMessage?(): void;
}
function instanceOfA(object: IUser): object is IUserLive {
  return "changeUser" in object;
}
const UserModal: React.FC<IUser | IUserLive> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  let message = useSelector(
    (state: IState) => state?.user?.fetchedUser?.message
  );
  setTimeout(() => {
    if (message === "admin") {
      if (instanceOfA(props) && props.changeUser) props.changeUser("admin");
      history.push("/");
      if (props.removeMessage) props.removeMessage();
      window.localStorage.setItem(
        "admin",
        JSON.stringify({ email: "admin", password: "admin" })
      );
    }
  }, 1000);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        !(e.target as HTMLElement).closest(".popup__content") &&
        !(e.target as HTMLElement).closest(".button__user")
      ) {
        if (props.setButton) props.setButton(false);
      }
    });
  }, []);
  function changeClick(): void {
    if (props.setButton) props.setButton(false);
  }
  function changeUserInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (props.setUser)
      props.setUser({
        name: (e.target as HTMLInputElement).name,
        input: (e.target as HTMLInputElement).value,
      });
  }
  function userRegistration(e: React.MouseEvent<HTMLElement>): void {
    const path = (e.target as HTMLButtonElement).name;
    dispatch(
      fetchUsers(path, {
        email: props.user?.email,
        password: props.user?.password,
      })
    );
  }
  return (
    <div
      className={
        props.isActiveButton ? "popup__user popup__user_active" : "popup__user"
      }
    >
      <div className="popup__body">
        <div className="popup__content">
          <div className="krest" onClick={changeClick}>
            ×
          </div>
          <p className="registration__text">
            Registration <span>(admin panel: admin, admin)</span>
          </p>
          <input
            className="user__email"
            type="text"
            name="email"
            placeholder="login"
            onChange={changeUserInput}
          />
          <input
            className="user__password"
            type="text"
            name="password"
            placeholder="password"
            onChange={changeUserInput}
          />
          <p className="message__user">{message}</p>
          <div className="buttons__content">
            <button
              name="register"
              className="registration__button"
              onClick={userRegistration}
            >
              Registration
            </button>
            <button
              name="login"
              className="login__button"
              onClick={userRegistration}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state: IState) {
  return state.user;
}
const mapDispatchToProps = {
  setButton,
  setUser,
  setUserTypes,
  removeMessage,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
