import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

/**
 * Imports other components and hooks
 */
import useMarkdown from "@osequi/use-markdown";
import SquareMove from "../SquareMove";
import SquareRotate from "../SquareRotate";
import SquareOrigin from "../SquareOrigin";

/**
 * Imports docs
 */
import docFile from "./Demo.md";

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
const Demo = (props) => {
  /**
   * Loads docs
   */
  const { markdown } = useMarkdown(docFile);

  return (
    <div className={clsx("Demo")}>
      <div dangerouslySetInnerHTML={{ __html: markdown }} />
      <SquareMove />
      <SquareRotate />
      <SquareOrigin />
    </div>
  );
};

Demo.propTypes = propTypes;
Demo.defaultProps = defaultProps;

export default Demo;
export {
  propTypes as DemoPropTypes,
  defaultProps as DemoDefaultProps,
  useStyles as DemoStyles,
};
