import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { TextField } from "@material-ui/core";
import { updateNotes } from "../../redux/actions/temporal-boon-actions";

const mapDispatchToProps = dispatch => ({
  updateNotes: (notes, id) => dispatch(updateNotes(notes, id))
});

export const BossSpellNotes = connect(
  null,
  mapDispatchToProps
)(({ id, value, updateNotes, disabled }) => (
  <TextField
    label="Notes"
    onChange={event => updateNotes(event.currentTarget.value, id)}
    value={value}
    disabled={disabled}
  />
));

BossSpellNotes.propTypes = {
  id: PropTypes.number,
  value: PropTypes.string,
  updateNotes: PropTypes.func,
  disabled: PropTypes.bool
};

BossSpellNotes.defaultProps = {
  id: null,
  value: "",
  updateNotes() {},
  disabled: false
};
