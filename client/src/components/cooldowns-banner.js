import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Banner } from "../components/banner";

import {
  selectedBoss,
  getImageForSelectedBoss
} from "../redux/selectors/temporal-boon-selectors";

const mapStateToProps = state => ({
  backgroundImage: getImageForSelectedBoss(state),
  bossName: selectedBoss(state)
});

const CooldownsBannerComponent = ({ backgroundImage, bossName }) => (
  <Banner backgroundImage={backgroundImage} primaryText={bossName} />
);

CooldownsBannerComponent.propTypes = {
  backgroundImage: PropTypes.any,
  bossName: PropTypes.string
};

CooldownsBannerComponent.defaultProps = {
  backgroundImage: {},
  bossName: ""
};

export const CooldownsBanner = connect(mapStateToProps)(
  CooldownsBannerComponent
);
