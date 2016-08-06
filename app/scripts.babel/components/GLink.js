import React, { PropTypes } from 'react';
import { setPropTypes, withHandlers, compose } from 'recompose';

const GLink = ({ onClick, children }) => (
  <div onClick={onClick}>{children}</div>
);

const enhance = compose(
  withHandlers({
    onClick: ({ url }) => () => {
      chrome.tabs.create({ url });
    },
  }),

  setPropTypes({
    onClick: PropTypes.string,
    children: PropTypes.node,
  })
);

export default enhance(GLink);
