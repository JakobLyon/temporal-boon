import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TimelineRow } from './timeline-row';
import { getTimelineDataByBoss } from '../../redux/selectors/temporal-boon-selectors';

const mapStateToProps = state => ({
  timelineData: getTimelineDataByBoss(state)
});

export const TimelineGrid = connect(mapStateToProps)(({timelineData}) => (
  <React.Fragment>
    <p>healer cd grid</p>
    {timelineData.map(data =>
      <TimelineRow
        id={data.id}
        bossSpellName={data.bossSpellName}
        timing={data.timing}
        notes={data.notes}
        castSpells={data.castSpells}
      />
    )}
    <TimelineRow/>
  </React.Fragment>
));

TimelineGrid.propTypes = {
  timelineData: PropTypes.array
};

TimelineGrid.defaultProps = {
  timelineData: []
};