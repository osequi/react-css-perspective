import React from "react";
import { storiesOf } from "@storybook/react";

import CubeDraw from "./CubeDraw";
import description from "./CubeDraw.md";

storiesOf("CubeDraw", module).add("Overview", () => <CubeDraw />, {
  notes: { markdown: description }
});
