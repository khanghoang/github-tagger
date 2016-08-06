import React, { PropTypes } from 'react';
import { setPropTypes, withHandlers, compose } from 'recompose';

const GLink = ({ onClick, children }) => (
  <b style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={onClick}>{children}</b>
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
