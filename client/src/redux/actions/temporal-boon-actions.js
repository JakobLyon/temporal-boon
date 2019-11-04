export const SET_BOSS = 'SET_BOSS';
export const ADD_ACTIVE_HEALER = 'ADD_ACTIVE_HEALER';
export const CHANGE_ACTIVE_HEALER = 'CHANGE_ACTIVE_HEALER';

// Timeline action types
export const ADD_TIMELINE_ROW = 'ADD_TIMELINE_ROW';
export const UPDATE_TIMELINE_BOSS_SPELL = 'UPDATE_TIMELINE_BOSS_SPELL';
export const UPDATE_TIMING = 'UPDATE_TIMING';
export const UPDATE_NOTES = 'UPDATE_NOTES';
export const ADD_HEALER_SPELL = 'ADD_HEALER_SPELL';

export const setBoss = boss => ({
  type: SET_BOSS,
  boss
});

export const addActiveHealer = (activeHealer, id, selectedBoss) => ({
  type: ADD_ACTIVE_HEALER,
  payload: {
    activeHealer,
    id,
    selectedBoss
  }
});

export const changeActiveHealer = (healerIdToRemove, healerTypeToAdd, healerIdToAdd, selectedBoss, castSpellsForHealer) => ({
  type: CHANGE_ACTIVE_HEALER,
  payload: {
    healerIdToRemove,
    healerTypeToAdd,
    healerIdToAdd,
    selectedBoss,
    castSpellsForHealer
  }
});

// Timeline action creators
export const addTimelineRow = (bossName, bossSpellName, id, timing) => ({
  type: ADD_TIMELINE_ROW,
  payload: {
    bossName,
    bossSpellName,
    id,
    timing
  }
});

export const updateTimelineBossSpell = (bossSpellName, id) => ({
  type: UPDATE_TIMELINE_BOSS_SPELL,
  payload: {
    bossSpellName,
    id
  }
});

export const updateTiming = (timing, id) => ({
  type: UPDATE_TIMING,
  payload: {
    timing,
    id
  }
})

export const updateNotes = (notes, id) => ({
  type: UPDATE_NOTES,
  payload: {
    notes,
    id
  }
})

export const addHealerSpell = (rowId, healerId, castSpellId, spellId, timing) => ({
  type: ADD_HEALER_SPELL,
  payload: {
    rowId,
    healerId,
    castSpellId,
    spellId,
    timing
  }
})