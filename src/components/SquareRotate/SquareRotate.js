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
const SquareRotate = (props) => {
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
        return [{ rotateX: 0 }, { rotateY: 0 }, { rotateZ: 360 }];
      case "Y":
        return [{ rotateX: 0 }, { rotateZ: 0 }, { rotateY: 360 }];
      case "X":
      default:
        return [{ rotateY: 0 }, { rotateZ: 0 }, { rotateX: 360 }];
    }
  };

  useEffect(() => {
    anime({
      targets: ".SquareRotate",
      keyframes: move(axis),
      loop: true,
      duration: 4000,
      easing: "linear",
    });
  }, [axis]);

  return (
    <div className={clsx("Container", container)}>
      <div className={clsx("SquareContainer", squareContainer)}>
        <div className={clsx("Square", "SquareRotate", square)} />
      </div>
      <div className={clsx("Legend", legend)}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Rotate on:</FormLabel>
          <RadioGroup
            aria-label="rotate"
            name="rotate"
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
          When rotate the square on the X or Y axes without using perspective,
          it only looks like the square is getting smaller (or narrower) rather
          than rotating.
        </p>
        <p>
          When we add perspective, we can see that when the square is rotating
          well, ie. the closer side of the square seems bigger, and the further
          side looks smaller.
        </p>
      </div>
    </div>
  );
};

SquareRotate.propTypes = propTypes;
SquareRotate.defaultProps = defaultProps;

export default SquareRotate;
export {
  propTypes as SquareRotatePropTypes,
  defaultProps as SquareRotateDefaultProps,
};
