import React from 'react';
import { withHandlers, compose } from 'recompose';

const GLink = () => (
  <div onClick={this.onClick}>{this.props.children}</div>
);

const enhance = compose(
  withHandlers({
    onClick: ({ url }) => () => {
      chrome.tabs.create({ url });
    },
  })
);

export default enhance(GLink);
