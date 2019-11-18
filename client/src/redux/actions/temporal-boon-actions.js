import { types } from "./types";
const {
  SET_BOSS,
  ADD_ACTIVE_HEALER,
  CHANGE_ACTIVE_HEALER,
  ADD_TIMELINE_ROW,
  UPDATE_TIMELINE_BOSS_SPELL,
  UPDATE_TIMING,
  UPDATE_NOTES,
  ADD_HEALER_SPELL,
  LOG_IN,
  LOG_OUT
} = types;

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

export const changeActiveHealer = (
  healerIdToRemove,
  healerTypeToAdd,
  healerIdToAdd,
  selectedBoss,
  castSpellsForHealer
) => ({
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
});

export const updateNotes = (notes, id) => ({
  type: UPDATE_NOTES,
  payload: {
    notes,
    id
  }
});

export const addHealerSpell = (
  rowId,
  healerId,
  castSpellId,
  spellId,
  timing
) => ({
  type: ADD_HEALER_SPELL,
  payload: {
    rowId,
    healerId,
    castSpellId,
    spellId,
    timing
  }
});

export const logIn = () => ({
  type: LOG_IN
});

export const logOut = () => ({
  type: LOG_OUT
});
