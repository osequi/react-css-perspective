import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import shortid from "shortid";

import anime from "animejs";
import ReactMd from "react-md-file";
import useControls, {
  useControlsPropTypes,
} from "@bit/osequi.test.use-controls";

/**
 * Imports other components and hooks
 */
import Square, { SquarePropTypes, SquareDefaultProps } from "../Square";
import { updateControls } from "../SquareMove";

/**
 * Defines the prop types
 */
const propTypes = {
  square: PropTypes.shape(SquarePropTypes),
  controls: PropTypes.shape(useControlsPropTypes),
};

/**
 * Defines the default props
 */
const defaultProps = {
  square: SquareDefaultProps,
  controls: {
    title: "Rotate on:",
    items: [
      {
        id: shortid.generate(),
        type: "radio",
        label: "Axis",
        value: "X",
        items: [
          {
            id: shortid.generate(),
            label: "X axis",
            value: "X",
          },
          {
            id: shortid.generate(),
            label: "Y axis",
            value: "Y",
          },
          {
            id: shortid.generate(),
            label: "Z axis",
            value: "Z",
          },
        ],
      },
      {
        id: shortid.generate(),
        type: "checkbox",
        label: "Use perspective",
        value: false,
      },
      {
        id: shortid.generate(),
        type: "text",
        label: "Set perspective",
        value: "0",
      },
      {
        id: shortid.generate(),
        type: "text",
        label: "Set perspective origin",
        value: "0",
      },
    ],
  },
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
 * Defines the animations
 */
const rotate = (axis) => {
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

/**
 * Displays the component
 */
const SquareRotate = (props) => {
  const { square } = props;
  const { container } = square;

  /**
   * Loads the styles
   */
  const { container: containerClass, legend, note } = useStyles(props);

  /**
   * Loads the controls
   */
  const controls = updateControls(props);
  const [values, form] = useControls(controls);

  /**
   * Updates props from controls.
   * When controls are updated these props will get updated too.
   */
  const {
    axis,
    usePerspective: isPerspectiveOn,
    setPerspective: perspective,
    setPerspectiveOrigin: perspectiveOrigin,
  } = values;

  /**
   * Updates the Square from Controls
   */
  const container2 = {
    ...container,
    perspective: perspective,
    isPerspectiveOn: isPerspectiveOn,
    perspectiveOrigin: perspectiveOrigin,
  };

  const square2 = { ...square, container: container2 };

  /**
   * Updates the animation from Controls
   */
  useEffect(() => {
    anime({
      targets: ".SquareRotate",
      keyframes: rotate(axis),
      loop: true,
      duration: 4000,
      easing: "linear",
    });
  }, [axis]);

  return (
    <div className={clsx("Container", containerClass)}>
      <div className={clsx("Note", note)}>
        <ReactMd fileName="./SquareRotate.md" />
      </div>
      <Square {...square2} className="SquareRotate" />
      <div className={clsx("Legend", legend)}>{form}</div>
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
