// collection.js

document.addEventListener('DOMContentLoaded', function() {
  var grid = document.getElementById('collection-grid');
  var countEl = document.getElementById('guitar-count');
  if (!grid) return;

  function renderCards(list) {
    grid.innerHTML = list.map(function(g) {
      return '<a href="pages/guitar.html?id=' + g.id + '" class="guitar-card">' +
        '<div class="guitar-card-image">' +
          '<div class="guitar-card-image-placeholder">' + g.emoji + '</div>' +
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
    }).join('');
    countEl.textContent = list.length + ' instrument' + (list.length !== 1 ? 's' : '');
  }

  function applyFilter(tag) {
    var filtered = tag === 'all' ? guitars : guitars.filter(function(g) { return g.tags.includes(tag); });
    renderCards(filtered);
    document.querySelectorAll('.filter-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.filter === tag);
    });
  }

  document.getElementById('filter-bar').addEventListener('click', function(e) {
    if (e.target.matches('.filter-btn')) applyFilter(e.target.dataset.filter);
  });

  renderCards(guitars);
});
