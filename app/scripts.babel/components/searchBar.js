import React, { PropTypes } from 'react';
import { compose, withHandlers, withState } from 'recompose';

const searchBar = ({ onChange }) => {
  return <input type="text"></input>;
};

const enhance = compose(
  withHandlers({
    onChange: props => () => {
    },
  })
);

export default enhance(searchBar);
