import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { cards } from "../../cards";
import { ILocalItem } from "../../ILocalItem";
import "./StatisticPage.scss";
import { difficultWords } from "../../difficultWords";

const noReturnObj = 8;
const sortDefault = 1;
const sortNoDefault = -1;
export const StatisticPage: React.FC = () => {
  const [infoCards, changeInfoCards] = useState<ILocalItem[]>([]);
  const [sort, changeSortItem] = useState<string>("word");
  const [sortBy, changeSortBy] = useState<boolean>(false);
  useEffect(() => {
    const objCards: ILocalItem[] = [];
    cards.forEach((categoriesItem, index) => {
      if (index !== noReturnObj) {
        categoriesItem.forEach((cardsItem) => {
          objCards.push(
            JSON.parse(window.localStorage.getItem(cardsItem.word) || "")
          );
        });
      }
    });
    if (
      sort === "word" ||
      sort === "perCent" ||
      sort === "translation" ||
      sort === "wrong" ||
      sort === "correct" ||
      sort === "clicks" ||
      sort === "category"
    )
      changeInfoCards(objCards);
  }, []);
  function changeSort(str: string) {
    if (str === sort) {
      changeSortBy(!sortBy);
    }
    changeSortItem(str);
  }
  function resetChange() {
    const objItem = infoCards.map((item) => {
      const obj: ILocalItem = {
        category: item.category,
        clicks: 0,
        correct: 0,
        perCent: "0.00",
        translation: item.translation,
        word: item.word,
        wrong: 0,
      };
      window.localStorage.setItem(item.word, JSON.stringify(obj));
      return obj;
    });
    changeInfoCards(objItem);
  }
  function changeRepeat() {
    cards[noReturnObj] = difficultWords();
  }
  return (
    <div className="statistic__container">
      <div className="statistic__buttons">
        <NavLink to="/cards/#9">
          <button onClick={changeRepeat} className="statistic__repeat">
            Repeat difficult words
          </button>
        </NavLink>
        <button className="statistic__reset" onClick={resetChange}>
          Reset
        </button>
      </div>
      <table className="statistic__layer">
        <caption className="statistic__text">Statistic</caption>
        <thead>
          <tr className="table__row" id="category__trap">
            <td className="sort__category" onClick={() => changeSort("word")}>
              <span
                className={
                  sort === "word" ? "sort__symbol" : "sort__symbol_disable"
                }
              >
                {sortBy ? "🠡" : "🠗"}
              </span>
              Word
            </td>
            <td
              className="sort__category"
              onClick={() => changeSort("translation")}
            >
              <span
                className={
                  sort === "translation"
                    ? "sort__symbol"
                    : "sort__symbol_disable"
                }
              >
                {sortBy ? "🠡" : "🠗"}
              </span>
              Translation
            </td>
            <td
              className="sort__category"
              onClick={() => changeSort("category")}
            >
              <span
                className={
                  sort === "category" ? "sort__symbol" : "sort__symbol_disable"
                }
              >
                {sortBy ? "🠡" : "🠗"}
              </span>
              Category
            </td>
            <td className="sort__category" onClick={() => changeSort("clicks")}>
              <span
                className={
                  sort === "clicks" ? "sort__symbol" : "sort__symbol_disable"
                }
              >
                {sortBy ? "🠗" : "🠡"}
              </span>
              Clicks
            </td>
            <td
              className="sort__category"
              onClick={() => changeSort("correct")}
            >
              <span
                className={
                  sort === "correct" ? "sort__symbol" : "sort__symbol_disable"
                }
              >
                {sortBy ? "🠗" : "🠡"}
              </span>
              Correct
            </td>
            <td className="sort__category" onClick={() => changeSort("wrong")}>
              <span
                className={
                  sort === "wrong" ? "sort__symbol" : "sort__symbol_disable"
                }
              >
                {sortBy ? "🠗" : "🠡"}
              </span>
              Wrong
            </td>
            <td
              className="sort__category"
              onClick={() => changeSort("perCent")}
            >
              <span
                className={
                  sort === "perCent" ? "sort__symbol" : "sort__symbol_disable"
                }
              >
                {sortBy ? "🠗" : "🠡"}
              </span>
              Errors, %
            </td>
          </tr>
        </thead>
        <tbody>
          {infoCards
            .sort((a, b) => {
              if (
                sort === "word" ||
                sort === "perCent" ||
                sort === "translation" ||
                sort === "wrong" ||
                sort === "correct" ||
                sort === "clicks" ||
                sort === "category"
              ) {
                if (!sortBy) {
                  if (a[sort] < b[sort]) {
                    return sortDefault;
                  }
                  return sortNoDefault;
                }
                if (a[sort] > b[sort]) {
                  return sortDefault;
                }
                return sortNoDefault;
              }
              return sortDefault;
            })
            .map((item, index) => (
              <tr key={index} className="table__row">
                <td>{item.word}</td>
                <td>{item.translation}</td>
                <td>{item.category}</td>
                <td>{item.clicks}</td>
                <td>{item.correct}</td>
                <td>{item.wrong}</td>
                <td>{item.perCent}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
