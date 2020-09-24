import React from "react";
import { storiesOf } from "@storybook/react";

import useMarkdown from "./useMarkdown";
import description from "./useMarkdown.md";

storiesOf("useMarkdown", module).add("Overview", () => <useMarkdown />, {
  notes: { markdown: description }
});
