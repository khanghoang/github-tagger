import React from 'react';
import GLink from './GLink';

const Tag = ({ tag }) => (
  <div key={tag._id} className="btn btn-sm h-space-s">
    {tag.name}
  </div>
);


const ListItem = ({ repo }) => {
  let tags = repo.tags.map(t => <Tag tag={t} />);
  return (
    <li key={repo._id} className="v-space-m">
      <GLink url={`https://github.com/${repo.name}`}>{repo.name}</GLink>
      <div className="v-space-s">
        {tags}
      </div>
    </li>
  );
};

export default ListItem;
