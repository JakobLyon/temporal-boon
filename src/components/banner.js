import React from "react";
import Radium from "radium";
import PropTypes from "prop-types";

import DefaultBackground from "../images/anduin-wyrnn-armor.jpg";

const getBackgroundValueForBanner = backgroundImage => {
  return `linear-gradient(rgba(0, 0, 0, 0.8), rgb(255, 255, 255)), url(${backgroundImage}) no-repeat`;
}

const styles = {
  banner: {
    position: "relative",
    height: "50vh",
    clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
    background: getBackgroundValueForBanner(DefaultBackground),
    backgroundSize: "cover",
    backgroundPosition: "50% 25%"
  },
  "banner--dovetail-inverse": {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)"
  },
  textContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  tertiaryText: {
    display: "block",
    color: "white",
    fontWeight: 700,
    letterSpacing: 10,
    textTransform: "uppercase",
    fontSize: 16
  },
  secondaryText: {
    display: "block",
    color: "white",
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: 10,
    textTransform: "uppercase"
  },
  primaryText: {
    position: "absolute",
    top: 30,
    left: 30,
    fontFamily: "Times New Roman, Times, serif",
    color: "#FFF",
    fontSize: 32,
    textTransform: "uppercase",
    letterSpacing: 15
  },
  iconContainer: {
    position: "absolute",
    top: 30,
    right: 30,
    height: 30,
    width: 30
  },
  icon: {
    background: "#fff",
    display: "block",
    height: "100%"
  },
  "icon--star": {
    clipPath:
      "polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%)"
  },
  "icon--cross": {
    clipPath:
      "polygon(50% 50%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%)"
  },
  "icon--diamond": {
    clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"
  },
  iconImage: {
    height: 30
  }
};

const BannerComponent = ({
  primaryText,
  secondaryText,
  tertiaryText,
  backgroundImage,
  iconImage,
  iconShape,
  backgroundShape
}) => {
  const icon = iconImage ? (
    <img src={iconImage} alt="banner icon" style={[styles.iconImage]} />
  ) : (
      <span style={[styles.icon, styles[`icon--${iconShape}`]]} />
    );

  const bannerBackgroundModifier = backgroundImage
    ? {
      background: getBackgroundValueForBanner(backgroundImage),
    }
    : {};

  const bannerShapeModifier =
    backgroundShape === "dovetail"
      ? {}
      : { ...styles["banner--dovetail-inverse"] }

  return (
    <div style={[styles.banner, bannerBackgroundModifier, bannerShapeModifier]}>
      <h1 style={[styles.primaryText]}>{primaryText}</h1>
      <div style={[styles.textContainer]}>
        <span style={[styles.tertiaryText]}>{tertiaryText}</span>
        <span style={[styles.secondaryText]}>{secondaryText}</span>
      </div>
      <div style={[styles.iconContainer]}>{icon}</div>
    </div>
  );
};

BannerComponent.propTypes = {
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  tertiaryText: PropTypes.string,
  backgroundImage: PropTypes.string,
  iconImage: PropTypes.string,
  iconShape: PropTypes.oneOf(["diamond", "star", "cross"]),
  backgroundShape: PropTypes.oneOf(["dovetail", "inverse dovetail"])
};

BannerComponent.defaultProps = {
  primaryText: "Primary Text",
  secondaryText: "Secondary Text",
  tertiaryText: "Tertiary Text",
  iconImage: null,
  iconShape: "star",
  backgroundImage: null,
  backgroundShape: "dovetail"
};

export const Banner = Radium(BannerComponent);
