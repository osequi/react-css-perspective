import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

/**
 * Defines the prop types
 */
const propTypes = {
  container: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.height,
    perspective: PropTypes.string,
    perspectiveOrigin: PropTypes.string,
    isPerspectiveOn: PropTypes.bool,
  }),
  width: PropTypes.string,
  height: PropTypes.height,
  className: PropTypes.string,
  isContainerAnimated: PropTypes.bool,
};

/**
 * Defines the default props
 */
const defaultProps = {
  container: {
    width: "200px",
    height: "200px",
    perspective: "240px",
    perspectiveOrigin: "50% 50%",
    isPerspectiveOn: false,
  },
  width: "100px",
  height: "100px",
  className: "Square",
  isContainerAnimated: false,
};

/**
 * Defines the styles
 */
const useStyles = makeStyles((theme) => ({
  container: (props) => ({
    width: props.container.width,
    height: props.container.height,
    perspective: props.container.isPerspectiveOn
      ? props.container.perspective
      : "none",
    perspectiveOrigin: props.container.perspectiveOrigin,

    border: "1px solid",
    margin: "1em",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),

  square: (props) => ({
    width: props.width,
    height: props.height,
    background: "palegreen",
  }),

  animatedContainer: {
    animation: `$moveOrigin 4s infinite ease-in-out alternate;`,
  },

  "@keyframes moveOrigin": {
    "0%": {
      perspectiveOrigin: "left center",
    },
    "100%": {
      perspectiveOrigin: "right center",
    },
  },
}));

/**
 * Displays the component
 */
const Square = (props) => {
  const { className, isContainerAnimated } = props;
  const { container, square, animatedContainer } = useStyles(props);

  const container2 = isContainerAnimated ? animatedContainer : null;
  const klassName = isContainerAnimated
    ? "SquareContainerAnimated"
    : "SquareContainer";

  return (
    <div className={clsx(klassName, container, container2)}>
      <div className={clsx("Square", className, square)} />
    </div>
  );
};

Square.propTypes = propTypes;
Square.defaultProps = defaultProps;

export default Square;
export { propTypes as SquarePropTypes, defaultProps as SquareDefaultProps };
