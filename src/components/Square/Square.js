import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { motion } from "framer-motion";

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

  squareContainer: {
    width: "200px",
    height: "200px",
    border: "1px solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  square: {
    width: "100px",
    height: "100px",
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
  const { container, squareContainer, square, legend } = useStyles(props);

  /**
   * Manages states and state changes
   */
  const [axis, setAxis] = useState("axisX");
  const [perspective, setPerspective] = useState(false);

  const handleAxisChange = (event) => {
    setAxis(event.target.value);
  };

  const handlePerspectiveChange = (event) => {
    setPerspective(event.target.checked);
  };

  /**
   * Defines the animations
   */
  const transitionRepeat = {
    duration: 2,
  };

  const variantsForAxis = {
    axisX: { translateX: ["-50px", "50px"] },
    axisY: { translateY: ["-50px", "50px"] },
    axisZ: { translateZ: ["-50px", "50px"] },
  };

  return (
    <div className={clsx("Container", container)}>
      <div className={clsx("SquareContainer", squareContainer)}>
        <motion.div
          className={clsx("Square", square)}
          animate={axis}
          variants={variantsForAxis}
          transition={transitionRepeat}
        />
      </div>
      <div className={clsx("Legend", legend)}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Move (translate) on:</FormLabel>
          <RadioGroup
            aria-label="move"
            name="move"
            value={axis}
            onChange={handleAxisChange}
          >
            <FormControlLabel
              value="axisX"
              control={<Radio />}
              label="X axis"
            />
            <FormControlLabel
              value="axisY"
              control={<Radio />}
              label="Y axis"
            />
            <FormControlLabel
              value="axisZ"
              control={<Radio />}
              label="Z axis"
            />
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
