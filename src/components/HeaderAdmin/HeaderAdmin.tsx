import React, { useState, useEffect } from "react";
import "./HeaderAdmin.scss";
import { NavLink, useHistory } from "react-router-dom";
import { api } from "../../api";

interface IHeader {
  changeUser(title: string): void;
  setStateApi(title: string): void;
}
const HeaderAdmin: React.FC<IHeader> = (props) => {
  const history = useHistory();
  const [aps, setApi] = useState<string>();
  useEffect(() => {
    fetch(`${api}/category`)
      .then((res) => res.json())
      .then((res) => {
        setApi(`/AdminCards/${res[0].name}/words`);
        props.setStateApi(res[0].name);
      });
  }, []);
  function removeAdmin() {
    localStorage.removeItem("admin");
    setTimeout(() => {
      props.changeUser("");
      history.push("/");
    }, 500);
  }

  function stateEvent() {
    fetch(`${api}/category`)
      .then((res) => res.json())
      .then((res) => {
        setApi(`/AdminCards/${res[0].name}/words`);
        history.push(`/AdminCards/${res[0].name}/words`);
        props.setStateApi(res[0].name);
      });
  }
  return (
    <header className="header__admin">
      <div className="container">
        <ul>
          <li>
            <NavLink exact activeClassName="active__panel" to="/">
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to={aps ? aps : "/"}
              activeClassName="active__panel"
              onClick={stateEvent}
            >
              Words
            </NavLink>
          </li>
        </ul>
        <div className="logOut__admin" onClick={removeAdmin}>
          <p>Log out</p>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
