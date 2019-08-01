import { createSelector } from 'reselect';
import _ from 'lodash';

export const selectedRaid = state => state.selectedRaid;
export const selectedBoss = state => state.selectedBoss;
const getBosses = state => state.bosses;
const getSpells = state => state.spells;

export const getSpellsByBoss = createSelector([selectedBoss, getBosses, getSpells], (selectedBoss, bosses, spells) => {
  if (!bosses[selectedBoss]) {
    return [];
  }
  return Object.values(spells).filter(spell => bosses[selectedBoss].spells.includes(spell.name))
});

export const getHealers = state => state.healers;

export const getActiveHealers = state => state.activeHealers;
export const getActiveHealersAlphabetical = createSelector([getActiveHealers], activeHealers => _.sortBy(activeHealers, ['type']));

const getActiveHealersByBoss = state => state.activeHealersByBoss;
export const getActiveHealersForSelectedBoss = createSelector([selectedBoss, getActiveHealersByBoss, getActiveHealers],
  (boss, healersByBoss, healers) => {
    return healersByBoss[boss] 
      ? _.sortBy(healersByBoss[boss].map(healerId => healers[healerId]), ['type'])
      : [];
  }
);

const getTimelineData = state => state.timelineData;
const getTimelineDataIdsByBoss = state => state.timelineDataIdsByBoss;
export const getTimelineDataByBoss = createSelector(
  [selectedBoss, getTimelineData, getTimelineDataIdsByBoss],
  (selectedBoss, timelineData, timelineDataIdsByBoss) => {
    if (timelineDataIdsByBoss[selectedBoss]) {
      return timelineDataIdsByBoss[selectedBoss].map(timelineDataId => timelineData[timelineDataId])
    }
    return [];
  }
)


// param healers, used cds
// return cds
// [{value: 'water', label: 'water'}, {...}, ...]

// healers.cds
export const getAvailableCDs = createSelector([getActiveHealers],
  (activeHealers) => {

  }
  );