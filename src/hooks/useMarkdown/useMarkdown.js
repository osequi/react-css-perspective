import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import marked from "marked";

/**
 * Defines the prop types
 */
const propTypes = {
  file: PropTypes.string,
};

/**
 * Defines the default props
 */
const defaultProps = {
  file: PropTypes.string,
};

/**
 * Displays the component
 */
const useMarkdown = (file) => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(file)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setMarkdown(marked(text));
      });
  }, [file]);

  const html = <div dangerouslySetInnerHTML={{ __html: markdown }} />;

  return { markdown: markdown, html: html };
};

useMarkdown.propTypes = propTypes;
useMarkdown.defaultProps = defaultProps;

export default useMarkdown;
export {
  propTypes as useMarkdownPropTypes,
  defaultProps as useMarkdownDefaultProps,
};
