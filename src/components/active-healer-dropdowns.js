import React from 'react';
import { connect } from 'react-redux';
import { HealerDropdown } from './healer-dropdown';
import { getActiveHealers } from '../redux/selectors/temporal-boon-selectors';
import { changeActiveHealer, addActiveHealer } from '../redux/actions/temporal-boon-actions';

const mapStateToProps = state => ({
  activeHealers: getActiveHealers(state)
});

const mapDispatchToProps = dispatch => ({
  changeActiveHealer: (healerToRemove, healerToAdd) =>
    dispatch(changeActiveHealer(healerToRemove, healerToAdd)),
  addActiveHealer: healer =>
    dispatch(addActiveHealer(healer))
});

export const ActiveHealerDropdowns = connect(mapStateToProps, mapDispatchToProps)(({activeHealers, changeActiveHealer, addActiveHealer}) => {
  return (
    <React.Fragment>
      {activeHealers.map((healer, index) => <HealerDropdown key={index} value={healer} onChange={healerToAdd => changeActiveHealer(healer, healerToAdd)}/>)}
      <HealerDropdown onChange={addActiveHealer}/>
    </React.Fragment>
  )
});