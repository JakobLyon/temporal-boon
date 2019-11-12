import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Banner } from "./components/banner";
import { Footer } from "./components/footer";
import PriestIcon from "./images/priest-icon.jpg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TemporalBoon } from "./components/temporal-boon";
import { HomeLogin } from "./components/pages/home-login";
import { store } from "./createStore";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Banner />
          <Switch>
            <Route exact path="/" component={HomeLogin} />
            <Route path="/cooldowns" component={TemporalBoon} />
          </Switch>
          <Footer
            image={PriestIcon}
            links={[
              { url: "www.wowhead.com", text: "Wowhead" },
              { url: "www.icy-veins.com", text: "Icy Veins" },
              { url: "www.google.com", text: "Google" }
            ]}
          />
        </Provider>
      </Router>
    );
  }
}

export default App;
