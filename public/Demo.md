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

## Gotchas

- Using this property creates a new stacking context. This means the children can overflow its container.

## Resources

- [How CSS Perspective Works](https://css-tricks.com/how-css-perspective-works)
- [perspective on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective)
