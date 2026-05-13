// timeline.js

function initTimeline() {
  var yearNav = document.getElementById('year-nav');
  var timelineList = document.getElementById('timeline-list');
  if (!yearNav || !timelineList) return;
  if (typeof guitars === 'undefined') return;

  var byYear = {};
  var sorted = guitars.slice().sort(function(a, b) { return a.acquiredYear - b.acquiredYear; });

  for (var i = 0; i < sorted.length; i++) {
    var g = sorted[i];
    if (!byYear[g.acquiredYear]) byYear[g.acquiredYear] = [];
    byYear[g.acquiredYear].push(g);
  }

  var years = Object.keys(byYear).sort();

  var navHtml = '';
  for (var y = 0; y < years.length; y++) {
    navHtml += '<a href="#year-' + years[y] + '" class="timeline-year-link">' + years[y] + '</a>';
  }
  yearNav.innerHTML = navHtml;

  var listHtml = '';
  for (var y = 0; y < years.length; y++) {
    var year = years[y];
    var items = byYear[year];
    listHtml += '<div class="year-group" id="year-' + year + '"><div class="year-heading">' + year + '</div>';
    for (var i = 0; i < items.length; i++) {
      var g = items[i];
      listHtml +=
        '<div class="timeline-item fade-up">' +
          '<div class="timeline-dot"></div>' +
          '<div class="timeline-date">' + (g.acquired || year) + '</div>' +
          '<div class="timeline-guitar-name">' + g.make + ' ' + g.model + '</div>' +
          '<p class="timeline-detail">' + g.shortStory + '</p>' +
          '<a href="pages/guitar.html?id=' + g.id + '" class="timeline-link">Full story</a>' +
        '</div>';
    }
    listHtml += '</div>';
  }
  timelineList.innerHTML = listHtml;

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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTimeline);
} else {
  initTimeline();
}
