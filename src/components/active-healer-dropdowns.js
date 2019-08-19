import React from 'react';
import { connect } from 'react-redux';
import { HealerDropdown } from './healer-dropdown';
import { getActiveHealersForSelectedBoss, selectedBoss, getCastHealerSpells } from '../redux/selectors/temporal-boon-selectors';
import { changeActiveHealer, addActiveHealer } from '../redux/actions/temporal-boon-actions';
import _ from 'lodash';

const mapStateToProps = state => ({
  activeHealers: getActiveHealersForSelectedBoss(state),
  selectedBoss: selectedBoss(state),
  castHealerSpells: getCastHealerSpells(state)
});

const mapDispatchToProps = dispatch => ({
  changeActiveHealer: (healerIDToRemove, healerTypeToAdd, selectedBoss, castSpellsForHealer) =>
    dispatch(changeActiveHealer(healerIDToRemove, healerTypeToAdd, _.uniqueId(), selectedBoss, castSpellsForHealer)),
  addActiveHealer: (healerName, selectedBoss) =>
    dispatch(addActiveHealer(healerName, Number(_.uniqueId()), selectedBoss))
});

export const ActiveHealerDropdowns = connect(mapStateToProps, mapDispatchToProps)(
  ({
    activeHealers,
    selectedBoss,
    changeActiveHealer,
    addActiveHealer,
    castHealerSpells
  }) => {
  return (
    <React.Fragment>
      {activeHealers.map((healer, index) => {
        const castSpellsForHealer =
          Object.values(castHealerSpells)
              .filter(castHealerSpell => castHealerSpell.healerId === healer.id)
              .map(castHealerSpell => castHealerSpell.castSpellId);
        return (
          <HealerDropdown
            key={index}
            value={healer.name}
            onChange={healerToAdd => changeActiveHealer(healer.id, healerToAdd, selectedBoss, castSpellsForHealer)}
          />
        )
      }
      )}
      <HealerDropdown onChange={healerToAdd => addActiveHealer(healerToAdd, selectedBoss)}/>
    </React.Fragment>
  )
});