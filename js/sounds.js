// sounds.js

function initSounds() {
  var list = document.getElementById('sounds-list');
  if (!list) return;
  if (typeof guitars === 'undefined') return;

  var withVideos = [];
  var withoutVideos = [];

  for (var i = 0; i < guitars.length; i++) {
    var g = guitars[i];
    if (g.videos && g.videos.length > 0) {
      withVideos.push(g);
    } else {
      withoutVideos.push(g);
    }
  }

  var allSorted = withVideos.concat(withoutVideos);
  var html = '';

  for (var rowIndex = 0; rowIndex < allSorted.length; rowIndex++) {
    var g = allSorted[rowIndex];
    var videos = g.videos || [];
    var mediaHtml = '';

    if (videos.length === 0) {
      mediaHtml = '<div class="no-video"><div class="label">No video yet</div><p>Coming soon</p></div>';
    } else if (videos.length === 1) {
      mediaHtml =
        '<p style="font-family:var(--font-mono);font-size:0.65rem;color:var(--accent);letter-spacing:0.08em;margin-bottom:0.75rem;text-transform:uppercase;">' + videos[0].title + '</p>' +
        '<div class="video-embed">' +
          '<iframe src="https://www.youtube.com/embed/' + videos[0].id + '" title="' + videos[0].title + '" allowfullscreen></iframe>' +
        '</div>';
    } else {
      var tabsId = 'tabs-' + rowIndex;
      var iframeId = 'iframe-' + rowIndex;
      var tabsHtml = '';
      for (var t = 0; t < videos.length; t++) {
        tabsHtml += '<button class="sound-video-tab ' + (t === 0 ? 'active' : '') + '" data-iframe="' + iframeId + '" data-src="https://www.youtube.com/embed/' + videos[t].id + '" data-title="' + videos[t].title + '">' + videos[t].title + '</button>';
      }
      mediaHtml =
        '<div class="sound-video-tabs" id="' + tabsId + '">' + tabsHtml + '</div>' +
        '<div class="video-embed">' +
          '<iframe id="' + iframeId + '" src="https://www.youtube.com/embed/' + videos[0].id + '" title="' + videos[0].title + '" allowfullscreen></iframe>' +
        '</div>';
    }

    html +=
      '<div class="sound-row">' +
        '<div class="sound-guitar-info">' +
          '<div class="sound-guitar-make">' + g.make + '</div>' +
          '<div class="sound-guitar-name">' + g.model + '</div>' +
          '<div class="sound-guitar-year">' + (g.year || 'c.' + g.acquiredYear) + '</div>' +
          '<a href="pages/guitar.html?id=' + g.id + '" class="sound-guitar-link">Guitar page</a>' +
        '</div>' +
        '<div>' + mediaHtml + '</div>' +
      '</div>';
  }

  list.innerHTML = html;

  list.addEventListener('click', function(e) {
    if (!e.target.matches('.sound-video-tab')) return;
    var iframeId = e.target.dataset.iframe;
    var iframe = document.getElementById(iframeId);
    if (!iframe) return;
    iframe.src = e.target.dataset.src;
    iframe.title = e.target.dataset.title;
    var tabsContainer = e.target.closest('.sound-video-tabs');
    tabsContainer.querySelectorAll('.sound-video-tab').forEach(function(t) { t.classList.remove('active'); });
    e.target.classList.add('active');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSounds);
} else {
  initSounds();
}
