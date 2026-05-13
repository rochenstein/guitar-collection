// timeline.js

document.addEventListener('DOMContentLoaded', function() {
  var byYear = {};
  var sorted = guitars.slice().sort(function(a, b) { return a.acquiredYear - b.acquiredYear; });
  sorted.forEach(function(g) {
    if (!byYear[g.acquiredYear]) byYear[g.acquiredYear] = [];
    byYear[g.acquiredYear].push(g);
  });
  var years = Object.keys(byYear).sort();

  document.getElementById('year-nav').innerHTML = years.map(function(y) {
    return '<a href="#year-' + y + '" class="timeline-year-link">' + y + '</a>';
  }).join('');

  document.getElementById('timeline-list').innerHTML = years.map(function(y) {
    return '<div class="year-group" id="year-' + y + '">' +
      '<div class="year-heading">' + y + '</div>' +
      byYear[y].map(function(g) {
        return '<div class="timeline-item fade-up">' +
          '<div class="timeline-dot"></div>' +
          '<div class="timeline-date">' + (g.acquired || y) + '</div>' +
          '<div class="timeline-guitar-name">' + g.make + ' ' + g.model + '</div>' +
          '<p class="timeline-detail">' + g.shortStory + '</p>' +
          '<a href="pages/guitar.html?id=' + g.id + '" class="timeline-link">Full story →</a>' +
        '</div>';
      }).join('') +
    '</div>';
  }).join('');

  var yearEls = document.querySelectorAll('.year-group');
  var yearLinks = document.querySelectorAll('.timeline-year-link');
  var yearObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        var id = e.target.id.replace('year-', '');
        yearLinks.forEach(function(l) { l.classList.toggle('active', l.textContent.trim() === id); });
      }
    });
  }, { threshold: 0.3 });
  yearEls.forEach(function(el) { yearObserver.observe(el); });
});
