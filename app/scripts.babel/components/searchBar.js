import React, { PropTypes } from 'react';
import { setPropTypes, compose, withProps, withHandlers } from 'recompose';
import fuzzy from 'fuzzy';

const searchBar = ({ onChange }) => (
  <input onChange={onChange} style={{ width: '300px' }} type="text"></input>
);

const enhance = compose(
  withProps(() => ({
    searchOptions: {
      pre: '<',
      post: '>',
      extract: (repo) => {
        const tagsStr = repo.tags.reduce((acc, t) => (
          `${acc} ${t.name}`
        ), '');
        return `${repo.name} ${tagsStr}`;
      },
    },
  })),
  withHandlers({
    onChange: ({ repos, onResults, searchOptions }) => e => {
      const results = fuzzy.filter(e.target.value, repos, searchOptions);
      onResults(results.map(r => r.original));
    },
  }),

  setPropTypes({
    onChange: PropTypes.func,
  })
);

export default enhance(searchBar);
