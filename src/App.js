import React from "react";
import TopQuestions from "./components/TopQuestions";
import User from "./components/User";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact={true} component={TopQuestions} />
            <Route path="/user/:id" exact={true} component={User} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
