import { combineReducers } from "redux";
import {
  bossesReducer,
  spellsReducer,
  healerTypes,
  healerSpells,
  activeHealersByBossReducer,
  timelineDataIdsByBossReducer,
  timelineDataReducer,
  castHealerSpellsReducer,
  isLoggedInReducer
} from "./temporal-boon-reducers";

import selectedBossReducer from "./selected-boss/selected-boss";
import { selectedRaidReducer } from "./selected-raid/selected-raid";
import { activeHealersReducer } from "./active-healers/active-healers";

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
