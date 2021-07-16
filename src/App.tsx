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
import UserModal from "./components/UserModal/UserModal";
import HeaderAdmin from "./components/HeaderAdmin/HeaderAdmin";
import CategoryCards from "./components/CategoryCards/CategoryCards";
import CardsAdminPanel from "./components/CardsAdminPanel/CardsAdminPanel";

const endsCount = 8;
const App: React.FC = () => {
  const [game, listGame] = useState<boolean>(false);
  const [navState, listNav] = useState<string>();
  const [listCard, updateCard] = useState<ICards[]>();
  const [user, changeUser] = useState<string>("");
  const [stateApi, setStateApi] = useState<string>("");
  useEffect(() => {
    if (window.localStorage.getItem("admin")) {
      changeUser("admin");
    }
  }, []);
  useEffect(() => {
    cards.forEach((categoriesItem, index) => {
      if (index !== endsCount) {
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
      }
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
      {user !== "admin" ? (
        <>
          <UserModal changeUser={changeUser} />
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
              HeaderAdmin
              <Redirect from="/cards" to="/" />
            </Switch>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <HeaderAdmin changeUser={changeUser} setStateApi={setStateApi}/>
          <Route path="/AdminCards" render={() => <CardsAdminPanel stateApi={stateApi} />} />
          <Route path="/" render={() => <CategoryCards setStateApi={setStateApi} />} exact />
        </>
      )}
    </BrowserRouter>
  );
};
export default App;
