import React from "react";
import cards from "../../cards";
import "./CardPage.scss";

interface ICards {
  [key: string]: string;
}
const sortRandom = 0.5;
export const CardPage: React.FC = () => (
  <ul>
    {cards[Number(window.location.hash.slice(1))]
      .map((item, IndCard) => (
        <div className="word__card" key={IndCard}>
          <img src={`../${(item as ICards).image}`} alt="" />
          <p>{(item as ICards).word}</p>

        </div>
      ))
      .sort(() => Math.random() - sortRandom)}
  </ul>
);
