(function () {
  "use strict";
  var input = document.getElementById("search-input");
  var results = document.getElementById("search-results");
  if (!input || !results) return;

  var index = [];
  fetch("search-index.json")
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      index = data;
      var params = new URLSearchParams(window.location.search);
      var q = params.get("q");
      if (q) {
        input.value = q;
        render(q);
      }
    })
    .catch(function () {
      results.innerHTML = "<p>Search is temporarily unavailable.</p>";
    });

  function render(query) {
    var q = query.trim().toLowerCase();
    if (!q) {
      results.innerHTML = "";
      return;
    }
    var matches = index.filter(function (item) {
      return (
        item.title.toLowerCase().indexOf(q) !== -1 ||
        item.excerpt.toLowerCase().indexOf(q) !== -1
      );
    });
    if (!matches.length) {
      results.innerHTML = '<p style="text-align:center;color:var(--ink-500)">No results for &ldquo;' + escapeHtml(query) + '&rdquo;.</p>';
      return;
    }
    results.innerHTML = matches
      .map(function (m) {
        return (
          '<a class="search-result" href="' +
          m.url +
          '"><span class="tag">' +
          escapeHtml(m.tag) +
          "</span><h4>" +
          escapeHtml(m.title) +
          "</h4><p>" +
          escapeHtml(m.excerpt) +
          "</p></a>"
        );
      })
      .join("");
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var debounce;
  input.addEventListener("input", function () {
    clearTimeout(debounce);
    debounce = setTimeout(function () {
      render(input.value);
    }, 150);
  });
})();
