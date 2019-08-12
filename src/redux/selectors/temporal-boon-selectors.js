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

export const getHealerTypes = state => state.healerTypes;
export const getHealers = createSelector(
  [getHealerTypes],
  (healerTypes) => Object.keys(healerTypes)
);

export const getActiveHealers = state => state.activeHealers;
export const getActiveHealersAlphabetical = createSelector([getActiveHealers], activeHealers => _.sortBy(activeHealers, ['name']));

const getActiveHealersByBoss = state => state.activeHealersByBoss;

/*
  return: array
  [{
    name: 'Holy Paladin',
    id: 1
  }, ...]
*/
export const getActiveHealersForSelectedBoss = createSelector([selectedBoss, getActiveHealersByBoss, getActiveHealers],
  (boss, healersByBoss, healers) => {
    return healersByBoss[boss] 
      ? _.sortBy(healersByBoss[boss].map(healerId => healers[healerId]), ['name'])
      : [];
  }
);

const getTimelineData = state => state.timelineData;
const getTimelineDataIdsByBoss = state => state.timelineDataIdsByBoss;

export const getTimelineDataByBoss = createSelector(
  [selectedBoss, getTimelineData, getTimelineDataIdsByBoss],
  (selectedBoss, timelineData, timelineDataIdsByBoss) => {
    if (timelineDataIdsByBoss[selectedBoss]) {
      return _.sortBy(timelineDataIdsByBoss[selectedBoss].map(timelineDataId => timelineData[timelineDataId]), ['timing'])
    }
    return [];
  }
);

export const getLastTimingForCurrentBoss = createSelector(
  [getTimelineDataByBoss],
  timelineData =>{
    return timelineData.length !== 0
      ? timelineData[timelineData.length - 1].timing
      : -30}
)

export const getOptionsForHealerSpells = () => {};

export const makeGetOptionsForHealerSpells = () => {
  return createSelector(
    [],
    () => {

    }
  );
};

// param healers, used cds
// return cds
// [{value: 'water', label: 'water'}, {...}, ...]

export const getHealerSpells = state => state.healerSpells;

/*
Record of when healers cast their spells

{
  [id]: {
    healerId,
    spellId,
    timing
  },
  ...
}
*/
const getCastHealerSpells = state => state.castHealerSpells;

const getSpellsOffCooldown = (spells, timing, castSpells) => {
	return spells.filter(spell => timing - spell.cooldown >= getLatestCastTiming(spell, castSpells))
}

const getLatestCastTiming = (spell, castSpells, healerId) => {
	const latestSpell = _.sortBy(castSpells.filter(castSpell => castSpell.healerId === healerId && castSpell.spellId === spell.spellId), ['timing'])
	return latestSpell.length === 0 ? 0 : latestSpell.timing
}

export const makeGetOptionsForActiveHealerSpells = timing => {
  return createSelector(
  [
    getHealerSpells,
    getActiveHealersForSelectedBoss,
    getCastHealerSpells,
    getHealerTypes
  ],
  (healerSpells, activeHealers, castHealerSpells, healerTypes) => {

    debugger;
    const options = healerSpells.filter(spell => {
      if (!castHealerSpells[spell]) {
        return true;
      } else {
        const availableSpells = activeHealers.map(healer => {
          const spells = healerTypes[healer.name].spells.map(spell => {
            return {...healerSpells[spell]}}
          );
          return getSpellsOffCooldown(spells, timing, castHealerSpells, healer.healerId)
        })
    
        return _.uniq(_.flatten(availableSpells));
      }
    })

    return options;
  }
)};