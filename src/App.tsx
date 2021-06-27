import React, { useState } from "react";
import { Router, Switch, Route } from "react-router";
import createHistory from "history/createBrowserHistory";
import { CardPage } from "./components/CardPage/CardPage";
import { MainPage } from "./components/MainPage/MainPage";
import { Navigation } from "./components/Navigation/Navigation";
import "./Style.scss";

const browserHistory = createHistory();
const App: React.FC = () => {
  const [game, listGame] = useState<boolean>(false);
  const [navState, listNav] = useState<string>();
  function handleGame(title: boolean): void {
    listGame(title);
  }
  function handleNavRoute(title: string): void {
    listNav(title);
  }
  return (
    <Router history={browserHistory}>
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
          <Route exact path="/cards/" component={CardPage} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
