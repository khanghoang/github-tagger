import React, { PropTypes } from 'react';
import { compose, withHandlers, withState } from 'recompose';

const searchBar = ({ onChange }) => {
  return <input style={{ width: '200px' }} type="text"></input>;
};

const enhance = compose(
  withHandlers({
    onChange: ({ repos }) => () => {
      return repos.filter((t, idx) => idx % 2);
    },
  })
);

export default enhance(searchBar);
