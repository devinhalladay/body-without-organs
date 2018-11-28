$(document).ready(function() {

  $body = $('body');

  var mouse = {
      x: 0,
      y: 0
    },
    offset = {
      x: 10,
      y: 10
    };
  $('.link-thumbnail img').on('mouseenter', function() {
    var src = $(this).attr('src');
    $('.popover').html('<img src="' + src + '">').show();
    offset.x = -$('.popover').width() / 2;
    clearTimeout(this.timer);
  }).on('mouseleave', function() {
    this.timer = setTimeout(function() {
      $('.popover').hide();
    }, 10);
  });
  document.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    $('.popover').css({
      left: (mouse.x + offset.x) + 'px',
      top: (mouse.y + offset.y) + 'px'
    });
  });

  $(".term > a").click(function(event) {
    event.preventDefault();
    var $body = $('body')
    var that = $(this).parents('li');
    var parent = that.parents('ul');

    if (that.hasClass('current-filter')) {
      $('li', parent).removeClass('current-filter');
    } else {
      $('li', parent).removeClass('current-filter');
      that.addClass('current-filter');
    }

    if ($('.current-filter').length) {
      $body.addClass('filter-enabled');
    } else {
      $body.removeClass('filter-enabled');
    }

  });

  function initAll() {
    moving = false;
    winWidth = $(window).width();
    winHeight = $(window).height();
    body = $.browser.webkit ? $('body') : $('html, body');
  }

  initAll();

  $(window).resize(function() {
    initAll();
  });

  pagePosition = 0;

  results = $('.results li').length;
  if (document.location.hostname == 'localhost') {
    domain = 'http://localhost:4567/';
    link = 'http://localhost:4567/';
  } else {
    domain = 'https://body-without-organs.netlify.com/';
  }
  link = $(location).attr('href');
  docHeight = $('#contents').height();
  $('section, .body-wrapper').css({
    minHeight: docHeight
  });



  // Inactive movement
  $('.inactive').live('mouseenter', function(e) {
    var that = $(this);
    if (moving === false) {
      if (that.hasClass('layer-1')) {
        $('.layer-2').stop().animate({
          left: 95
        }, 160);
        if (!$('.layer-3').hasClass('inactive')) {
          $('.layer-3').stop().animate({
            left: 175
          }, 160);
        }
        $('.layer-1 .wrapper').stop().animate({
          opacity: 0.7
        }, 160);
      } else if (that.hasClass('layer-2')) {
        if ($('.layer-1').hasClass('inactive')) {
          $('.layer-3').stop().animate({
            left: 175
          }, 160);
        } else {
          if ($('.layer-3').hasClass('show')) {
            $('.layer-2').stop().animate({
              left: winWidth - 175
            }, 160);
          } else {
            $('.layer-2').stop().animate({
              left: winWidth - 95
            }, 160);
          }
        }
        $('.layer-2 .wrapper').stop().animate({
          opacity: 0.7
        }, 160);

      } else if (that.hasClass('layer-3')) {
        $('.layer-3').stop().animate({
          left: winWidth - 95
        }, 160);
        $('.layer-3 .wrapper').stop().animate({
          opacity: 0.7
        }, 160);
      }
    }
    e.preventDefault();
  }).live('mouseleave', function(e) {
    var that = $(this);
    if (moving === false) {
      if (that.hasClass('layer-1')) {
        $('.layer-2').stop().animate({
          left: 80
        }, 160);
        if (!$('.layer-3').hasClass('inactive')) {
          $('.layer-3').stop().animate({
            left: 160
          }, 160);
        }
        $('.layer-1 .wrapper').stop().animate({
          opacity: 0.3
        }, 160);
      } else if (that.hasClass('layer-2')) {
        if ($('.layer-1').hasClass('inactive')) {
          $('.layer-3').stop().animate({
            left: 160
          }, 160);
        } else {
          if ($('.layer-3').hasClass('show')) {
            $('.layer-2').stop().animate({
              left: winWidth - 160
            }, 160);
          } else {
            $('.layer-2').stop().animate({
              left: winWidth - 80
            }, 160);
          }
        }
        $('.layer-2 .wrapper').stop().animate({
          opacity: 0.3
        }, 160);

      } else if (that.hasClass('layer-3')) {
        $('.layer-3').stop().animate({
          left: winWidth - 80
        }, 160);
        $('.layer-3 .wrapper').stop().animate({
          opacity: 0.3
        }, 160);
      }
    }
    e.preventDefault();
  }).live('click', function(e) {
    var that = $(this);
    if (moving === false) {
      moving = true;

      if (that.hasClass('layer-1')) {
        pagePosition = $(window).scrollTop();
        body.animate({
          scrollTop: 0
        }, 500, 'ease');
        $('.layer-1 .wrapper').stop().animate({
          marginLeft: 80,
          opacity: 1
        }, 500, 'ease', function() {
          $('.layer-1').removeClass('inactive');
        });
        $('.layer-2 .wrapper, .layer-3 .wrapper').stop().animate({
          marginLeft: 40,
          opacity: 0.3
        }, 500, 'ease', function() {
          $('.layer-2, .layer-3').addClass('inactive');
        });
        if ($('.layer-3').hasClass('show')) {
          $('.layer-2').stop().animate({
            left: winWidth - 160
          }, 500, 'ease');
          $('.layer-3').stop().animate({
            left: winWidth - 80
          }, 500, 'ease');
        } else {
          $('.layer-2').stop().animate({
            left: winWidth - 80
          }, 500, 'ease');
        }
      } else if (that.hasClass('layer-2')) {
        body.animate({
          scrollTop: pagePosition
        }, 500, 'ease');
        $('.layer-3').stop().animate({
          left: winWidth - 80
        }, 500, 'ease');
        $('.layer-2').stop().animate({
          left: 80
        }, 500, 'ease');
        $('.layer-2 .wrapper').stop().animate({
          marginLeft: 80,
          opacity: 1
        }, 500, 'ease', function() {
          $('.layer-2').removeClass('inactive');
        });
        $('.layer-1 .wrapper, .layer-3 .wrapper').stop().animate({
          marginLeft: 40,
          opacity: 0.3
        }, 500, 'ease', function() {
          $('.layer-1, .layer-3').addClass('inactive');
        });
        History.replaceState(null, null, domain);
      } else if (that.hasClass('layer-3')) {
        pagePosition = $(window).scrollTop();
        $('.layer-3').stop().animate({
          left: 160
        }, 500, 'ease');
        $('.layer-2').stop().animate({
          left: 80
        }, 500, 'ease');
        $('.layer-3 .wrapper').stop().animate({
          marginLeft: 80,
          opacity: 1
        }, 500, 'ease', function() {
          $('.layer-3').removeClass('inactive');
        });
        $('.layer-1 .wrapper, .layer-2 .wrapper').stop().animate({
          marginLeft: 40,
          opacity: 0.3
        }, 500, 'ease', function() {
          $('.layer-1, .layer-2').addClass('inactive');
        });
        History.replaceState(null, null, link);
      }
      setTimeout(function() {
        moving = false;
      }, 500);
    }
    e.preventDefault();
  });


  // Contents click
  $('.term-items li a').live('click', function(e) {
    link = $(this).attr('href');

    if (!$('.layer-2').hasClass('inactive')) {
      pagePosition = $(window).scrollTop();
    }

    $('.body-wrapper').removeClass('single');
    if (moving === false && !$('.layer-2').hasClass('inactive') || moving === false && $(this).parents('nav').length) {
      moving = true;
      $('body').addClass('loading');
      $('.layer-3').load(link + ' .layer-3 .wrapper, .layer-3 .border', function() {
        if ($('.layer-3').hasClass('show')) {
          $('.layer-3').stop().animate({
            left: 160
          }, 500, 'ease').removeClass('inactive');
          $('.layer-3 .wrapper').stop().animate({
            marginLeft: 80,
            opacity: 1
          }, 500, 'ease');
        } else {
          $('.layer-3').stop().css({
            left: winWidth
          }).addClass('show').animate({
            left: 160
          }, 500, 'ease').removeClass('inactive');
          $('.layer-3 .wrapper').stop().animate({
            marginLeft: 80,
            opacity: 1
          }, 500, 'ease');
        }

        body.animate({
          scrollTop: 0
        }, 500, 'ease');
        $('.layer-2').stop().animate({
          left: 80
        }, 500, 'ease');
        $('.layer-2 .wrapper, .layer-1 .wrapper').stop().animate({
          marginLeft: 40,
          opacity: 0.3
        }, 500, 'ease', function() {
          $('.layer-2').addClass('inactive');
          $('body').removeClass('loading');
        });
        History.replaceState(null, null, link);
        setTimeout(function() {
          moving = false;
        }, 500);
      });


    }
    e.preventDefault();
  });

  // Inactive click
  $('.inactive a').live('click', function(e) {
    e.preventDefault();
  });

});

$.extend($.easing, {
  ease: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  }
});
