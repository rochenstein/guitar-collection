// home.js

function initHome() {
  var recentGrid = document.getElementById('recent-grid');
  if (!recentGrid) return;
  if (typeof guitars === 'undefined') return;

  var recent = guitars.slice(-4).reverse();
  var html = '';

  for (var i = 0; i < recent.length; i++) {
    var g = recent[i];
    var images = g.images || [];
    var imageHtml = images.length > 0
      ? '<img src="' + images[0].src + '" alt="' + g.make + ' ' + g.model + '" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
        '<div class="guitar-card-image-placeholder" style="display:none;">' + g.emoji + '</div>'
      : '<div class="guitar-card-image-placeholder">' + g.emoji + '</div>';

    html +=
      '<a href="pages/guitar.html?id=' + g.id + '" class="guitar-card">' +
        '<div class="guitar-card-image">' +
          imageHtml +
          '<div class="guitar-card-number">' + g.number + '</div>' +
        '</div>' +
        '<div class="guitar-card-body">' +
          '<div class="guitar-card-make">' + g.make + '</div>' +
          '<div class="guitar-card-name">' + g.model + '</div>' +
          '<div class="guitar-card-meta">' +
            '<span>' + (g.year || 'c.' + g.acquiredYear) + '</span>' +
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
