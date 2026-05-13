// guitar.js

document.addEventListener('DOMContentLoaded', function() {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var idx = guitars.findIndex(function(g) { return g.id === id; });
  var guitar = guitars[idx];

  if (!guitar) {
    document.body.innerHTML = '<div style="padding:8rem 4rem"><h1>Guitar not found</h1><a href="../collection.html">Back to collection</a></div>';
    return;
  }

  document.title = guitar.make + ' ' + guitar.model + ' — The Collection';
  document.getElementById('breadcrumb-make').textContent = guitar.make;
  document.getElementById('detail-make').textContent = guitar.make + ' · No. ' + guitar.number;
  document.getElementById('detail-title').textContent = guitar.model + (guitar.year ? ', ' + guitar.year : '');
  document.getElementById('hero-emoji').textContent = guitar.emoji;
  document.getElementById('hero-emoji').style.cssText = 'font-size:14rem;opacity:0.18;';

  var specs = [
    { label: 'Year',      value: guitar.year || 'Unknown' },
    { label: 'Country',   value: guitar.country },
    { label: 'Finish',    value: guitar.finish || 'Unknown' },
    { label: 'Condition', value: guitar.condition || 'Good' },
    { label: 'Body',      value: guitar.body },
    { label: 'Neck',      value: guitar.neck },
    { label: 'Pickups',   value: guitar.pickups },
    { label: 'Acquired',  value: guitar.acquired },
  ];

  document.getElementById('detail-specs').innerHTML = specs.map(function(s) {
    return '<div class="detail-spec-item"><div class="detail-spec-label">' + s.label + '</div><div class="detail-spec-value">' + s.value + '</div></div>';
  }).join('');

  document.getElementById('guitar-story').innerHTML = guitar.story
    .trim().split(/\n\s*\n/).map(function(p) { return '<p>' + p.trim() + '</p>'; }).join('');

  // Video section
  var videoContainer = document.getElementById('video-container');
  var videos = guitar.videos || [];

  if (videos.length === 0) {
    videoContainer.innerHTML =
      '<div style="background:rgba(255,255,255,0.05);padding:3rem 2rem;text-align:center;border:1px solid rgba(255,255,255,0.08)">' +
        '<div class="label" style="color:rgba(247,244,238,0.3);margin-bottom:0.75rem">Video coming</div>' +
        '<p style="font-size:0.85rem;color:rgba(247,244,238,0.4)">Add a video entry to guitars.js to embed here.</p>' +
      '</div>';
  } else if (videos.length === 1) {
    videoContainer.innerHTML =
      '<p style="font-family:var(--font-mono);font-size:0.7rem;color:var(--gold);letter-spacing:0.08em;margin-bottom:1rem;">' + videos[0].title + '</p>' +
      '<div class="video-embed" style="max-width:800px;">' +
        '<iframe src="https://www.youtube.com/embed/' + videos[0].id + '" title="' + videos[0].title + '" allowfullscreen></iframe>' +
      '</div>';
  } else {
    videoContainer.innerHTML =
      '<div class="video-tabs" id="video-tabs">' +
        videos.map(function(v, i) {
          return '<button class="video-tab ' + (i === 0 ? 'active' : '') + '" data-index="' + i + '">' + v.title + '</button>';
        }).join('') +
      '</div>' +
      '<div class="video-embed" style="max-width:800px;">' +
        '<iframe id="video-iframe" src="https://www.youtube.com/embed/' + videos[0].id + '" title="' + videos[0].title + '" allowfullscreen></iframe>' +
      '</div>';

    document.getElementById('video-tabs').addEventListener('click', function(e) {
      if (!e.target.matches('.video-tab')) return;
      var i = parseInt(e.target.dataset.index);
      document.querySelectorAll('.video-tab').forEach(function(t) { t.classList.remove('active'); });
      e.target.classList.add('active');
      var iframe = document.getElementById('video-iframe');
      iframe.src = 'https://www.youtube.com/embed/' + videos[i].id;
      iframe.title = videos[i].title;
    });
  }

  // Prev / Next
  var prev = guitars[idx - 1];
  var next = guitars[idx + 1];
  document.getElementById('prev-next').innerHTML =
    (prev
      ? '<a href="guitar.html?id=' + prev.id + '" class="prev-next-item"><div class="prev-next-dir">← Previous</div><div class="prev-next-name">' + prev.make + ' ' + prev.model + '</div><div class="label">' + (prev.year || prev.acquiredYear) + '</div></a>'
      : '<div class="prev-next-item" style="opacity:0.2"><div class="prev-next-dir">← Previous</div><div class="prev-next-name">First guitar</div></div>') +
    (next
      ? '<a href="guitar.html?id=' + next.id + '" class="prev-next-item"><div class="prev-next-dir">Next →</div><div class="prev-next-name">' + next.make + ' ' + next.model + '</div><div class="label">' + (next.year || next.acquiredYear) + '</div></a>'
      : '<div class="prev-next-item" style="opacity:0.2;text-align:right;align-items:flex-end"><div class="prev-next-dir">Next →</div><div class="prev-next-name">Last guitar</div></div>');
});
