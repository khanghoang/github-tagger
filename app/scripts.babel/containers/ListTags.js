/* global chrome */

import '../../styles/github.css';
import React, { Component } from 'react';
import List from '../components/List';
import {
  GET_REPOS_BY_TAG_URL as getRepoByTags,
  BASE_URL,
  GITHUB_LOGIN_URL,
} from '../config';

class ListRepo extends Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      isLoggedIn: false,
    };

    this.onClick = this.onClick.bind(this);
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

  render() {
    const listRepos = <List repos={this.state.repos} />;
    const login = !this.state.isLoggedIn && (<div onClick={this.onClick}>Login with github</div>);
    return (
      <div>
        {login}
        {listRepos}
      </div>
    );
  }
}

export default ListRepo;
