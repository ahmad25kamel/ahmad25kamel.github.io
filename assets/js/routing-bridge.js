(function () {
  function buildBreadcrumb() {
    var containers = document.querySelectorAll('.breadcrumb-container');
    if (!containers.length) return;

    var h1 = document.querySelector('h1');
    var label = h1 ? h1.textContent.trim() : document.title;

    var linkStyle = 'color:rgba(255,255,255,0.8);text-decoration:none';
    var sepStyle = 'margin:0 8px;opacity:0.6';

    var html =
      '<a href="../index.html" style="' + linkStyle + '" ' +
        'onmouseover="this.style.color=\'white\'" ' +
        'onmouseout="this.style.color=\'rgba(255,255,255,0.8)\'">Home</a>' +
      '<span style="' + sepStyle + '">›</span>' +
      '<a href="../index.html#tools" style="' + linkStyle + '" ' +
        'onmouseover="this.style.color=\'white\'" ' +
        'onmouseout="this.style.color=\'rgba(255,255,255,0.8)\'">Tools</a>' +
      '<span style="' + sepStyle + '">›</span>' +
      '<span style="color:white;font-weight:500">' + label + '</span>';

    containers.forEach(function (el) { el.innerHTML = html; });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildBreadcrumb);
  } else {
    buildBreadcrumb();
  }
})();
