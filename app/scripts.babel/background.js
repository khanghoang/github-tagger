const isProduction = process.env.NODE_ENV === 'production';
const isLocal = process.env.LOCAL;

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

const badgeText = `${isProduction ? 'P' : 'D'}/${isLocal ? 'L' : 'H'}`;

chrome.browserAction.setBadgeText({ text: badgeText });

console.log('\'Allo \'Allo! Event Page for Browser Action');
