import React from "react";
import { storiesOf } from "@storybook/react";

import SquareMove from "./SquareMove";
import description from "./SquareMove.md";

storiesOf("SquareMove", module).add("Overview", () => <SquareMove />, {
  notes: { markdown: description }
});
