import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import shortid from "shortid";

import anime from "animejs";
import ReactMd from "react-md-file";

/**
 * Imports other components and hooks
 */
import Square, { SquarePropTypes, SquareDefaultProps } from "../Square";
import useControls, {
  useControlsPropTypes,
} from "@bit/osequi.test.use-controls";

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
    title: "Controls demo",
    items: [
      { id: shortid.generate(), type: "text", label: "Text", value: "text" },
      {
        id: shortid.generate(),
        type: "checkbox",
        label: "Checkbox",
        value: true,
      },
      {
        id: shortid.generate(),
        type: "radio",
        label: "Radio",
        value: "Y",
        items: [
          {
            id: shortid.generate(),
            label: "X",
            value: "X",
          },
          {
            id: shortid.generate(),
            label: "Y",
            value: "Y",
          },
          {
            id: shortid.generate(),
            label: "Z",
            value: "Z",
          },
        ],
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
 * Displays the component
 */
const SquareMove = (props) => {
  const { square, controls } = props;
  const { container } = square;
  const { isPerspectiveOn, perspective, perspectiveOrigin } = container;

  /**
   * Loads the styles
   */
  const { container: containerClass, legend, note } = useStyles(props);

  const controls2 = {
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

  const [values, form] = useControls(controls2);

  console.log("form:", form);
  console.log("values:", values);

  return (
    <div className={clsx("Container", containerClass)}>
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
