var lunrIndex = null;
var lunrMap  = null;

$(document).ready(function($) {
  // Download search json and set up.
  $.ajax({
    url: '/search.json',
    cache: true,
    method: 'GET',
    success: function(data) {
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

  $("#search").bind("keyup", function(){
    $(".search-results").empty();

    var query = $(this).val();

    if (query.length <= 2) { return; }

    var options = { year: "numeric", month: "long", day: "numeric" };
    var results = lunrIndex.search(query)

    if (results.length == 0) {
      $(".search-results").append('<p>No results.</p>');
    } else {
      $.each(results, function(index, result) {
        page = lunrMap[result.ref];
        if (page.image) {
          $(".search-results").append(
            '<div class="result">' +
              '<a href="' + page.url + '">' +
              '<img src="' + page.image + '">' +
              '<span>' + page.title + '</span>' +
              '</a> &nbsp; ' +
              '<div class="post-meta"></div>' +
            '</div>'
          );
        } else {
          $(".search-results").append(
            '<div class="result">' +
              '<a href="' + page.url + '">' +
                page.title +
              '</a> &nbsp; ' +
              '<div class="post-meta"></div>' +
            '</div>'
          );
        }
      });
    }
  }).keyup();
}
