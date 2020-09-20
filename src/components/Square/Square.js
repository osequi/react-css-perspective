import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

/**
 * Defines the prop types
 */
const propTypes = {};

/**
 * Defines the default props
 */
const defaultProps = {};

/**
 * Defines the styles
 */
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    overflowX: "hidden",
  },
}));

/**
 * Displays the component
 */
const Square = (props) => {
  const { container } = useStyles(props);

  return <div className={clsx("Square", container)}>Square</div>;
};

Square.propTypes = propTypes;
Square.defaultProps = defaultProps;

export default Square;
export { propTypes as SquarePropTypes, defaultProps as SquareDefaultProps };
