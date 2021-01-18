import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Template from "./Template/Template";
import Home from "./Home/Home";
import About from "./About/About";
import Topics from "./Topics/Topics";
import Upload from "./Upload/Upload";
import Review from "./Review/Review";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/topics" component={Topics} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/review" component={Review} />
        <Route exact path="/search" component={Home} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/topic" component={Home} />
        <Route exact path="/subtopic" component={Home} />

        <Redirect from="/home" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
