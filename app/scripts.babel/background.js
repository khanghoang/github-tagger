const isProduction = process.env.NODE_ENV === 'production';
const isLocal = process.env.LOCAL;

if (process.PLAYSTORE) {
  const badgeText = `${isProduction ? 'P' : 'D'}/${isLocal ? 'L' : 'H'}`;
  chrome.browserAction.setBadgeText({ text: badgeText });
}
