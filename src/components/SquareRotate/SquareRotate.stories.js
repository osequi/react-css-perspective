import React from "react";
import { storiesOf } from "@storybook/react";

import SquareRotate from "./SquareRotate";
import description from "./SquareRotate.md";

storiesOf("SquareRotate", module).add("Overview", () => <SquareRotate />, {
  notes: { markdown: description }
});
