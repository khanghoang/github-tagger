import React from 'react';
import GLink from './GLink';

const Tag = ({ tag }) => (
  <div key={tag._id} className="btn btn-sm h-space-s">
    {tag.name}
  </div>
);


const ListItem = ({ repo }) => {
  const tags = repo.tags.map(t => <Tag tag={t} />);
  const [username, repoName] = repo.name.split('/');
  const userLink = (<GLink url={`https://github.com/${username}`}>{username}</GLink>);
  const repoLink = (<GLink url={`https://github.com/${username}/${repoName}`}>{repoName}</GLink>);
  return (
    <li key={repo._id} className="v-space-m">
      {userLink} / {repoLink}
      <div className="v-space-s">
        {tags}
      </div>
    </li>
  );
};

export default ListItem;
