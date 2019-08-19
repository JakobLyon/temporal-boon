import React from "react";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import { getCompleteTimelineData } from "../redux/selectors/temporal-boon-selectors";

const mapStateToProps = state => ({});

class ERTNoteComponent extends React.Component {
  render() {
    return <p>ERT Note</p>;
  }
}

export const ERTNote = connect()(ERTNoteComponent);
