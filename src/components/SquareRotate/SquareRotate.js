import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import shortid from "shortid";

/**
 * Imports other components and hooks
 */
import Square, { SquarePropTypes, SquareDefaultProps } from "../Square";
import { updateControls } from "../SquareMove";
import { DemoStyles } from "../Demo";

import useMarkdown from "@osequi/use-markdown";
import useControls, {
  useControlsPropTypes,
} from "@bit/osequi.test.use-controls";

/**
 * Imports docs
 */
import docFile from "./SquareRotate.md";

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
  animationX: {
    animation: `$rotateOnX 4s infinite linear;`,
  },
  animationY: {
    animation: `$rotateOnY 4s infinite linear;`,
  },
  animationZ: {
    animation: `$rotateOnZ 4s infinite linear;`,
  },
  "@keyframes rotateOnX": {
    "100%": {
      transform: "rotateX(360deg)",
    },
  },
  "@keyframes rotateOnY": {
    "100%": {
      transform: "rotateY(360deg)",
    },
  },
  "@keyframes rotateOnZ": {
    "100%": {
      transform: "rotateZ(360deg)",
    },
  },
}));

/**
 * Displays the component
 */
const SquareRotate = (props) => {
  const { square } = props;
  const { container } = square;

  /**
   * Loads the docs
   */
  const { markdown } = useMarkdown(docFile);

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
   * Loads the styles
   */
  const { container: containerClass, legend, note } = DemoStyles(props);
  const { animationX, animationY, animationZ } = useStyles();
  const animation =
    axis === "X" ? animationX : axis === "Y" ? animationY : animationZ;

  return (
    <div className={clsx("Container", containerClass)}>
      <div
        className={clsx("Note", note)}
        dangerouslySetInnerHTML={{ __html: markdown }}
      />
      <Square {...square2} className={clsx("SquareRotate", animation)} />
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
