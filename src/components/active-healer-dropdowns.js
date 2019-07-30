import React from 'react';
import { connect } from 'react-redux';
import { HealerDropdown } from './healer-dropdown';
import { getActiveHealersAlphabetical } from '../redux/selectors/temporal-boon-selectors';
import { changeActiveHealer, addActiveHealer } from '../redux/actions/temporal-boon-actions';
import _ from 'lodash';

const mapStateToProps = state => ({
  activeHealers: getActiveHealersAlphabetical(state)
});

const mapDispatchToProps = dispatch => ({
  changeActiveHealer: (healerIDToRemove, healerTypeToAdd) =>
    dispatch(changeActiveHealer(healerIDToRemove, healerTypeToAdd, _.uniqueId())),
  addActiveHealer: healerName =>
    dispatch(addActiveHealer(healerName, _.uniqueId()))
});

export const ActiveHealerDropdowns = connect(mapStateToProps, mapDispatchToProps)(({activeHealers, changeActiveHealer, addActiveHealer}) => {
  return (
    <React.Fragment>
      {activeHealers.map((healer, index) => <HealerDropdown key={index} value={healer.type} onChange={healerToAdd => changeActiveHealer(healer.id, healerToAdd)}/>)}
      <HealerDropdown onChange={addActiveHealer}/>
    </React.Fragment>
  )
});