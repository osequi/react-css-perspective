import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

/**
 * Imports other components and hooks
 */
import Square from "../Square";

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

  return (
    <div className={clsx("Demo", container)}>
      <Square />
    </div>
  );
};

Demo.propTypes = propTypes;
Demo.defaultProps = defaultProps;

export default Demo;
export { propTypes as DemoPropTypes, defaultProps as DemoDefaultProps };
