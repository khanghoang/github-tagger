import { Component } from 'react';
import list from '../components/List';

class ListTags extends Component {
  componentDidMount() {
  }
  render() {
    const arr = ['es5', 'javascript', 'stuffs'];
    return list(arr);
  }
}

export default ListTags;
