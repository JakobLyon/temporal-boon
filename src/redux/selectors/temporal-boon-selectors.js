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

// param healers, used cds
// return cds
// [{value: 'water', label: 'water'}, {...}, ...]

// healers.cds
export const getAvailableCDs = createSelector([getActiveHealers],
  (activeHealers) => {

  }
  );