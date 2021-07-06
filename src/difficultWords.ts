import { ICards } from "./ICards";
import { cardsItem } from "./cardsItem";
import { ILocalItem } from "./ILocalItem";

export function difficultWords(): ICards[] {
  const objCards: ILocalItem[] = [];
  const objReturn: ICards[] = [];
  cardsItem.forEach((item) => {
    if (!window.localStorage.getItem(item)) return;
    objCards.push(JSON.parse(window.localStorage.getItem(item) || ""));
  });
  const objFilter = objCards
    .filter((item) => item.perCent !== "0.00")
    .sort((a, b) => {
      if (a.perCent < b.perCent) {
        return 1;
      }
      return -1;
    })
    .slice(0, 8);
  objFilter.forEach((item) => {
    objReturn.push({
      word: item.word,
      translation: item.translation,
      image: `img/${item.word}.jpg`,
      audioSrc: `audio/${item.word}.mp3`,
    });
  });
  return objReturn;
}
