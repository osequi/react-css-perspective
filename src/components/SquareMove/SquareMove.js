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
    title: "Move on:",
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
 * Updates the Controls with values.
 * - Since `controls` use `shortid.generate()` they can't be defined together with `values` which change. This would cause endless re-renders
 * - Therefore, first, `controls` are defined with `shortid` as static props.
 * - Then they are updated with dynamic values.
 */
const updateControls = (props) => {
  const { square, controls } = props;
  const { items } = controls;
  const { container } = square;
  const { isPerspectiveOn, perspective, perspectiveOrigin } = container;

  const items2 =
    items &&
    items.map((item) => {
      const { label } = item;

      if (label === "Use perspective") {
        return { ...item, value: isPerspectiveOn };
      }

      if (label === "Set perspective") {
        return { ...item, value: perspective };
      }

      if (label === "Set perspective origin") {
        return { ...item, value: perspectiveOrigin };
      }

      return item;
    });

  return { ...controls, items: items2 };
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
   * Prepares props for Square
   */
  const container2 = {
    ...container,
    perspective: perspective,
    isPerspectiveOn: isPerspectiveOn,
    perspectiveOrigin: perspectiveOrigin,
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
      <div className={clsx("Legend", legend)}>{form}</div>
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
