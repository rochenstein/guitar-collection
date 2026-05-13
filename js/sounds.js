// sounds.js

document.addEventListener('DOMContentLoaded', function() {
  const withVideos = guitars.filter(g => g.videos && g.videos.length > 0);
  const withoutVideos = guitars.filter(g => !g.videos || g.videos.length === 0);
  const allSorted = [...withVideos, ...withoutVideos];

  document.getElementById('sounds-list').innerHTML = allSorted.map((g, rowIndex) => {
    const videos = g.videos || [];

    let mediaHtml;
    if (videos.length === 0) {
      mediaHtml = `
        <div class="no-video">
          <div class="label">No video yet</div>
          <p>Coming soon</p>
        </div>`;
    } else if (videos.length === 1) {
      mediaHtml = `
        <p style="font-family:var(--font-mono);font-size:0.65rem;color:var(--accent);letter-spacing:0.08em;margin-bottom:0.75rem;text-transform:uppercase;">${videos[0].title}</p>
        <div class="video-embed">
          <iframe src="https://www.youtube.com/embed/${videos[0].id}" title="${videos[0].title}" allowfullscreen></iframe>
        </div>`;
    } else {
      const tabsId = 'tabs-' + rowIndex;
      const iframeId = 'iframe-' + rowIndex;
      mediaHtml = `
        <div class="sound-video-tabs" id="${tabsId}">
          ${videos.map((v, i) => '<button class="sound-video-tab ' + (i === 0 ? 'active' : '') + '" data-iframe="' + iframeId + '" data-src="https://www.youtube.com/embed/' + v.id + '" data-title="' + v.title + '">' + v.title + '</button>').join('')}
        </div>
        <div class="video-embed">
          <iframe id="${iframeId}" src="https://www.youtube.com/embed/${videos[0].id}" title="${videos[0].title}" allowfullscreen></iframe>
        </div>`;
    }

    return `
      <div class="sound-row fade-up">
        <div class="sound-guitar-info">
          <div class="sound-guitar-make">${g.make}</div>
          <div class="sound-guitar-name">${g.model}</div>
          <div class="sound-guitar-year">${g.year || 'c.' + g.acquiredYear}</div>
          <a href="pages/guitar.html?id=${g.id}" class="sound-guitar-link">Guitar page →</a>
        </div>
        <div>${mediaHtml}</div>
      </div>`;
  }).join('');

  document.getElementById('sounds-list').addEventListener('click', function(e) {
    if (!e.target.matches('.sound-video-tab')) return;
    var iframeId = e.target.dataset.iframe;
    var iframe = document.getElementById(iframeId);
    iframe.src = e.target.dataset.src;
    iframe.title = e.target.dataset.title;
    var tabsContainer = e.target.closest('.sound-video-tabs');
    tabsContainer.querySelectorAll('.sound-video-tab').forEach(function(t) { t.classList.remove('active'); });
    e.target.classList.add('active');
  });
});
