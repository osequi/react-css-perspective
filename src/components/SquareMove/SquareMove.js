import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import shortid from "shortid";

/**
 * Imports other components and hooks
 */
import Square, { SquarePropTypes, SquareDefaultProps } from "../Square";
import { DemoStyles } from "../Demo";
import useMarkdown from "@osequi/use-markdown";
import useControls, {
  useControlsPropTypes,
} from "@bit/osequi.test.use-controls";

/**
 * Imports docs
 */
import docFile from "./SquareMove.md";

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
  animationX: {
    animation: `$moveOnX 2s infinite ease-in-out alternate`,
  },
  animationY: {
    animation: `$moveOnY 2s infinite ease-in-out alternate`,
  },
  animationZ: {
    animation: `$moveOnZ 2s infinite ease-in-out alternate`,
  },
  "@keyframes moveOnX": {
    "0%": {
      transform: "translateX(-50px)",
    },
    "100%": {
      transform: "translateX(50px)",
    },
  },
  "@keyframes moveOnY": {
    "0%": {
      transform: "translateY(-50px)",
    },
    "100%": {
      transform: "translateY(50px)",
    },
  },
  "@keyframes moveOnZ": {
    "0%": {
      transform: "translateZ(-50px)",
    },
    "100%": {
      transform: "translateZ(50px)",
    },
  },
}));

/**
 * Displays the component
 */
const SquareMove = (props) => {
  const { square } = props;
  const { container } = square;

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
   * Loads the styles
   */
  const { container: containerClass, legend, note } = DemoStyles(props);
  const { animationX, animationY, animationZ } = useStyles();
  const animation =
    axis === "X" ? animationX : axis === "Y" ? animationY : animationZ;

  /**
   * Loads the square
   */
  const container2 = {
    ...container,
    perspective: perspective,
    isPerspectiveOn: isPerspectiveOn,
    perspectiveOrigin: perspectiveOrigin,
  };

  const square2 = { ...square, container: container2 };

  /**
   * Loads the docs
   */
  const { markdown } = useMarkdown(docFile);

  return (
    <div className={clsx("Container", containerClass)}>
      <div
        className={clsx("Note", note)}
        dangerouslySetInnerHTML={{ __html: markdown }}
      />
      <Square {...square2} className={clsx("SquareMove", animation)} />
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
  updateControls,
};
