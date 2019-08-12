import React from 'react';
import PropTypes from 'prop-types';
import { BossSpellDropdown } from './boss-spell-dropdown';
import { HealerCDDropdown } from './healer-cd-dropdown';
import { BossSpellNotes } from './boss-spell-notes';
import { TimingInput } from './timing-input';

export const TimelineRow = ({id, bossSpellName, timing, notes}) => (
    <React.Fragment>
        <p>{id ? '' : 'new'} healer cd row</p>
        <BossSpellDropdown
            id={id}
            bossSpellName={bossSpellName}
        />
        <TimingInput
            value={timing}
            disabled={!id}
            id={id}
        />
        <HealerCDDropdown id={id} timing={timing}/>
        <BossSpellNotes
            id={id}
            disabled={!id}
            value={notes}
        />
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