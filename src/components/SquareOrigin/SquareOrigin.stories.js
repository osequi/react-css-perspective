import React from "react";
import { storiesOf } from "@storybook/react";

import SquareOrigin from "./SquareOrigin";
import description from "./SquareOrigin.md";

storiesOf("SquareOrigin", module).add("Overview", () => <SquareOrigin />, {
  notes: { markdown: description }
});
