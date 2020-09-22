import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import anime from "animejs";
import ReactMd from "react-md-file";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

/**
 * Imports other components and hooks
 */
import Square, { SquarePropTypes, SquareDefaultProps } from "../Square";

/**
 * Defines the prop types
 */
const propTypes = {
  square: PropTypes.shape(SquarePropTypes),
};

/**
 * Defines the default props
 */
const defaultProps = {
  square: SquareDefaultProps,
};

/**
 * Defines the styles
 */
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },

  legend: {
    width: "200px",
    background: "beige",
    padding: "1em",
    margin: "1em",
  },

  note: {
    maxWidth: "45em",
  },
}));

/**
 * Displays the component
 */
const SquareMove = (props) => {
  const { square } = props;
  const { container } = square;
  const {
    perspective: defaultPerspective,
    perspectiveOrigin: defaultPerspectiveOrigin,
    isPerspectiveOn: defaultIsPerspectiveOn,
  } = container;

  /**
   * Loads the styles
   */
  const { container: containerClass, legend, note } = useStyles(props);

  /**
   * Manages states and state changes
   */
  const [axis, setAxis] = useState("X");
  const [isPerspectiveOn, setIsPerspectiveOn] = useState(
    defaultIsPerspectiveOn
  );
  const [perspective, setPerspective] = useState(defaultPerspective);

  const handleAxisChange = (event) => {
    setAxis(event.target.value);
  };

  const handleIsPerspectiveOnChange = (event) => {
    setIsPerspectiveOn(event.target.checked);
  };

  const handlePerspectiveChange = (event) => {
    setPerspective(event.target.value);
  };

  /**
   * Prepares props for Square
   */
  const container2 = {
    ...container,
    perspective: perspective,
    isPerspectiveOn: isPerspectiveOn,
  };
  const square2 = { ...square, container: container2 };

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
    <div className={clsx("Container", containerClass)}>
      <div className={clsx("Note", note)}>
        <ReactMd fileName="./SquareMove.md" />
      </div>
      <Square {...square2} className="SquareMove" />
      <div className={clsx("Legend", legend)}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Move on:</FormLabel>
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
                checked={isPerspectiveOn}
                onChange={handleIsPerspectiveOnChange}
                name="perspective"
              />
            }
            label="Use perspective"
          />
          <TextField
            id="standard-helperText"
            label="Set perspective"
            defaultValue={perspective}
            onChange={handlePerspectiveChange}
          />
        </FormControl>
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
