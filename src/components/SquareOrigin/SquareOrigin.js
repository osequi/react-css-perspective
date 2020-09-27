import React from "react";
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
import docFile from "./SquareOrigin.md";

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
  square: { ...SquareDefaultProps, isPerspectiveOn: true },
  controls: {
    title: "Move and rotate:",
    items: [
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
        value: "240",
      },
      {
        id: shortid.generate(),
        type: "text",
        label: "Set perspective origin",
        value: "50% 50%",
      },
    ],
  },
};

/**
 * Defines the styles
 */
const useStyles = makeStyles((theme) => ({
  squares: {
    display: "flex",
    flexDirection: "column",
  },
  squareRotated: {
    transform: "rotateY(90deg)",
  },
  animationMove: {
    animation: `$moveSquare 4s infinite ease-in-out alternate;`,
  },
  "@keyframes moveSquare": {
    "0%": {
      transform: "translateX(-100px) rotateY(90deg)",
    },
    "100%": {
      transform: "translateX(100px) rotateY(90deg)",
    },
  },
}));

/**
 * Displays the component
 */
const SquareOrigin = (props) => {
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
  const { squares, squareRotated, animationMove } = useStyles(props);

  /**
   * Loads docs
   */
  const { markdown } = useMarkdown(docFile);

  return (
    <>
      <div className={clsx("Container", containerClass)}>
        <div
          className={clsx("Note", note)}
          dangerouslySetInnerHTML={{ __html: markdown }}
        />
        <div className={clsx("Squares", squares)}>
          <Square
            {...square2}
            className={clsx("SquareOrigin", squareRotated, animationMove)}
          />
          <Square
            {...square2}
            className={clsx("SquareOrigin2", squareRotated)}
            isContainerAnimated={true}
          />
        </div>
        <div className={clsx("Legend", legend)}>{form}</div>
      </div>
    </>
  );
};

SquareOrigin.propTypes = propTypes;
SquareOrigin.defaultProps = defaultProps;

export default SquareOrigin;
export {
  propTypes as SquareOriginPropTypes,
  defaultProps as SquareOriginDefaultProps,
};
