import path from 'path';

const BASE_URL = 'https://github-tagger.herokuapp.com';

export const GET_REPOS_URL = path.join(BASE_URL, 'getRepo');
export const GET_REPOS_BY_TAG_URL = (tags) => (
  `${GET_REPOS_URL}?tags=${tags}`
);

export const GET_TAGS_URL = path.join(BASE_URL, 'tags');
