import React from "react";
import "./App.css";

import { createStore } from "redux";
import { temporalBoonReducers } from "./redux/reducers/temporal-boon-reducers";
import { Provider } from "react-redux";

import { Banner } from "./components/banner";
import { Footer } from "./components/footer";
import PriestIcon from "./images/priest-icon.jpg";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { TemporalBoon } from "./components/temporal-boon";
import { Login } from "./components/login";

const store = createStore(
  temporalBoonReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Banner />
          <Route exact path="/cooldowns" component={TemporalBoon} />
          <Route path="/" component={Login} />
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
