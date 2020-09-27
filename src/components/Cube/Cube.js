import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

/**
 * Defines the prop types
 */

const sideNames = ["front", "back", "left", "right", "top", "bottom"];

const propTypes = {
  container: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.height,
    perspective: PropTypes.string,
    perspectiveOrigin: PropTypes.string,
    isPerspectiveOn: PropTypes.bool,
    className: PropTypes.string,
  }),
  cube: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.height,
    transformStyle: PropTypes.oneOf(["preserve-3d", "flat"]),
    className: PropTypes.string,
  }),
  side: PropTypes.shape({
    opacity: PropTypes.number,
    className: PropTypes.string,
  }),
  sides: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOf(sideNames),
      key: PropTypes.string,
      content: PropTypes.any,
    })
  ),
};

/**
 * Defines the default props
 */
const defaultProps = {
  container: {
    width: "400px",
    height: "400px",
    perspective: "800px",
    perspectiveOrigin: "top right",
    isPerspectiveOn: true,
    className: "CubeContainer",
  },
  cube: {
    width: "200px",
    height: "200px",
    transformStyle: "preserve-3d",
    className: "Cube",
  },
  side: {
    opacity: 0.9,
    className: "Side",
  },
  sides: Array(6)
    .fill({})
    .map((item, index) => {
      return { name: sideNames[index], content: sideNames[index] };
    }),
};

/**
 * Defines the styles
 */
const useStyles = makeStyles((theme) => ({
  container: (props) => ({
    width: props.container.width,
    height: props.container.height,
    perspective: props.container.isPerspectiveOn
      ? props.container.perspective
      : "none",
    perspectiveOrigin: props.container.perspectiveOrigin,

    border: "1px solid",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),

  cube: (props) => ({
    width: props.cube.width,
    height: props.cube.height,
    transformStyle: props.cube.transformStyle,
    position: "relative",
  }),

  side: (props) => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    border: "1px solid",
    opacity: props.opacity,
  }),

  front: (props) => ({
    transform: `translateZ(calc(${props.cube.width} / 2))`,
  }),

  back: (props) => ({
    transform: `translateZ(calc(-${props.cube.width} / 2))`,
  }),

  left: (props) => ({
    transform: `rotateY(90deg) translateZ(calc(${props.cube.width} / 2))`,
  }),

  right: (props) => ({
    transform: `rotateY(-90deg) translateZ(calc(${props.cube.width} / 2))`,
  }),

  top: (props) => ({
    transform: `rotateX(90deg) translateZ(calc(${props.cube.width} / 2))`,
  }),

  bottom: (props) => ({
    transform: `rotateX(-90deg) translateZ(calc(${props.cube.width} / 2))`,
  }),
}));

/**
 * Displays the component
 */
const Cube = (props) => {
  const { container, cube, side, sides } = props;
  const { className: containerClassName } = container;
  const { className: cubeClassName } = cube;
  const { className: sideClassName } = side;
  const {
    container: containerKlass,
    cube: cubeKlass,
    side: sideKlass,
    front,
    back,
    left,
    right,
    top,
    bottom,
  } = useStyles(props);

  const sideKlasses = [front, back, left, right, top, bottom];

  const sidesHtml =
    sides &&
    sides.map((item, index) => {
      const { key, content } = item;

      return (
        <div
          key={key}
          className={clsx(sideClassName, sideKlass, sideKlasses[index])}
        >
          {content}
        </div>
      );
    });

  return (
    <div className={clsx(containerClassName, containerKlass)}>
      <div className={clsx(cubeClassName, cubeKlass)}>{sidesHtml}</div>
    </div>
  );
};

Cube.propTypes = propTypes;
Cube.defaultProps = defaultProps;

export default Cube;
export { propTypes as CubePropTypes, defaultProps as CubeDefaultProps };
