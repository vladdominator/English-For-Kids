import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

interface INav {
  nav: boolean;
  game: boolean;
  navState: string | undefined;
  addRoute(title: string | undefined): void;
}
export const NavBar: React.FC<INav> = (props) => {
  const [nowElement, list] = useState<React.MouseEvent>();
  function changeRoute(event: React.MouseEvent): void {
    list(event);
  }
  useEffect(() => {
    if (props.navState) {
      document?.querySelectorAll(".navbar__element").forEach((item) => {
        if (item.textContent === props.navState) {
          item.classList.add("navbar__element-active");
          props.addRoute(undefined);
        } else {
          item.classList.remove("navbar__element-active");
        }
      });
    }
  });
  useEffect(() => {
    document?.querySelectorAll(".navbar__element").forEach((item) => {
      item.classList.remove("navbar__element-active");
    });
    if (nowElement)
      (nowElement?.target as HTMLElement).classList.add(
        "navbar__element-active"
      );
  }, [nowElement]);
  useEffect(() => {
    document
      ?.querySelectorAll(".navbar__element")
      [Number(window.location.hash.slice(1))]?.classList.add(
        "navbar__element-active"
      );
  }, []);
  return (
    <div
      className={
        props.nav
          ? `navigation ${
            props.game ? "navigation-game" : ""
          } navigation-active`
          : `navigation ${props.game ? "navigation-game" : ""}`
      }
    >
      <div className="navigation__container">
        <ul>
          <li>
            <NavLink to="/" className="navbar__element" onClick={changeRoute}>
              Main Page
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cards/#1"
              className="navbar__element"
              onClick={changeRoute}
            >
              Action (set A)
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cards/#2"
              className="navbar__element"
              onClick={changeRoute}
            >
              Action (set B)
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cards/#3"
              className="navbar__element"
              onClick={changeRoute}
            >
              Animal (set A)
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cards/#4"
              className="navbar__element"
              onClick={changeRoute}
            >
              Animal (set B)
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cards/#5"
              className="navbar__element"
              onClick={changeRoute}
            >
              Clothes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cards/#6"
              className="navbar__element"
              onClick={changeRoute}
            >
              Emotions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cards/#7"
              className="navbar__element"
              onClick={changeRoute}
            >
              Nature
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
