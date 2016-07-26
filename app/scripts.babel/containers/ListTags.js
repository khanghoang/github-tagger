import { Component } from 'react';
import list from '../components/List';
import {
  GET_REPOS_BY_TAG_URL as getRepoByTags,
} from '../config';

class ListTags extends Component {
  constructor() {
    super();
    this.state = {
      repos: [],
    };
  }
  componentDidMount() {
    fetch(getRepoByTags('javascript'))
      .then(res => res.json()) // parse repo
      .then(res => res.data) // extract repos
      .then(arrRepos => {
        this.setState({ repos: arrRepos });
        return arrRepos;
      })
      .catch(console.log);
  }
  render() {
    const names = this.state.repos.map(r => r.name);
    return list(names);
  }
}

export default ListTags;
