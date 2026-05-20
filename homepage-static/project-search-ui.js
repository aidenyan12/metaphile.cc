(function () {
  var index = Array.isArray(window.METAPHILE_PROJECT_INDEX) ? window.METAPHILE_PROJECT_INDEX : [];
  if (!index.length) return;

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function scoreProject(project, normalizedQuery) {
    if (!normalizedQuery) return 0;

    var title = normalize(project.title);
    var category = normalize(project.category);
    var description = normalize(project.description);
    var hashtags = Array.isArray(project.hashtags) ? project.hashtags.map(normalize) : [];
    var score = 0;

    if (title === normalizedQuery) score += 400;
    if (title.indexOf(normalizedQuery) === 0) score += 240;
    else if (title.indexOf(normalizedQuery) !== -1) score += 170;

    if (category.indexOf(normalizedQuery) !== -1) score += 90;
    if (description.indexOf(normalizedQuery) !== -1) score += 45;

    hashtags.forEach(function (tag) {
      if (tag === normalizedQuery) score += 150;
      else if (tag.indexOf(normalizedQuery) === 0) score += 110;
      else if (tag.indexOf(normalizedQuery) !== -1) score += 70;
    });

    return score;
  }

  function getMatches(query, limit) {
    var normalizedQuery = normalize(query);
    if (!normalizedQuery) return [];

    return index
      .map(function (project) {
        return { project: project, score: scoreProject(project, normalizedQuery) };
      })
      .filter(function (entry) {
        return entry.score > 0;
      })
      .sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return a.project.title.localeCompare(b.project.title);
      })
      .slice(0, limit || 6)
      .map(function (entry) {
        return entry.project;
      });
  }

  function buildSuggestionMarkup(project) {
    var tags = (project.hashtags || []).slice(0, 2).map(function (tag) {
      return '<span class="search-autocomplete-tag">#' + escapeHtml(tag) + '</span>';
    }).join('');

    return [
      '<a class="search-autocomplete-item" href="' + escapeHtml(project.path) + '">',
      '<span class="search-autocomplete-title">' + escapeHtml(project.title) + '</span>',
      '<span class="search-autocomplete-meta">' + escapeHtml(project.category) + '</span>',
      tags ? '<span class="search-autocomplete-tags">' + tags + '</span>' : '',
      '</a>'
    ].join('');
  }

  function attachSearchAutocomplete(form) {
    if (!form) return;

    var input = form.querySelector('input[type="search"]');
    if (!input) return;

    input.setAttribute('autocomplete', 'off');
    input.setAttribute('spellcheck', 'false');

    var dropdown = document.createElement('div');
    dropdown.className = 'search-autocomplete';
    dropdown.hidden = true;
    form.appendChild(dropdown);

    function render() {
      var query = input.value.trim();
      if (!query) {
        dropdown.hidden = true;
        dropdown.innerHTML = '';
        return;
      }

      var matches = getMatches(query, 6);
      var safeQuery = escapeHtml(query);
      var html = '';

      if (matches.length) {
        html = matches.map(buildSuggestionMarkup).join('');
        html += '<a class="search-autocomplete-viewall" href="/gallery/?q=' + encodeURIComponent(query) + '">View all results for “' + safeQuery + '”</a>';
      } else {
        html = '<a class="search-autocomplete-viewall" href="/gallery/?q=' + encodeURIComponent(query) + '">Search gallery for “' + safeQuery + '”</a>';
      }

      dropdown.innerHTML = html;
      dropdown.hidden = false;
    }

    input.addEventListener('input', render);
    input.addEventListener('focus', function () {
      if (input.value.trim()) render();
    });
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        dropdown.hidden = true;
      }
    });

    document.addEventListener('pointerdown', function (event) {
      if (!form.contains(event.target)) {
        dropdown.hidden = true;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    Array.prototype.forEach.call(document.querySelectorAll('.header-search, .contact-search'), attachSearchAutocomplete);
  });
})();
