import {
  SAVE_REPO_URL,
} from './config';

chrome.runtime.onMessage.addListener(
  () => {
    console.info('ok');
  }
);

document.addEventListener('DOMContentLoaded', () => {
  console.log('\'Allo \'Allo! Content script');
  const $button = $('.js-toggler-container.js-social-container.starring-container');

  function saveRepoWithTags(repoName, tags) {
    const buildForm = (params) => {
      const searchParams = Object.keys(params).map((key) => (
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )).join('&');
      return searchParams;
    };

    return fetch(SAVE_REPO_URL, {
      method: 'POST',
      body: buildForm({
        tags,
        name: repoName,
      }),
      credentials: 'include',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      }),
    })
      .catch(err => {
        console.log(err);
      });
  }


  function saveRepo() {
    const $headerContainer = $('.repohead-details-container').first();
    const authorStr = $headerContainer.find('.author > a').text();
    const projectStr = $headerContainer.find('strong > a').text();
    const tags = $('#github-tagger-tags').val();
    const repoName = `${authorStr}/${projectStr}`;
    return saveRepoWithTags(repoName, tags);
  }

  function addEventListener($btn) {
    $btn.find('.btn').on('click', () => {
      const isStarted = $button.hasClass('on');
      if (isStarted) {
        $button.removeClass('open');
        return;
      }

      if ($button.hasClass('open')) {
        $button.removeClass('open');
      } else {
        $button.addClass('open');
      }
    });

    /* eslint-disable */

    const $modal = $(`
      <div class="dropdown-menu select-menu-modal-holder dropdown-menu-content js-menu-content" aria-hidden="false">
        <div class="clone-options ssh-clone-options">
          <h4 class="mb-1">
            Add tags and spread this repo
            <a class="muted-link" href="https://help.github.com/articles/which-remote-url-should-i-use" target="_blank">
              <svg aria-hidden="true" class="octicon octicon-question" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M6 10h2v2H6v-2zm4-3.5C10 8.64 8 9 8 9H6c0-.55.45-1 1-1h.5c.28 0 .5-.22.5-.5v-1c0-.28-.22-.5-.5-.5h-1c-.28 0-.5.22-.5.5V7H4c0-1.5 1.5-3 3-3s3 1 3 2.5zM7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"></path></svg>
            </a>
          </h4>
          <p class="mb-2 get-repo-decription-text">
            Tags are separated by commas (ex: javascript, es6)
          </p>

          <div class="input-group js-zeroclipboard-container">
            <input type="text" id="github-tagger-tags" class="form-control input-monospace input-sm js-zeroclipboard-target js-url-field" value="javascript, es6" aria-label="Clone this repository at git@github.com:mmai/Category-Theory-for-the-Sciences.git">
            <div class="input-group-button">
              <button id="github-tagger-save-button" aria-label="Save tags" class="js-zeroclipboard btn btn-sm zeroclipboard-button tooltipped tooltipped-s" data-copied-hint="Saving..." type="button">Save tags</button>
            </div>
          </div>
        </div>
      </div>
      `);

    /* eslint-enable */

    $button.append($modal);
    $button.parent().addClass('dropdown');

    $button.find('#github-tagger-save-button').on('click', () => {
      saveRepo()
        .then(() => {
          $button.removeClass('open');
        });
    });
  }

  function start() {
    addEventListener($button);
  }

  start();
});
