import React from 'react';
import ReactDOM from 'react-dom';
import ListTags from './containers/ListTags';

let _gaq = _gaq || []; // eslint-disable-line
_gaq.push(['_setAccount', 'UA-81730674-1']);
_gaq.push(['_trackPageview']);

(() => {
  const ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  const s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

ReactDOM.render(
  (<ListTags />),
  document.getElementById('content')
);

console.log('\'Allo \'Allo! Popup');
