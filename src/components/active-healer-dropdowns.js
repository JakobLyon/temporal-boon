import React from 'react';
import { connect } from 'react-redux';
import { HealerDropdown } from './healer-dropdown';
import { getActiveHealersForSelectedBoss, selectedBoss } from '../redux/selectors/temporal-boon-selectors';
import { changeActiveHealer, addActiveHealer } from '../redux/actions/temporal-boon-actions';
import _ from 'lodash';

const mapStateToProps = state => ({
  activeHealers: getActiveHealersForSelectedBoss(state),
  selectedBoss: selectedBoss(state)
});

const mapDispatchToProps = dispatch => ({
  changeActiveHealer: (healerIDToRemove, healerTypeToAdd, selectedBoss) =>
    dispatch(changeActiveHealer(healerIDToRemove, healerTypeToAdd, _.uniqueId(), selectedBoss)),
  addActiveHealer: (healerName, selectedBoss) =>
    dispatch(addActiveHealer(healerName, _.uniqueId(), selectedBoss))
});

export const ActiveHealerDropdowns = connect(mapStateToProps, mapDispatchToProps)(({activeHealers, selectedBoss, changeActiveHealer, addActiveHealer}) => {
  return (
    <React.Fragment>
      {activeHealers.map((healer, index) => <HealerDropdown key={index} value={healer.name} onChange={healerToAdd => changeActiveHealer(healer.id, healerToAdd, selectedBoss)}/>)}
      <HealerDropdown onChange={healerToAdd => addActiveHealer(healerToAdd, selectedBoss)}/>
    </React.Fragment>
  )
});