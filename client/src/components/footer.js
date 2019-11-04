import React from "react";
import PropTypes from "prop-types";
import Radium from "radium";

const styles = {
  footer: {
    height: "75vh",
    clipPath: "polygon(0 0, 50% 25%, 100% 0, 100% 100%, 0 100%)",
    background:
      "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgb(255, 255, 255))",
    position: "relative"
  },
  contentWrapper: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    width: "75%",
    display: "flex"
  },
  image: {
    width: "25%",
    paddingTop: "100%",
    display: "inline-block"
  },
  links: {
    width: "75%",
    display: "flex",
    flexDirection: "column"
  },
  link: {
    textTransform: "uppercase",
    background: "#fff",
    color: "#777",
    borderRadius: "100px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    textDecoration: "none",
    transition: "all 0.2s",
    padding: "10px",
    ":hover": {
      boxShadow: "0 10px 10px rgba(0,0,0,0.2)",
      transform: "translateY(-10px)"
    },
    ":active": {
      boxShadow: "0 10px 5px rgba(0,0,0,0.2)",
      transform: "translateY(-5px)"
    }
  }
};

const FooterComponent = ({ image, links, backgroundImage }) => (
  <div
    style={[
      styles.footer,
      backgroundImage
        ? {
            background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgb(255, 255, 255), ${backgroundImage})`
          }
        : null
    ]}
  >
    <div style={[styles.contentWrapper]}>
      <div className="image-container">
        <img style={[styles.image]} src={image} alt="footer logo" />
      </div>
      <div style={[styles.links]}>
        {links.map((link, index) => (
          <a style={[styles.link]} href={link.url} key={index}>
            {link.text}
          </a>
        ))}
      </div>
    </div>
  </div>
);

FooterComponent.propTypes = {
  image: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.object),
  backgroundImage: PropTypes.string
};

FooterComponent.defaultProps = {
  image: "",
  links: [],
  backgroundImage: null
};

export const Footer = Radium(FooterComponent);
