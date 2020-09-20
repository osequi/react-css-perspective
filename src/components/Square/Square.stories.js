import React from "react";
import { storiesOf } from "@storybook/react";

import Square from "./Square";
import description from "./Square.md";

storiesOf("Square", module).add("Overview", () => <Square />, {
  notes: { markdown: description }
});
