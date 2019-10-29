import React from "react";
import "./App.css";
import { ActiveHealerDropdowns } from "./components/active-healer-dropdowns";

import Select from "react-select";
import { createStore } from "redux";
import { temporalBoonReducers } from "./redux/reducers/temporal-boon-reducers";
import { Provider } from "react-redux";
import { BossDropdown } from "./components/boss-dropdown";
import { BossTable } from "./components/boss-table";
import { TimelineGrid } from "./components/timeline/timeline-grid";

const items = [
  { value: "Abyssal Commander Sivara", label: "Abyssal Commander Sivara" },
  { value: "Blackwater Behemoth", label: "Blackwater Behemoth" },
  { value: "Radiance of Azshara", label: "Radiance of Azshara" },
  { value: "Lady Ashvane", label: "Lady Ashvane" },
  { value: "Orgozoa", label: "Orgozoa" },
  { value: "Queens Court", label: "Queens Court" },
  { value: `Za'qul`, label: `Za'qul` },
  { value: "Queen Azshara", label: "Queen Azshara" }
];

const store = createStore(
  temporalBoonReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Select
          value={{ value: "The Eternal Palace", label: "The Eternal Palace" }}
          isDisabled
        />
        <BossDropdown options={items} />
        <BossTable />
        <ActiveHealerDropdowns />
        <TimelineGrid />
      </Provider>
    );
  }
}

export default App;
