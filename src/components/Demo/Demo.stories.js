import React from "react";
import { storiesOf } from "@storybook/react";

import Demo from "./Demo";
import description from "./Demo.md";

storiesOf("Demo", module).add("Overview", () => <Demo />, {
  notes: { markdown: description }
});
