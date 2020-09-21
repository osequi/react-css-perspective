import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import anime from "animejs";

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

  squareContainer: (props) => ({
    width: "200px",
    height: "200px",
    border: "1px solid",
    margin: "1em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    perspective: props.perspective ? "240px" : 0,
  }),

  square: {
    width: "100px",
    height: "100px",
    background: "palegreen",
  },

  legend: {
    background: "beige",
    padding: "1em",
    margin: "1em",
  },

  note: {
    maxWidth: 300,
    padding: "1em",
    margin: "1em",
    border: "1px solid",
  },
}));

/**
 * Displays the component
 */
const SquareMove = (props) => {
  /**
   * Manages states and state changes
   */
  const [axis, setAxis] = useState("X");
  const [perspective, setPerspective] = useState(false);

  const handleAxisChange = (event) => {
    setAxis(event.target.value);
  };

  const handlePerspectiveChange = (event) => {
    setPerspective(event.target.checked);
  };

  /**
   * Loads the styles
   */
  const { container, squareContainer, square, legend, note } = useStyles({
    perspective: perspective,
  });

  /**
   * Defines the animations
   */
  const move = (axis) => {
    switch (axis) {
      case "Z":
        return [
          { translateZ: 50 },
          { translateZ: 0 },
          { translateZ: -50 },
          { translateZ: 0 },
        ];
      case "Y":
        return [
          { translateY: 50 },
          { translateY: 0 },
          { translateY: -50 },
          { translateY: 0 },
        ];
      case "X":
      default:
        return [
          { translateX: 50 },
          { translateX: 0 },
          { translateX: -50 },
          { translateX: 0 },
        ];
    }
  };

  useEffect(() => {
    anime({
      targets: ".SquareMove",
      keyframes: move(axis),
      loop: true,
      duration: 2000,
      easing: "linear",
    });
  }, [axis]);

  return (
    <div className={clsx("Container", container)}>
      <div className={clsx("SquareContainer", squareContainer)}>
        <div className={clsx("Square", "SquareMove", square)} />
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
            <FormControlLabel value="X" control={<Radio />} label="X axis" />
            <FormControlLabel value="Y" control={<Radio />} label="Y axis" />
            <FormControlLabel value="Z" control={<Radio />} label="Z axis" />
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
      <div className={clsx("Note", note)}>
        <p>
          Perspective has no influence on the object when it’s moving on the X
          or Y axes.
        </p>
        <p>
          When the object is moving on the Z axis, perspective makes the square
          look bigger when it moves closer to us, and smaller when it moves
          further away.
        </p>
      </div>
    </div>
  );
};

SquareMove.propTypes = propTypes;
SquareMove.defaultProps = defaultProps;

export default SquareMove;
export {
  propTypes as SquareMovePropTypes,
  defaultProps as SquareMoveDefaultProps,
};
