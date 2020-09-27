import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import shortid from "shortid";

import anime from "animejs";
import useControls, {
  useControlsPropTypes,
} from "@bit/osequi.test.use-controls";

/**
 * Imports other components and hooks
 */
import Square, { SquarePropTypes, SquareDefaultProps } from "../Square";
import useMarkdown from "@osequi/use-markdown";

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
    title: "Move on:",
    items: [],
  },
};

/**
 * Defines the animations
 */
const move = () => {
  return [
    { translateX: -100 },
    { translateX: 0 },
    { translateX: 100 },
    { translateX: 0 },
  ];
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
const SquareOrigin = (props) => {
  const { square } = props;
  const { container } = square;

  /**
   * Loads the styles
   */
  const { container: containerClass, legend, note } = useStyles(props);

  /**
   * Loads docs
   */
  const { markdown } = useMarkdown(docFile);

  /**
   * Updates the animation from Controls
   */
  useEffect(() => {
    anime.set(".SquareOrigin", { rotateY: 90 });
    anime({
      targets: ".SquareOrigin",
      keyframes: move(),
      loop: true,
      duration: 2000,
      easing: "linear",
    });
  }, []);

  return (
    <div className={clsx("Container", containerClass)}>
      <div
        className={clsx("Note", note)}
        dangerouslySetInnerHTML={{ __html: markdown }}
      />
      <Square {...square} className={clsx("SquareOrigin")} />
      <div className={clsx("Legend", legend)}></div>
    </div>
  );
};

SquareOrigin.propTypes = propTypes;
SquareOrigin.defaultProps = defaultProps;

export default SquareOrigin;
export {
  propTypes as SquareOriginPropTypes,
  defaultProps as SquareOriginDefaultProps,
};