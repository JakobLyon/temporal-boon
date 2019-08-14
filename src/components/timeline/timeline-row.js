import React from 'react';
import PropTypes from 'prop-types';
import { BossSpellDropdown } from './boss-spell-dropdown';
import { HealerSpells } from './healer-spells';
import { BossSpellNotes } from './boss-spell-notes';
import { TimingInput } from './timing-input';

export const TimelineRow = ({id, bossSpellName, timing, notes, castSpells}) => (
    <React.Fragment>
        <p>{id ? '' : 'new'} healer cd row</p>
        <BossSpellDropdown
            id={id}
            bossSpellName={bossSpellName}
        />
        {id &&
            <React.Fragment> 
                <TimingInput
                    value={timing}
                    disabled={!id}
                    id={id}
                />
                <HealerSpells
                    rowId={id}
                    timing={timing}
                    castSpells={castSpells}
                />
                <BossSpellNotes
                    id={id}
                    disabled={!id}
                    value={notes}
                />
            </React.Fragment>
        }
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