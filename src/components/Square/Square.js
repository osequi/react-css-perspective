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
    display: "flex",
  },

  square: {
    width: "50vmin",
    height: "50vmin",
    margin: "10vmin",
    background: "palegreen",
  },

  legend: {
    background: "beige",
    padding: "1vmin",
  },
}));

/**
 * Displays the component
 */
const Square = (props) => {
  const { container, square, legend } = useStyles(props);

  return (
    <div className={clsx("SquareContainer", container)}>
      <div className={clsx("Square", square)} />
      <div className={clsx("Legend", legend)}>
        <p>Move (translate) on:</p>
        <p>
          <label>
            <input type="radio" value="X Axis" /> X Axis
          </label>
        </p>
        <p>
          <label>
            <input type="radio" value="Y Axis" /> Y Axis
          </label>
        </p>
        <p>
          <label>
            <input type="radio" value="Z Axis" /> Z Axis
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" checked={false} /> Use perspective
          </label>
        </p>
      </div>
    </div>
  );
};

Square.propTypes = propTypes;
Square.defaultProps = defaultProps;

export default Square;
export { propTypes as SquarePropTypes, defaultProps as SquareDefaultProps };
