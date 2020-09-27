import React from "react";
import { storiesOf } from "@storybook/react";

import Cube from "./Cube";
import description from "./Cube.md";

storiesOf("Cube", module).add("Overview", () => <Cube />, {
  notes: { markdown: description }
});
