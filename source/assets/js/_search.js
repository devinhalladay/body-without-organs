var lunrIndex = null;
var lunrMap = null;

$(document).ready(function ($) {
  // Download search json and set up.
  $.ajax({
    url: '/search.json',
    cache: true,
    method: 'GET',
    success: function (data) {
      console.log('Downloaded Search JSON.');
      setupSearch(data);
    }
  });
});

// Setup lunr index and callback for search-as-you-type.
function setupSearch(lunrData) {
  console.log('Creating search index.');
  lunrIndex = lunr.Index.load(lunrData.index);
  lunrMap = lunrData.docs;

  $("#search").bind("keyup", function () {
    $(".search-results").empty();

    var query = $(this).val();

    if (query.length <= 2) { return; }

    var options = { year: "numeric", month: "long", day: "numeric" };
    var results = lunrIndex.search(query)

    if (results.length == 0) {
      $(".search-results").append('<p>No results.</p>');
    } else {
      $.each(results, function (index, result) {
        page = lunrMap[result.ref];
        if (page.image) {
          $(".search-results").append(
            `
            <li class="term">
              <a href="${page.url}">
                <img class="thumbnail" src="${page.image}"
                <span class="term-title">${page.title}
                  ${index == results.length - 1 ? "" : ","}
                </span>
              </a>
            `
          );

          $('.search-results .term a').click(function (e) {
            let link = $(this).attr('href');

            $('.content-drawer .content-area').load(`${link} article`, function () {
              $('.content-drawer').addClass('is-open');
              $('.close-content-drawer').show();
              $('.close-content-drawer').stop().animate({
                opacity: 0.7
              }, 1000);
            })

            e.preventDefault();
          })
        } else {
          $(".search-results").append(
            `
            <li class="term">
              <a href="${page.url}">
                <span class="term-title">${page.title}
                  ${index == results.length - 1 ? "" : ","}
                </span>
              </a>
            `
          );

          $('.search-results .term a').click(function (e) {
            let link = $(this).attr('href');

            $('.content-drawer .content-area').load(`${link} article`, function () {
              $('.content-drawer').addClass('is-open');
              $('body').addClass('drawer-open');
              $('.close-content-drawer').show();
              $('.close-content-drawer').stop().animate({
                opacity: 0.7
              }, 1000);
            })

            e.preventDefault();
          })
        }

        let terms = document.querySelectorAll('.term');

        var mouseOverTerms = function () {
          terms.forEach((term, i) => {
            term.addEventListener('mouseover', (e) => {
              terms.forEach((term) => {
                term.style.opacity = 0.3;
              })
              term.style.opacity = 1;
              e.preventDefault();
            });

            term.addEventListener('mouseout', (e) => {
              terms.forEach((term) => {
                term.style.opacity = 1;
              })
              e.preventDefault();
            });

            term.children[0].addEventListener('click', (e) => {
              e.preventDefault();
            })
          });
        }

        mouseOverTerms();
      });
    }
  }).keyup();
}
