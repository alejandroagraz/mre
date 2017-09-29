/**
 * Created by mtoledo on 3/8/17.
 */
jQuery(document).ready(function() {
  $("#go-to-top").click(function () {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    return false;
  });

  //Header and Menu Swiper
  var toggleMenu = function(){
    if (swiper.previousIndex == 0)
      swiper.slidePrev();
  }
    , menuButton = document.getElementsByClassName('menu-button')[0]
    , swiper = new Swiper('.swiper-container-menu', {
    slidesPerView: 'auto'
    , initialSlide: 1
    , resistanceRatio: .00000000000001
    , onSlideChangeStart: function(slider) {
      if (slider.activeIndex == 0) {
        menuButton.classList.add('cross');
        menuButton.removeEventListener('click', toggleMenu, false);
      } else
        menuButton.classList.remove('cross');
    }
    , onSlideChangeEnd: function(slider) {
      if (slider.activeIndex == 0)
        menuButton.removeEventListener('click', toggleMenu, false);
      else
        menuButton.addEventListener('click', toggleMenu, false);
    }
    , slideToClickedSlide: true
  });


  // Add Swiper Flags
  var swiperFlag = new Swiper('.swiper-container-flags', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
  });

  // Adding Swiper functionality to flags
  $('.flag-image').on('click', function() {
    var index = $(this).data('pagination');
    swiperFlag.slideTo(index-1);
    console.log(index);
    if (index == 1) {
      $('#flag-image-1').addClass('flag-image-opacity');
      $('#flag-image-2').removeClass('flag-image-opacity');
    } else {
      $('#flag-image-1').removeClass('flag-image-opacity');
      $('#flag-image-2').addClass('flag-image-opacity');
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

});

