import '../../styles/github.css';
import { Component } from 'react';
import list from '../components/List';
import {
  GET_REPOS_BY_TAG_URL as getRepoByTags,
} from '../config';

class ListRepo extends Component {
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
      .then(arrRepos => (
        [...arrRepos, ...arrRepos, ...arrRepos, ...arrRepos, ...arrRepos, ...arrRepos, ...arrRepos]
      ))
      .then(arrRepos => {
        this.setState({ repos: arrRepos });
        return arrRepos;
      })
      .catch(console.log);
  }
  render() {
    return list(this.state.repos);
  }
}

export default ListRepo;
