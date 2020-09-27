import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import shortid from "shortid";

/**
 * Imports other components and hooks
 */
import Cube, { CubePropTypes, CubeDefaultProps } from "../Cube";
import { updateControls } from "../SquareMove";
import useControls, {
  useControlsPropTypes,
} from "@bit/osequi.test.use-controls";
import { DemoStyles } from "../Demo";
import useMarkdown from "@osequi/use-markdown";

/**
 * Imports docs
 */
import docFile from "./CubeDraw.md";

/**
 * Defines the prop types
 */
const propTypes = {
  cube: PropTypes.shape(CubePropTypes),
  controls: PropTypes.shape(useControlsPropTypes),
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
  controls: {
    ...useControlsPropTypes,
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
 * Displays the component
 */
const CubeDraw = (props) => {
  const { cube } = props;
  const { container } = cube;
  const { container: containerClass, legend, note } = DemoStyles(props);

  /**
   * Loads the controls
   */
  const controls = updateControls({ ...props, square: cube });
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
   * Updates the Cube from Controls
   */
  const container2 = {
    ...container,
    perspective: perspective,
    isPerspectiveOn: isPerspectiveOn,
    perspectiveOrigin: perspectiveOrigin,
  };

  const cube2 = { ...cube, container: container2 };

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
      <Cube {...cube2} />
      <div className={clsx("Legend", legend)}>{form}</div>
    </div>
  );
};

CubeDraw.propTypes = propTypes;
CubeDraw.defaultProps = defaultProps;

export default CubeDraw;
export { propTypes as CubeDrawPropTypes, defaultProps as CubeDrawDefaultProps };
