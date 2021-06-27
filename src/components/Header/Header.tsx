import React from "react";
import "./Header.scss";

interface NavProps {
  onAdd(title: boolean): void;
  for: boolean;
  onAddGame(title: boolean): void;
}
const Header: React.FC<NavProps> = (props) => {
  function handleNavBar() {
    props.onAdd(!props.for);
  }
  function changeGame(e: React.ChangeEvent<HTMLInputElement>) {
    props.onAddGame(e.target.checked);
  }
  return (
    <header className="header">
      <div className="container__header">
        <div
          onClick={handleNavBar}
          className={props.for ? "hamburger hamburger-active" : "hamburger"}
        >
          <div
            className={
              props.for
                ? "hamburger__container hamburger__container-active"
                : "hamburger__container"
            }
          >
            <span></span>
          </div>
        </div>
        <h1 className="logo__name">English for kids</h1>
        <label className="switch__game">
          <input
            onChange={changeGame}
            type="checkbox"
            className="switch__input"
          />
          <span className="switch__slider switch__slider-rounded"></span>
          <span
            className="switch__game-modification"
            data-on="Play"
            data-off="Train"
          ></span>
        </label>
      </div>
    </header>
  );
};
export { Header };
