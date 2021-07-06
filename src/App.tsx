import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { CardPage } from "./components/CardPage/CardPage";
import { MainPage } from "./components/MainPage/MainPage";
import { Navigation } from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import { ICards } from "./ICards";
import "./Style.scss";
import { StatisticPage } from "./components/StatisticPage/StatisticPage";
import { cards, categoriesCards } from "./cards";
import { ILocalItem } from "./ILocalItem";

const App: React.FC = () => {
  const [game, listGame] = useState<boolean>(false);
  const [navState, listNav] = useState<string>();
  const [listCard, updateCard] = useState<ICards[]>();
  useEffect(() => {
    cards.forEach((categoriesItem, index) => {
      categoriesItem.forEach((cardsItem) => {
        if (!window.localStorage.getItem(cardsItem.word)) {
          const obj: ILocalItem = {
            category: categoriesCards[index],
            clicks: 0,
            correct: 0,
            perCent: "0.00",
            translation: cardsItem.translation,
            word: cardsItem.word,
            wrong: 0,
          };
          window.localStorage.setItem(cardsItem.word, JSON.stringify(obj));
        }
      });
    });
  });
  const updateCardItem = (item: ICards[]) => {
    updateCard(item);
  };
  function handleGame(title: boolean): void {
    listGame(title);
  }
  function handleNavRoute(title: string): void {
    listNav(title);
  }
  return (
    <BrowserRouter>
      <Navigation
        onAdd={handleGame}
        game={game}
        onAddState={handleNavRoute}
        navState={navState}
      />
      <div className="container">
        <Switch>
          <Route
            path="/"
            render={() => <MainPage game={game} onAdd={handleNavRoute} />}
            exact
          />
          <Route path="/statistic" component={StatisticPage} />
          <Route
            path="/cards/"
            render={() => (
              <CardPage
                onAddItem={updateCardItem}
                list={listCard}
                game={game}
              />
            )}
          />
          <Redirect from="/cards" to="/" />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
