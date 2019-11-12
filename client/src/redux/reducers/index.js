import { combineReducers } from "redux";
import {
  selectedRaidReducer,
  bossesReducer,
  spellsReducer,
  healerTypes,
  healerSpells,
  activeHealersByBossReducer,
  activeHealersReducer,
  timelineDataIdsByBossReducer,
  timelineDataReducer,
  castHealerSpellsReducer,
  isLoggedInReducer
} from "./temporal-boon-reducers";

import selectedBossReducer from "./selected-boss";

export default combineReducers({
  selectedRaid: selectedRaidReducer,
  selectedBoss: selectedBossReducer,
  bosses: bossesReducer,
  spells: spellsReducer,
  healerTypes: () => healerTypes,
  healerSpells: () => healerSpells,
  activeHealers: activeHealersReducer,
  activeHealersByBoss: activeHealersByBossReducer,
  timelineDataIdsByBoss: timelineDataIdsByBossReducer,
  timelineData: timelineDataReducer,
  castHealerSpells: castHealerSpellsReducer,
  isLoggedIn: isLoggedInReducer
});
