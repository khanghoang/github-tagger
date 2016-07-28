import React, { Component } from 'react';

class GLink extends Component {

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { url } = this.props;
    // chrome.tabs.create({ url: url });
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, "start");
    });
  }

  render() {
    return (
      <div onClick={this.onClick}>{this.props.children}</div>
    );
  }
}

export default GLink;
