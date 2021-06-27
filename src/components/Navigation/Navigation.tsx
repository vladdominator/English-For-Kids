import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { NavBar } from "../NavBar/NavBar";

interface IForce {
  game: boolean;
  onAdd(title: boolean): void;
  onAddState(title: string): void;
  navState: string | undefined;
}
export const Navigation: React.FC<IForce> = (props) => {
  const [nav, list] = useState<boolean>(false);
  function handleNav(title: boolean): void {
    list(title);
  }
  function handleGame(title: boolean): void {
    props.onAdd(title);
  }
  function handleNavRoute(title: string): void {
    props.onAddState(title);
  }
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      const { target } = e;
      if (
        (!(target as HTMLElement).closest(".navigation") &&
          !(target as HTMLElement).closest(".hamburger")) ||
        (target as HTMLElement).closest(".navbar__element")
      ) {
        handleNav(false);
      }
    });
  });
  return (
    <>
      <Header onAdd={handleNav} for={nav} onAddGame={handleGame} />
      <NavBar
        nav={nav}
        game={props.game}
        navState={props.navState}
        addRoute={handleNavRoute}
      />
    </>
  );
};
