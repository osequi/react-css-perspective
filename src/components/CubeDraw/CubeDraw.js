import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import shortid from "shortid";

/**
 * Imports other components and hooks
 */
import Cube, { CubePropTypes, CubeDefaultProps } from "../Cube";

/**
 * Defines the prop types
 */
const propTypes = {
  cube: PropTypes.shape(CubePropTypes),
};

/**
 * Defines the default props
 */
const defaultProps = {
  cube: {
    ...CubeDefaultProps,
    sides: CubeDefaultProps.sides.map((item) => {
      return { ...item, key: shortid.generate() };
    }),
  },
};

/**
 * Displays the component
 */
const CubeDraw = (props) => {
  const { cube } = props;

  return <Cube {...cube} />;
};

CubeDraw.propTypes = propTypes;
CubeDraw.defaultProps = defaultProps;

export default CubeDraw;
export { propTypes as CubeDrawPropTypes, defaultProps as CubeDrawDefaultProps };
