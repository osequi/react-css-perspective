import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
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
 * Defines the styles
 */
const useStyles = makeStyles((theme) => ({}));

/**
 * Displays the component
 */
const SquareOrigin = (props) => {
  const { square } = props;
  const { container } = square;

  /**
   * Loads the styles
   */
  const { container: containerClass, legend, note } = DemoStyles(props);

  /**
   * Loads docs
   */
  const { markdown } = useMarkdown(docFile);

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
