import React from 'react';
import ListItem from './ListItem';

const List = ({ repos }) => {
  const arr = repos.map(repo => <ListItem repo={repo} />);
  return (
    <ul>
    {arr}
    </ul>
  );
};

export default List;
