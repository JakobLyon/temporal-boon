import { combineReducers } from "redux";
import {
  healerTypes,
  healerSpells,
  timelineDataReducer
} from "./temporal-boon-reducers";

import selectedBossReducer from "./selected-boss/selected-boss";
import { selectedRaidReducer } from "./selected-raid/selected-raid";
import { activeHealersReducer } from "./active-healers/active-healers";
import { activeHealersByBossReducer } from "./active-healers-by-boss/active-healers-by-boss";
import { timelineDataIdsByBossReducer } from "./timeline-data-ids-by-boss/timeline-data-ids-by-boss";
import { castHealerSpellsReducer } from "./cast-healer-spells/cast-healer-spells";
import { isLoggedInReducer } from "./is-logged-in/is-logged-in";
import { bossesReducer } from "./bosses/bosses";
import { spellsReducer } from "./spells/spells";

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
