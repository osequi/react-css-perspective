import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";

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

  const [axis, setAxis] = useState("x");
  const [perspective, setPerspective] = useState(false);

  const handleAxisChange = (event) => {
    setAxis(event.target.value);
  };

  const handlePerspectiveChange = (event) => {
    setPerspective(event.target.checked);
  };

  return (
    <div className={clsx("SquareContainer", container)}>
      <div className={clsx("Square", square)} />
      <div className={clsx("Legend", legend)}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Move (translate) on:</FormLabel>
          <RadioGroup
            aria-label="move"
            name="move"
            value={axis}
            onChange={handleAxisChange}
          >
            <FormControlLabel value="x" control={<Radio />} label="X axis" />
            <FormControlLabel value="y" control={<Radio />} label="Y axis" />
            <FormControlLabel value="z" control={<Radio />} label="Z axis" />
          </RadioGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={perspective}
                onChange={handlePerspectiveChange}
                name="perspective"
              />
            }
            label="Use perspective"
          />
        </FormControl>
      </div>
    </div>
  );
};

Square.propTypes = propTypes;
Square.defaultProps = defaultProps;

export default Square;
export { propTypes as SquarePropTypes, defaultProps as SquareDefaultProps };
