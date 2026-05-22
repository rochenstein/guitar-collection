// collection.js

function initCollection() {
  var grid = document.getElementById('collection-grid');
  var countEl = document.getElementById('guitar-count');
  if (!grid) return;
  if (typeof guitars === 'undefined') return;

  function renderCards(list) {
    var html = '';
    for (var i = 0; i < list.length; i++) {
      var g = list[i];
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
              '<span>' + (g.year || 'c.' + g.acquiredYear) + ' · ' + g.country + '</span>' +
              '<span>' + g.acquired + '</span>' +
            '</div>' +
          '</div>' +
        '</a>';
    }
    grid.innerHTML = html;
    if (countEl) countEl.textContent = list.length + ' instrument' + (list.length !== 1 ? 's' : '');
  }

  function applyFilter(tag) {
    var filtered = tag === 'all' ? guitars : guitars.filter(function(g) { return g.tags.indexOf(tag) !== -1; });
    renderCards(filtered);
    document.querySelectorAll('.filter-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.filter === tag);
    });
  }

  var filterBar = document.getElementById('filter-bar');
  if (filterBar) {
    filterBar.addEventListener('click', function(e) {
      if (e.target.matches('.filter-btn')) applyFilter(e.target.dataset.filter);
    });
  }

  renderCards(guitars);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCollection);
} else {
  initCollection();
}
