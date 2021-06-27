import React from "react";
import "./MainPage.scss";
import { NavLink } from "react-router-dom";
import cards from "../../cards";

interface ICards {
  image: string;
}
interface IGame {
  game: boolean;
  onAdd(title: string | null | undefined): void;
}

export const MainPage: React.FC<IGame> = (props) => {
  function changeRoute(event: React.MouseEvent): void {
    props.onAdd(
      (event.target as HTMLElement)?.querySelector(".main__text")
        ?.textContent ||
        (event.target as HTMLElement)?.nextElementSibling?.textContent ||
        (event.target as HTMLElement)?.textContent
    );
  }
  return (
    <ul className="main__elements">
      {cards[0].map((element, index) => (
        <NavLink
          onClick={changeRoute}
          to={index !== undefined ? `/cards/#${index + 1}` : ""}
          key={index}
        >
          <li
            className={
              props.game
                ? "main__element main__element-active"
                : "main__element"
            }
          >
            <img
              className="main__img"
              src={(cards[index + 1][6] as ICards).image}
              alt=""
            />
            <p className="main__text">{element}</p>
          </li>
        </NavLink>
      ))}
    </ul>
  );
};
