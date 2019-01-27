//= require "_search"
//= require lunr.min

var mouse = {
  x: 0,
  y: 0
},
offset = {
  x: 30,
  y: 30
};

let terms = document.querySelectorAll('.term');

var mouseOverTerms = function() {
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

$('main .term a').click(function (e) {
  let link = $(this).attr('href');

  $('.section--drawer').removeClass('is-open');

  $('.section--drawer .content-area').load(`${link} article`, function () {
    $('.section--drawer').addClass('is-open');
    $('body').addClass('drawer-open');
    $('.close-section-drawer').show();
    $('.close-section-drawer').stop().animate({
      opacity: 0.7
    }, 400);

    $('.thumbnail').on('mouseenter', function () {
      var src = $(this).attr('src');
      $('.popover').html('<img src="' + src + '">').show();
      offset.x = -$('.popover').width() / 2;
      clearTimeout(this.timer);
    }).on('mouseleave', function () {
      this.timer = setTimeout(function () {
        $('.popover').hide();
      }, 10);
    });

    $('.section--drawer .content-area a').click(function (e) {
      let link2 = $(this).attr('href');
      
      $('.content-drawer .content-area').load(`${link2} article`, function () {
        $('.content-drawer').addClass('is-open');
        $('body').addClass('drawer-open');
        $('.close-content-drawer').show();
        $('.close-content-drawer').stop().animate({
          opacity: 0.7
        }, 400);
      })

      e.preventDefault();
    })
  });

  e.preventDefault();
});

$('.section--drawer .exit-drawer, .close-section-drawer').click(function (e) {
  $('.section--drawer').removeClass('is-open');
  $('body').removeClass('drawer-open');
  $('.close-section-drawer').stop().animate({
    opacity: 0
  }, 400, function () {
    $('.close-section-drawer').hide();
  });
  e.preventDefault();
});

$('.content-drawer .exit-drawer, .close-content-drawer').click(function (e) {
  $('.content-drawer').removeClass('is-open');
  $('body').removeClass('drawer-open');
  $('.close-content-drawer').stop().animate({
    opacity: 0
  }, 400, function () {
    $('.close-content-drawer').hide();
  });
  e.preventDefault();
});







$('.thumbnail').on('mouseenter', function () {
  var src = $(this).attr('src');
  $('.popover').html('<img src="' + src + '">').show();
  offset.x = -$('.popover').width() / 2;
  clearTimeout(this.timer);
}).on('mouseleave', function () {
  this.timer = setTimeout(function () {
    $('.popover').hide();
  }, 10);
});

document.addEventListener('mousemove', function (e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
  $('.popover').css({
    left: (mouse.x + offset.x) + 'px',
    top: (mouse.y + offset.y) + 'px'
  });
});

$('.search .search-header').click(function() {
  $('.search').toggleClass('is-open');
  if ($('.search').hasClass('is-open')) {
    $('.search-header h2').animate({
      paddingLeft: 10
    }, 200)
  } else {
    $('.search-header h2').animate({
      paddingLeft: 0
    }, 200)
  }
})

$('.rhizome .rhizome-header').click(function () {
  $('.rhizome').toggleClass('is-open');
  if ($('.rhizome').hasClass('is-open')) {
    $('.rhizome-header h2').animate({
      paddingLeft: 10
    }, 200)
  } else {
    $('.rhizome-header h2').animate({
      paddingLeft: 0
    }, 200)
  }
})

$(".timeline .timeline-header").click(function() {
  $(".timeline").toggleClass("is-open");
  if ($(".timeline").hasClass("is-open")) {
    $(".timeline-header h2").animate(
      {
        paddingLeft: 10
      },
      200
    );
  } else {
    $(".timeline-header h2").animate(
      {
        paddingLeft: 0
      },
      200
    );
  }
});