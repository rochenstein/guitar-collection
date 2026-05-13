// home.js

function initHome() {
  var recentGrid = document.getElementById('recent-grid');
  if (!recentGrid) return;
  if (typeof guitars === 'undefined') return;

  var recent = guitars.slice(-4).reverse();
  var html = '';

  for (var i = 0; i < recent.length; i++) {
    var g = recent[i];
    html +=
      '<a href="pages/guitar.html?id=' + g.id + '" class="guitar-card fade-up">' +
        '<div class="guitar-card-image">' +
          '<div class="guitar-card-image-placeholder">' + g.emoji + '</div>' +
          '<div class="guitar-card-number">' + g.number + '</div>' +
        '</div>' +
        '<div class="guitar-card-body">' +
          '<div class="guitar-card-make">' + g.make + '</div>' +
          '<div class="guitar-card-name">' + g.model + '</div>' +
          '<div class="guitar-card-meta">' +
            '<span>' + (g.year || 'c.' + g.acquiredYear) + '</span>' +
            '<span>' + g.acquired + '</span>' +
          '</div>' +
        '</div>' +
      '</a>';
  }

  recentGrid.innerHTML = html;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHome);
} else {
  initHome();
}
