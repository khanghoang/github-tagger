const BASE_URL = process.env.PRODUCTION ? 'https://github-tagger.herokuapp.com' : 'http://127.0.0.1:3333';

export const GET_REPOS_URL = `${BASE_URL}/getRepo`;
export const GET_REPOS_BY_TAG_URL = (tags) => (
  `${GET_REPOS_URL}?tags=${tags}`
);

export const GET_TAGS_URL = `${BASE_URL}/tags`;
export const GITHUB_LOGIN_URL = `${BASE_URL}/auth/github`;
export const SAVE_REPO_URL = `${BASE_URL}/save`;
