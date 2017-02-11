/* global chrome */

import '../../styles/github.css';
import React, { Component } from 'react';
import List from '../components/List';
import {
  GET_REPOS_BY_TAG_URL as getRepoByTags,
  BASE_URL,
  GITHUB_LOGIN_URL,
} from '../config';
import SearchBar from '../components/searchBar';

class ListRepo extends Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      isLoggedIn: false,
      searchResults: [],
    };

    this.onClick = this.onClick.bind(this);
    this.onResults = this.onResults.bind(this);
  }
  componentDidMount() {
    chrome.cookies.getAll({ url: BASE_URL }, (arrCookies) => {
      if (arrCookies.length > 0) {
        this.setState({ isLoggedIn: true });
      }
    });

    fetch(getRepoByTags(''), {
      credentials: 'include',
    })
    .then(res => res.json()) // parse repo
    .then(res => res.data) // extract repos
    .then(arrRepos => {
      this.setState({ repos: arrRepos });
      return arrRepos;
    })
    .catch(console.log.bind(console));
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
    window.open(GITHUB_LOGIN_URL, title, strParam).focus();
  }

  onResults(results) {
    console.log(results);
    this.setState({
      searchResults: results,
    });
  }

  render() {
    const loadingText = this.state.repos.length ? null : (
      <div className="v-space-m"><b>Hang on, we are fetching repos...</b></div>
    );

    const listRepos = this.state.searchResults.length ?
      (<List repos={this.state.searchResults} />) :
      (<List repos={this.state.repos} />);

    const login = !this.state.isLoggedIn &&
      (<b style={{ textDecoration: 'pointer' }} onClick={this.onClick}>Login with github</b>);

    const searchBar = this.state.repos.length ?
      (<SearchBar repos={this.state.repos} onResults={this.onResults} />) : null;
    return (
      <div>
      {login}
      {searchBar}
      {loadingText}
      <p>ababc</p>
      {listRepos}
      </div>
    );
  }
}

export default ListRepo;
