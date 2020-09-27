# CSS Perspective

- It makes the Z axis visible / useful.
- Helpful when transforming (rotating/moving) objects in the 3D space.

## Syntax

### `perspective: <distance>`

- The distance from the user to the `Z` plane.
- `<distance>` is `<length>`. It takes values in `px`, `em`, `%`, `vh` etc.
- Initial value: `none`

### `perspective-origin: <position>`

- Determines the position at which the viewer is looking.
- `<position>` has two values, `<x-position>` and `<y-position>`.
- Each values are `<length-percentage`> which means `%`, `top`, `bottom`, `center`, `left`, `right`
- Initial value: `50% 50%`

### `transform: <transform-function>`

- Rotate, scale, skew, or translate an element.
- Multiple transform functions can be applied: translate, rotate, scale, skew, matrix, perspective.
- If perspective is one of multiple function values, it must be listed first.
- Only transformable elements can be transformed: elements whose layout is governed by the CSS box model except for: non-replaced inline boxes, table-column boxes, and table-column-group boxes.

## Good to know

- Using `perspective`, `transform` properties creates a new stacking context. This means the children can overflow its container.
- When rotating an object, its coordinate system is transformed along with the object.
- When translating an object, it moves relative to its own coordinate system (rather than its parent’s coordinates).
- The order in which these values are written can (and will) change the end result.
- The same result can be achieved by changing the order of transform functions and using different values for the functions.

## Resources

- [How CSS Perspective Works](https://css-tricks.com/how-css-perspective-works)
- [perspective on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective)
