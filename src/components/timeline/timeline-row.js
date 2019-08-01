import React from 'react';
import PropTypes from 'prop-types';
import { BossSpellDropdown } from './boss-spell-dropdown';
import { HealerCDDropdown } from './healer-cd-dropdown';
import { BossSpellNotes } from './boss-spell-notes'

export const TimelineRow = ({id, bossSpellName, timing}) => (
    <React.Fragment>
        <p>{id ? '' : 'new'} healer cd row</p>
        <BossSpellDropdown id={id} bossSpellName={bossSpellName}/>
        <HealerCDDropdown />
        <HealerCDDropdown />
        <HealerCDDropdown />
        <HealerCDDropdown />
        <BossSpellNotes />
    </React.Fragment>
)

TimelineRow.propTypes = {
    id: PropTypes.number,
    bossSpellName: PropTypes.string,
    timing: PropTypes.number
};

TimelineRow.defaultProps = {
    id: null,
    bossSpellName: null,
    timing: null
};