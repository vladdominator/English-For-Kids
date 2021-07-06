import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { cards } from "../../cards";
import { ICards } from "../../ICards";
import { ILocalItem } from "../../ILocalItem";
import GameButton from "../GameButton/GameButton";
import "./CardPage.scss";

const sortRandom = 0.5;
interface ICardItem {
  onAddItem(item: ICards[]): void;
  list: ICards[] | undefined;
  game: boolean
}
export const CardPage: React.FC<ICardItem> = (props) => {
  const history = useHistory();
  const [games, initGame] = useState<boolean>(false);
  const [page, gamePage] = useState<number>();
  const [audioSrc, changeAudio] = useState<number>(0);
  const [image, removeClick] = useState<string[]>([]);
  const [stars, starsUpdate] = useState<number[]>([]);
  const [endGame, changeGame] = useState<boolean>(true);
  const location = Number(window.location.hash.slice(1)) - 1;
  function changeSoundAnswer(srcAudio: string) {
    const audio = new Audio();
    audio.src = srcAudio;
    audio.currentTime = 0;
    audio.play(); 
  }
  const [arrSrc, changeArr] = useState<string[]>(cards[location].map((item) => item.audioSrc));
  useEffect(() => {
    if(location > 8) throw new Error('nono');
    if (props.game)   {
      props.onAddItem(cards[location]);
    }  else  {
      props.onAddItem(cards[location].sort(() => Math.random() - sortRandom));
      initGame(false);
      changeArr(arrSrc.sort(() => Math.random() - sortRandom));
      gamePage(location);
      changeAudio(0);
    }
  })
  function rotateChange(event: React.MouseEvent<HTMLElement>) {
    (
      event.target as HTMLElement
    ).parentElement?.parentElement?.parentElement?.classList.add("flipped");
  }
  function changeSound(event: React.MouseEvent<HTMLDivElement>) {
    if(games && location === page) {
      const sourseImageCard = arrSrc[audioSrc].replace('audio/','').replace('.mp3', '').trim();
      const objCards: ILocalItem = JSON.parse(window.localStorage.getItem(sourseImageCard) || '');
      if (sourseImageCard === (event.target as HTMLElement).id 
        && !image.includes((event.target as HTMLElement).id)) {
        changeSoundAnswer(`../audio/correct.mp3`);
        starsUpdate([...stars, 1]);
        removeClick([...image, (event.target as HTMLElement).id]);
        if (objCards.correct !== undefined && objCards.word !== undefined) {
          objCards.correct++;
          window.localStorage.setItem(objCards.word, JSON.stringify(objCards));
        }
        if (audioSrc > cards[location].length - 2) {
          new Promise((res) => {
            window.setTimeout(() => {
              changeGame(false);
              if (stars.includes(0)) {
                changeSoundAnswer(`../audio/failure.mp3`);
              } else {
                changeSoundAnswer(`../audio/success.mp3`);
              }
              res(456);
            }, 1000)
          }).then(() => {
            window.setTimeout(() => {
              changeGame(true);
              document
                ?.querySelectorAll(".navbar__element")[0]
                ?.classList.add("navbar__element-active");
              history.push("/");
            }, 3000)
          })
        } else {
          window.setTimeout(() => {
            changeAudio(audioSrc + 1);
            changeSoundAnswer(`../${arrSrc[audioSrc + 1]}`);
          } , 500);
        }
      } else {
        changeSoundAnswer(`../audio/error.mp3`); 
        starsUpdate([...stars, 0]);
        if (objCards.wrong !== undefined && objCards.word !== undefined) {
          objCards.wrong++;
          window.localStorage.setItem(objCards.word, JSON.stringify(objCards));
        }
      }
      if (objCards.perCent !== undefined && objCards.word !== undefined && 
        objCards.correct !== undefined && objCards.wrong !== undefined) {
        if (objCards.wrong !== 0) {
          objCards.perCent = String((100 * objCards.wrong / (objCards.correct + objCards.wrong)).toFixed(2));
        } else {
          objCards.perCent = '0.00';
        }
        window.localStorage.setItem(objCards.word, JSON.stringify(objCards));
      }
    }
    else if(!props.game) {
      if (!(event.target as HTMLElement).id) return;
      changeSoundAnswer(`../audio/${(event.target as HTMLElement).id}.mp3`);
      const objCards: ILocalItem = JSON.parse(window.localStorage.getItem((event.target as HTMLElement).id) || '');
      if (objCards.clicks !== undefined && objCards.word !== undefined) {
        objCards.clicks++;
        window.localStorage.setItem(objCards.word, JSON.stringify(objCards));
      }
    }
  }
  const mouseDown = () => {
    const cardsItem = document.querySelectorAll('.card');
    cardsItem.forEach((item) => {
      item.classList.remove('flipped'); 
    })
  }
  return (
    <div className={endGame ? "cards__page" : "cards__page_disable"}>
      {!endGame ? <div>
        {stars.includes(0) ? <div>
          <p className="errors__count">Errors: {stars.filter(x => x === 0).length}</p>
          <img className="img__after_game" src="../img/failure.jpg" alt="smile" />
        </div> : 
          <div>
            <p className="wins">Win!</p>
            <img className="img__after_game" src="../img/success.jpg" alt="smile" />
          </div>
        }
      </div>: ''}
      <div className={games && location === page ? "stars__container" : "stars__container_disable"}>
        {
          stars.map((item, indStars) => (
            <div key={indStars}>
              <img src={item ? "../img/star-win.svg" : "../img/star.svg"} alt="star" />
            </div>
          ))
        }
      </div>
      <ul className="cards__words">
        {props.list ? props.list
          .map((item: ICards, IndCard: number) => (
            <div className={image.includes(item.word) && props.game ? `word__card inactive`: `word__card`} 
              key={IndCard} onClick={changeSound} onMouseLeave={mouseDown}>
              <div className="card">
                <div className="card__front" id={item.word}>
                  <img
                    className={props.game ? "card__front_img active" : "card__front_img"}
                    src={`../${(item as ICards).image}`}
                    id={item.word}
                    alt={(item as ICards).word}
                  />
                  <div className= {props.game ? "page__front_disable" : "page__front"} id={item.word}>
                    <p className="word__english" id={item.word}>
                      {(item as ICards).word}
                    </p>
                    <img
                      className="rotate__card"
                      onClick={rotateChange}
                      src="../img/rotate.svg"
                      alt="rotate"
                    />
                  </div>
                </div>
                <div className="card__back">
                  <img
                    className="card__back_img"
                    src={`../${(item as ICards).image}`}
                    alt={(item as ICards).word}
                  />
                  <p className="word__translation">{(item as ICards).translation}</p>
                </div>
              </div>
            </div>
          )): ''}
      </ul>
      {props.game ? <GameButton games={games} initGame={initGame} arrSrc={arrSrc} changeArr={changeArr} 
        removeClick={removeClick} starsUpdate={starsUpdate}
        gamePage={gamePage} page={page} audioSrc= {audioSrc} changeAudio={ changeAudio } /> : ''}
    </div>
  );
};
