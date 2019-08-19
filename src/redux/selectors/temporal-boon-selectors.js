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

export const getCastHealerSpells = state => state.castHealerSpells;
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
    // i hate this, we could change healerSpells to be id keyed instead of string keyed so that its simply healerSpells[castHeaerSpell.spellId]
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
    getActiveHealersForSelectedBoss,
    getHealerTypes,
    getCastHealerSpells,
    getTimingByRowId,
    getHealerSpells
  ],
  (activeHealers, healerTypes, castHealerSpells, timing, healerSpells) => {
    // TODO - make separate selector to memoize for performance
    const lastHealerCasts = activeHealers.reduce(
      (cur, activeHealer) => {
        const lastHealerCast =
          _.sortBy(
            Object.values(castHealerSpells)
              .filter(castHealerSpell => castHealerSpell.healerId === activeHealer.id),
            ['timing']
          )
          .reverse()
          .find(castHealerSpell => castHealerSpell.timing <= timing);

        const lastHealerTiming =
            lastHealerCast !== undefined
            ? lastHealerCast.timing
            : 0;

        return [
          ...cur,
          {healerId: activeHealer.id, lastCastTiming: lastHealerTiming}
        ]
      },
      []
    )

    let availableSpellIds = [];

    // STEP 0 - remove spells on cooldown
    // TODO explore if we can remove flatten in favor of a reduce
    const cooldownsForAllHealers =
      _.flatten(
        // for each active healer
        Object.values(activeHealers).map(activeHealer => {
          // get the spells they've cast
          const thisHealerHasCast = Object.values(castHealerSpells).filter(castHealerSpell =>
            castHealerSpell.healerId === activeHealer.id
          );
          // 
          const availableSpells = activeHealer.spells.filter(spell => {
            const timingsForSpellCast = thisHealerHasCast.filter(castSpell =>
              castSpell.spellId === spell.id
            );
            // healer hasn't cast this spell, meaning it is available
            if (timingsForSpellCast.length === 0) {
              return true;
            }

            const previousCast = _.sortBy(timingsForSpellCast
              .filter(spellCast => spellCast.timing <= timing), ['timing']).pop();
            const previousCastTiming = previousCast !== undefined ? previousCast.timing : null;

            const futureCast = _.sortBy(timingsForSpellCast
              .filter(spellCast => spellCast.timing > timing), ['timing']).shift();
            const futureCastTiming = futureCast !== undefined ? futureCast.timing : null;

            const spellOffCooldown =
              previousCastTiming || previousCastTiming === 0
                ? timing - spell.cooldown >= previousCastTiming
                : true;
            const spellWillBeOffCooldown =
              futureCastTiming
                ? timing + spell.cooldown <= futureCastTiming
                : true;

            return spellOffCooldown && spellWillBeOffCooldown;
          });

          availableSpellIds = [...availableSpellIds, ...availableSpells.map(spell => spell.id)];
          return availableSpells.map(availableSpell => ({...availableSpell, healerId: activeHealer.id}));
      }));

    // get unique spell ids
    availableSpellIds = [...new Set(availableSpellIds)];

    //STEP 2 - organize by spell id
    const cooldownsBySpellId = 
      availableSpellIds.reduce(
        (acc, spellId) => {
          return {
            ...acc,
            [spellId]: [...cooldownsForAllHealers.filter(cooldown => cooldown.id === spellId)]
          }
        },
        {}
      );

    // STEP 3 - reduce cooldownsBySpellId to get one cooldown per spell id
    const optionsForActiveHealerSpells =
        Object.values(cooldownsBySpellId).reduce(
          (cur, cooldowns) => {
            const firstAvailableHealer =
              _.sortBy(
                lastHealerCasts
                  .filter(lastHealerCast =>
                    cooldowns.find(cooldown => cooldown.healerId === lastHealerCast.healerId)),
                ['timing']
              ).shift();

            const cooldown = cooldowns.find(cooldown => cooldown.healerId === firstAvailableHealer.healerId);

            return [
              ...cur,
              cooldown
            ]
          },
          []
        )


    return optionsForActiveHealerSpells.map(option => ({value: option.name, label: option.name, spellId: option.id, healerId: option.healerId}));
  })
};