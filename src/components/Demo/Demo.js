import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

/**
 * Imports other components and hooks
 */
import { Headings } from "@bit/osequi.test.react-semantic-elements";
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
    overflowX: "hidden",
  },
}));

/**
 * Displays the component
 */
const Demo = (props) => {
  const { container } = useStyles(props);

  /**
   * Loads docs
   */
  const { markdown } = useMarkdown(docFile);

  return (
    <div className={clsx("Demo", container)}>
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
export { propTypes as DemoPropTypes, defaultProps as DemoDefaultProps };
