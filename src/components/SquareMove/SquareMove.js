import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import shortid from "shortid";

import anime from "animejs";
import ReactMd from "react-md-file";
import useControls from "@bit/osequi.test.use-controls";

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
 * Defines the controls
 */
const getControls = (props) => {
  const { square } = props;
  const { container } = square;
  const { isPerspectiveOn, perspective, perspectiveOrigin } = container;

  return {
    title: "Move on:",
    items: [
      {
        id: "1",
        type: "radio",
        label: "Axes",
        value: "X",
        items: [
          {
            id: "1a",
            label: "X axis",
            value: "X",
          },
          {
            id: "1b",
            label: "Y axis",
            value: "Y",
          },
          {
            id: "1c",
            label: "Z axis",
            value: "Z",
          },
        ],
      },
      {
        id: "2",
        type: "checkbox",
        label: "Use perspective",
        value: isPerspectiveOn,
      },
      {
        id: "3",
        type: "text",
        label: "Set perspective",
        value: perspective,
      },
      {
        id: "4",
        type: "text",
        label: "Set perspective origin",
        value: perspectiveOrigin,
      },
    ],
  };
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
  const { isPerspectiveOn, perspective, perspectiveOrigin } = container;

  /**
   * Loads the styles
   */
  const { container: containerClass, legend, note } = useStyles(props);

  /**
   * Loads the controls
   */
  const controls = getControls(props);
  const [values, form] = useControls(controls);
  console.log("values:", values);

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
