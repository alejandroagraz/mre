jQuery(document).ready(function() {

  // Header Swiper
  var toggleMenu = function() {
    if (swiperHeader.previousIndex == 0) {
      swiperHeader.slidePrev()
    }
  }
    , menuButton = document.getElementsByClassName('menu-button')[0]
    , swiperHeader = new Swiper('.swiper-container-menu', {
    slidesPerView: 'auto'
    , initialSlide: 1
    , resistanceRatio: .00000000000001
    , onSlideChangeStart: function(slider) {
      if (slider.activeIndex == 0) {
        menuButton.classList.add('cross');
        menuButton.removeEventListener('click', toggleMenu, false);
      } else {
        menuButton.classList.remove('cross');
      }
    }
    , onSlideChangeEnd: function(slider) {
      if (slider.activeIndex == 0) {
        menuButton.removeEventListener('click', toggleMenu, false);
      } else {
        menuButton.addEventListener('click', toggleMenu, false);
      }
    }
    , slideToClickedSlide: true
  });

  // Hero Swiper
  var swiperHero = new Swiper('.swiper-container-hero', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 1,
    loop: true,
    nested: true,
    autoplay: 5000,
    effect: 'fade'
  });

  $("#go-to-top").click(function () {
    $('html,body').animate({scrollTop: 0}, 'slow');
    return false;
  });

  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if (scroll > 900)  {
      $('.al-go-top-div').css('display', 'block');
    } else {
      $('.al-go-top-div').css('display', 'none');
    }
  });

  // Add Swiper Flags
  var swiperFlag = new Swiper('.swiper-container-flags', {
    initialSlide: 0,
    nested: true,
    onSlideChangeEnd: function (swiper) {
      var currentSlide = swiper.activeIndex +1;
      if (currentSlide == 1) {
        $('#flag-image-1').removeClass('flag-image-opacity');
        $('#flag-image-2').addClass('flag-image-opacity');
      }
      else {
        $('#flag-image-1').addClass('flag-image-opacity');
        $('#flag-image-2').removeClass('flag-image-opacity');
      }
    }
  });

  // Adding Swiper functionality to flags
  $('.flag-image').on('click', function () {
    var index = $(this).data('pagination');
    swiperFlag.slideTo(index - 1);
    if (index == 1) {
      $('#flag-image-1').removeClass('flag-image-opacity');
      $('#flag-image-2').addClass('flag-image-opacity');
    }
    else {
      $('#flag-image-1').addClass('flag-image-opacity');
      $('#flag-image-2').removeClass('flag-image-opacity');
    }
  });

  // Projects change effect
  $('.item-active').next().css('opacity', 1);
  $('.al-project-list-item').click(function () {
    $('.al-project-list-item').find('h2').removeClass('item-active');
    $(this).find('h2').addClass('item-active');
    $('.triangle').css('opacity', 0);
    $(this).find('img').css('opacity', 1);
  });

  // Menu flags functionality
  $('.al-menu-language-flag').click(function () {
    $('.al-menu-language-flag').css('opacity', 0.4);
    $(this).css('opacity', 1);
  });


  $("#menu-contact").click(function() {
    $('html, body').animate({
      scrollTop: $("#contact-us").offset().top
    }, 2000);
  });
  $("#menu-projects").click(function() {
    $('html, body').animate({
      scrollTop: $(".al-properties-section").offset().top
    }, 2000);
  });

    //Slider Amenities
    
    $("#myModal").on('show.bs.modal', function () {
        setTimeout(function () {
            var galleryTop = new Swiper('.gallery-top', {
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 10,
                loop: true,
                loopedSlides: 5, //looped slides should be the same     
            });
            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                slidesPerView: 4,
                touchRatio: 0.2,
                loop: true,
                loopedSlides: 5, //looped slides should be the same
                slideToClickedSlide: true
            });
            galleryTop.params.control = galleryThumbs;
            galleryThumbs.params.control = galleryTop;
        }, 500);
    });
    
    $("#myModalDetails").on('show.bs.modal', function () {
        setTimeout(function () {
            var galleryTop = new Swiper('.gallery-top-details', {
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 10,
                loop: true,
                loopedSlides: 5, //looped slides should be the same     
            });
            var galleryThumbs = new Swiper('.gallery-thumbs-details', {
                spaceBetween: 10,
                slidesPerView: 4,
                touchRatio: 0.2,
                loop: true,
                loopedSlides: 5, //looped slides should be the same
                slideToClickedSlide: true
            });
            galleryTop.params.control = galleryThumbs;
            galleryThumbs.params.control = galleryTop;
        }, 500);
    });
    
    var galleryTop = new Swiper('.gallery-top-blueprint', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
    });
    var galleryThumbs = new Swiper('.gallery-thumbs-blueprint', {
        spaceBetween: 98,
        slidesPerView: 3,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        slideToClickedSlide: true,
        breakpoints: {
            // when window width is <= 767px
            767: {
                slidesPerView: 2,
                spaceBetween: 14
            }
        }
    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;

    // init Isotope
    var $grid = $('.properties-list').isotope({
        itemSelector: '.country-status',
        getSortData: {
            name:   '.property-title',
            /*date: function ($elem) {
                return Date.parse($elem.find('.date').text());
            }*/
        }
    });

    var filters = {};

    $('.filters').on( 'click', '.button', function() {
        var $this = $(this);
        var $buttonGroup = $this.parents('.button-group');
        var filterGroup = $buttonGroup.attr('data-filter-group');
        filters[ filterGroup ] = $this.attr('data-filter');
        var filterValue = concatValues( filters );
        $grid.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', '.the-status', function() {
            $buttonGroup.find('.is-checked').removeClass('item-active');
            $( this ).addClass('item-active');
        });
        $buttonGroup.on( 'click', '.the-country', function() {
            $buttonGroup.find('.is-checked').removeClass('item-active2');
            $( this ).addClass('item-active2');
        });
    });

    // flatten object by concatting values
    function concatValues( obj ) {
        var value = '';
        for ( var prop in obj ) {
            value += obj[ prop ];
        }
        return value;
    }


    // Sort function
    $('.sort-by-button-group').on( 'click', '.orderby', function() {

        /* Get the element name to sort */
        var sortValue = $(this).attr('data-sort-value');

        /* Get the sorting direction: asc||desc */
        var direction = $(this).attr('data-sort-direction');

        /* convert it to a boolean */
        var isAscending = (direction == 'asc');
        var newDirection = (isAscending) ? 'desc' : 'asc';

        console.log(sortValue);
        console.log(direction);

        /* pass it to isotope */
        $grid.isotope({ sortBy: sortValue, sortAscending: isAscending });

        $(this).attr('data-sort-direction', newDirection);

        var span = $(this).find('.fa');
        span.toggleClass('fa-chevron-up fa-chevron-down');

    });


});



