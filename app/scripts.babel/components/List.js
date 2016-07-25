import React from 'react';
import listItem from './ListItem';

const List = (items) => {
  const arr = items.map(i => listItem(i));
  return (
    <ul>
    {arr}
    </ul>
  );
};

export default List;
