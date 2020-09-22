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
}));

/**
 * Displays the component
 */
const Square = (props) => {
  const { className } = props;
  const { container, square } = useStyles(props);

  return (
    <div className={clsx("SquareContainer", container)}>
      <div className={clsx("Square", className, square)} />
    </div>
  );
};

Square.propTypes = propTypes;
Square.defaultProps = defaultProps;

export default Square;
export { propTypes as SquarePropTypes, defaultProps as SquareDefaultProps };
