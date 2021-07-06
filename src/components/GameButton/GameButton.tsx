import React from "react";
import { cards } from "../../cards";
import "./GameButton.scss";

const sortRandom = 0.5;
interface IGame {
  games: boolean;
  initGame(title: boolean): void;
  gamePage(title: number): void;
  page: number | undefined;
  audioSrc: number;
  changeAudio(title: number): void;
  arrSrc: string[];
  changeArr(title: string[]): void;
  removeClick(title: string[]): void;
  starsUpdate(title: number[]): void;
}
const GameButton: React.FC<IGame> = (props) => {
  const location = Number(window.location.hash.slice(1)) - 1;
  function startGame() {
    if (props.games && props.page === location) {
      const src = `../${props.arrSrc[props.audioSrc]}`;
      const audio = new Audio();
      audio.src = src;
      audio.currentTime = 0;
      audio.play();
    } else {
      props.initGame(true);
      props.gamePage(location);
      props.changeAudio(0);
      props.removeClick([]);
      props.starsUpdate([]);
      const arr = cards[location].map((item) => item.audioSrc).sort(() => Math.random() - sortRandom)
      props.changeArr(arr); 
      const src = `../${arr[0]}`;
      const audio = new Audio();
      audio.src = src;
      audio.currentTime = 0;
      audio.play();   
    }
  }
  return (
    <div
      className={
        !props.games || props.page !== location
          ? "game__button_click"
          : "game__button_click active"
      }
      onClick={startGame}
    >
      {!props.games || props.page !== location ? (
        <p className="game__text_button">Start Game</p>
      ) : (
        <img className="repeat__img" src="../img/repeat.svg" alt="repeat" />
      )}
    </div>
  );
};
export default GameButton;
