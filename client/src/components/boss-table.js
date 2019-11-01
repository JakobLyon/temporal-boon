import React from 'react';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import 'react-table/react-table.css';

import {getSpellsByBoss} from '../redux/selectors/temporal-boon-selectors';

const mapStateToProps = state => ({
  spells: getSpellsByBoss(state)

});

const columns = [{
  Header: 'Spell Name',
  accessor: 'name'
}, {
  Header: 'Spell ID',
  accessor: 'spellId'
}, {
  Header: 'Description',
  accessor: 'description'
}, {
  Header: 'Frequency/Trigger',
  accessor: 'frequencyOrTrigger'
}];

export const BossTable = connect(mapStateToProps)(({spells}) => (
 <ReactTable
  data={spells}
  columns={columns}
  minRows={0}
  showPagination={false}
 />
));