import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getSpellsByBoss, selectedBoss } from '../../redux/selectors/temporal-boon-selectors';
import { addTimelineRow, updateTimelineBossSpell } from '../../redux/actions/temporal-boon-actions';
import _ from 'lodash';

const mapStateToProps = state => ({
    bossSpells: getSpellsByBoss(state).map(spell => ({value: spell.name, label: spell.name})),
    selectedBoss: selectedBoss(state)
});

const mapDispatchToProps = dispatch => ({
    addTimelineRow: (bossSpell, selectedBoss) =>
        dispatch(addTimelineRow(selectedBoss, bossSpell, Number(_.uniqueId()))),
    updateTimelineBossSpell: (bossSpell, id) => dispatch(updateTimelineBossSpell(bossSpell, id))
});

export const BossSpellDropdown = connect(mapStateToProps, mapDispatchToProps)(
    ({bossSpells,
    selectedBoss,
    id,
    bossSpellName,
    addTimelineRow,
    updateTimelineBossSpell
    }) => (
        <React.Fragment>
            <p>boss spell dropdown</p>
            <Select
                options={bossSpells}
                onChange={id
                    ? (bossSpell) => updateTimelineBossSpell(bossSpell.value, id)
                    : (bossSpell) => addTimelineRow(bossSpell.value, selectedBoss)}
                value={bossSpellName ? {value: bossSpellName, label: bossSpellName} : null}
            />
        </React.Fragment>
));

BossSpellDropdown.propTypes = {
    bossSpells: PropTypes.array,
    selectedBoss: PropTypes.string,
    id: PropTypes.number,
    bossSpellName: PropTypes.string,
    addTimelineRow: PropTypes.func
};

BossSpellDropdown.defaultProps = {
    bossSpells: [],
    id: null,
    bossSpellName: null,
    addTimelineRow(){},
    updateTimelineBossSpell(){}
};