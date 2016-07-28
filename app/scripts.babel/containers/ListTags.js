import '../../styles/github.css';
import React, { Component } from 'react';
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

    this.onClick = this.onClick.bind(this);
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

  onClick(e) {

    // Prevent default anchor event
    e.preventDefault();
    // Set values for window
    const intWidth = '500';
    const intHeight = '400';
    const strResize = 'no';

    // Set title and open popup with focus on it
    const title = 'Login with github';
    const strParam = `width=${intWidth},height=${intHeight}',resizable='${strResize}'`;
    const url = 'http://localhost:3333/auth/github';
    window.open(url, title, strParam).focus();
  }

  render() {
    const listRepos = list(this.state.repos);
    return (
      <div>
        <div onClick={this.onClick}>Login with github</div>
        {listRepos}
      </div>
    );
  }
}

export default ListRepo;
