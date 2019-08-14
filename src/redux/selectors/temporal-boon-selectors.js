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

const getTimingByRowId = (state, props) => state.timelineData[props.rowId].timing;

export const getLastTimingForCurrentBoss = createSelector(
  [getTimelineDataByBoss],
  timelineData =>{
    return timelineData.length !== 0
      ? timelineData[timelineData.length - 1].timing
      : -30}
)

// param healers, used cds
// return cds
// [{value: 'water', label: 'water'}, {...}, ...]

export const getHealerSpells = state => state.healerSpells;

const getActiveHealersWithSpells = createSelector(
  [getActiveHealers, getHealerSpells, getHealerTypes],
  (activeHealers, spells, healerTypes) => {
    return Object.values(activeHealers).map(activeHealer => ({
      ...activeHealer,
      spells: [
        ...healerTypes[activeHealer.name].spells.map(spell => spells[spell])
      ]
    })).reduce((acc, cur) => {
      return {
        ...acc,
        [cur.id]: {
          ...cur
        }
      }
    }, {})}
)

/*
  return: array
  [{
    name: 'Holy Paladin',
    id: 1,
    spells: [{name: 'Wings', id: 1, cooldown: 1}]
  }, ...]
*/
export const getActiveHealersForSelectedBoss =
  createSelector([selectedBoss, getActiveHealersByBoss, getActiveHealersWithSpells],
  (boss, healersByBoss, healers) => {
    return healersByBoss[boss] 
      ? _.sortBy(healersByBoss[boss].map(healerId => healers[healerId]), ['name'])
      : [];
  }
);

// returns only healer spells for active healers
export const getHealerSpellsForActiveHealers = createSelector(
  [getHealerSpells, getActiveHealers, getHealerTypes],
  (healerSpells, activeHealers, healerTypes) => {
    return _.flatten(Object.values(activeHealers).map(healer => healerTypes[healer.name].spells.map(spell => healerSpells[spell])));
  }
)

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
const getCastHealerSpellsByRowId = (state, props) => {
  return Object.values(state.castHealerSpells)
    .filter(castHealerSpell =>
      props.castSpells.includes(castHealerSpell.castSpellId) 
    );
}
export const makeGetCastHealerSpellsByRowId = () => {
  return createSelector(
    [getCastHealerSpellsByRowId, getHealerSpells],
    (castHealerSpells, healerSpells) => 
    // i hate this, we could change healerSpells to be id keyed instead of string keyed so that its simply healerSpells[castHeaperSpell.spellId]
    castHealerSpells.map(castHealerSpell =>
      Object.values(healerSpells).find(healerSpell =>
        healerSpell.id === castHealerSpell.spellId
      )
    )
  )
}

const getSpellsOffCooldown = (spells, timing, castSpells) => {
	return spells.filter(spell => timing - spell.cooldown >= getLatestCastTiming(spell, castSpells))
}

const getLatestCastTiming = (spell, castSpells, healerId) => {
	const latestSpell = _.sortBy(castSpells.filter(castSpell => castSpell.healerId === healerId && castSpell.spellId === spell.spellId), ['timing'])
	return latestSpell.length === 0 ? 0 : latestSpell.timing
}

export const makeGetOptionsForActiveHealerSpells = () => {
  return createSelector(
  [
    getHealerSpellsForActiveHealers,
    getActiveHealersForSelectedBoss,
    getCastHealerSpells,
    getHealerTypes,
    getTimingByRowId
  ],
  (healerSpells, activeHealers, castHealerSpells, healerTypes, timing) => {
    const availableSpells =
      // for each active healer
      Object.values(activeHealers).map(activeHealer => {
        // get the spells they've cast
        const thisHealerHasCast = Object.values(castHealerSpells).filter(castHealerSpell =>
          castHealerSpell.healerId === activeHealer.id
        );
        // 
        return activeHealer.spells.filter(spell => {
          const timingsForSpellCast = thisHealerHasCast.filter(castSpell =>
            castSpell.spellId === spell.id
          );
          // healer hasn't cast this spell, meaning it is available
          if (timingsForSpellCast.length === 0) {
            return true;
          }

          const previousCast = _.sortBy(timingsForSpellCast
            .filter(spellCast => spellCast.timing <= timing), ['timing']).pop();
          const previousCastTiming = previousCast ? previousCast.timing : null;

          const futureCast = _.sortBy(timingsForSpellCast
            .filter(spellCast => spellCast.timing > timing), ['timing']).shift();
          const futureCastTiming = futureCast === undefined ? futureCast.timing : null;

          const spellOffCooldown = previousCastTiming ? timing - spell.cooldown >= previousCastTiming : true;
          const spellWillBeOffCooldown = futureCastTiming ? timing + spell.cooldown <= futureCastTiming : true;

          return spellOffCooldown && spellWillBeOffCooldown;
        })
      })

    return _.flatten(availableSpells);


    // filter down all healerSpells to only those that are currently available
    const options = Object.values(healerSpells).filter(spell => {
      // if we haven't cast this spell yet, it is available
      if (!Object.values(castHealerSpells).find(castHealerSpell =>
        castHealerSpell.spellId === spell.id)) {
        return true;
      // otherwise, check all spells
      } else {
        // if spell is available, return true
        // need to check each healer somehow
        return timing - spell.cooldown >= getLatestCastTiming(spell, castHealerSpells)
      }
        // need to return boolean, not a list
      //   const availableSpells = activeHealers.map(healer => {
      //     const spells = healerTypes[healer.name].spells.map(spell => {
      //       return {...healerSpells[spell]}}
      //     );
      //     return getSpellsOffCooldown(spells, timing, castHealerSpells, healer.healerId)
      //   })
    
      //   return _.uniq(_.flatten(availableSpells));
      // }
    })

    return options.map(option => ({value: option.name, label: option.name}));
  }
)};

// currently castHealerSpells looks like
// {
//   [castSpellId]: {
//     castSpellId: 3
//     healerId: 1,
//     spellId: 1,
//     timing: 30
//   },
//   ...

// }

// we need a selector to map this to the actual spell?