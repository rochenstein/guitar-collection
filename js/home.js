// home.js

document.addEventListener('DOMContentLoaded', function() {
  var recentGrid = document.getElementById('recent-grid');
  if (!recentGrid) return;
  var recent = guitars.slice(-4).reverse();
  recentGrid.innerHTML = recent.map(function(g) {
    return '<a href="pages/guitar.html?id=' + g.id + '" class="guitar-card fade-up">' +
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
  }).join('');

  document.querySelectorAll('.fade-up:not(.visible)').forEach(function(el, i) {
    el.style.transitionDelay = (i * 0.08) + 's';
    observer.observe(el);
  });
});
