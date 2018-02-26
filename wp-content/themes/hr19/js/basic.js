jQuery(document).ready(function ($) {

    // Swiper Property
    var swiper = new Swiper('.swiper-property', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.fraction',
        paginationType: 'fraction',
        loop: 'true'
    });

    // Sticky info property
    var navheight = $('.menu-button').outerHeight();
    $(".property-info-heading").sticky({});

    // Footer Go to top functionality
    $(".footer-top").click(function () {
        $("html, body").animate({scrollTop: 0}, 2000);
    });

    //Menu functionality
    var slideLeft = new Menu({
        wrapper: '#o-wrapper',
        type: 'slide-left',
        menuOpenerClass: '.c-button',
        maskId: '#c-mask'
    });

    var slideLeftBtn = document.querySelector('#c-button--slide-left');
    slideLeftBtn.addEventListener('click', function (e) {
        e.preventDefault;
        slideLeft.open();
    });

    // Close menu on menu item clicked
    var close = document.querySelector('#menu-item-27');
    if (close != null) {
        close.addEventListener('click', function (e) {
            e.preventDefault;
            slideLeft.close();
        });
    }

    // Close menu on menu item clicked
    var close = document.querySelector('#menu-item-24');
    if (close != null) {
        close.addEventListener('click', function (e) {
            e.preventDefault;
            slideLeft.close();
        });
    }

    // Go to top functionality
    $(".footer-top").click(function () {
        $("html, body").animate({scrollTop: 0}, 2000);
    });

    //Menu flags
    $('.hr-menu-language-flag').click(function () {
        $('.hr-menu-language-flag').css('opacity', 0.4);
        $(this).css('opacity', 1);
    });

    // Add Swiper Flags
    var swiperFlag = new Swiper('.swiper-container-flags', {
        //initialSlide: 1,
        nested: true,
    });

    // Adding Swiper functionality to flags
    $('.flag-image').on('click', function () {
        var index = $(this).data('pagination');
        swiperFlag.slideTo(index - 1);
    });

    $(".flag-image").click(function (e) {
        $(".flag-image-opacity").removeClass("flag-image-opacity");
        $(this).addClass("flag-image-opacity");
    });

    //Menu contact us functionality
    $("#menu-item-17").click(function (e) {
        e.preventDefault;
        slideLeft.close();
        var position = $("#contact-us").offset().top;
        var finalPosition = position - 80;
        $('html, body').animate({
            scrollTop: finalPosition
        }, 2000);
    });
    $("#menu-item-343").click(function (e) {
        e.preventDefault;
        slideLeft.close();
        var position = $("#contact-us").offset().top;
        var finalPosition = position - 80;
        $('html, body').animate({
            scrollTop: finalPosition
        }, 2000);
    });

    //Menu rentalone us functionality
    /*$("#menu-item-51").click(function (e) {
        e.preventDefault;
        slideLeft.close();
        var position = $("#rentalone").offset().top;
        var finalPosition = position - 80;
        $('html, body').animate({
            scrollTop: finalPosition
        }, 2000);
    });*/

    //Agents profiles background color
    $(".agent-profile:even").css("background", "#d6d6d6");
    $(".agent-profile:odd").css("background", "#f0f0f0");

    //Agent properties show and hide
    $(".properties-number").click(function () {
        $(this).find("i").toggleClass("fa-caret-down").toggleClass("fa-caret-up");
        var t = $(this);
        $('#' + t.data('target')).slideToggle("slow");
    });

    // Menu landscape height
    var height = $(window).height();
    var navheight = $('.menu-button').outerHeight();
    $('.menu-wrapper').height(height - navheight);

    window.addEventListener("resize", function () {
        setTimeout(function () {
            var height = $(window).height();
            var navheight = $('.menu-button').outerHeight();
            $('.menu-wrapper').height(height - navheight);
        }, 500);
    }, false);

    //Panel plus-minus change
    $('.panel-title a').click(function () {
        if ($(this).attr('aria-expanded') === "true") {
            $(this).next("i").removeClass("fa-minus");
            $(this).next("i").addClass("fa-plus");
        } else {
            $(this).next("i").removeClass("fa-plus");
            $(this).next("i").addClass("fa-minus");
        }
    });
    $('.panel-title i').click(function () {
        if ($(this).attr('aria-expanded') === "true") {
            $(this).removeClass("fa-minus");
            $(this).addClass("fa-plus");
        } else {
            $(this).removeClass("fa-plus");
            $(this).addClass("fa-minus");
        }
    });

    //HOA tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    // Show-Hide search map
    $('#map-switch').click(function () {
        $("#search-map").slideToggle();
        $("html, body").animate({scrollTop: 0}, 500);
        $(".property-list").toggleClass('property-list-search');
        if ($('.text-map').text() == 'Ocultar mapa') {
            $('.text-map').html('Ver mapa');
        } else if ($('.text-map').text() == 'Ver mapa') {
            $('.text-map').html('Ocultar mapa');
        } else if ($('.text-map').text() == 'Hide map') {
            $('.text-map').html('Show map');
        } else {
            $('.text-map').html('Hide map');
        }
    });

    // Search form validation
    $('#property-search').validator().on('submit', function (e) {
        if (e.isDefaultPrevented()) {
            $('#s').addClass('placeholder-error');
            $("#s").attr("placeholder", hr19.acrequired);
        }
    });

    //Menu mobile change icon
    $('.navbar-toggle').click(function () {
        if ($(this).attr('aria-expanded') === "true") {
            $(this).children("i").removeClass("fa-times");
            $(this).children("i").addClass("fa-filter");
        } else {
            $(this).children("i").removeClass("fa-filter");
            $(this).children("i").addClass("fa-times");
        }
    });

    //Filters get selected option
    $(".clickdd li a").click(function () {
        $(this).parents(".dropdown").find('.dropdown-toggle').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.dropdown-toggle').val($(this).data('value'));
    });
    $("#any-price").click(function () {
        $(this).parents(".dropdown").removeClass('open');
    });
    $("#max-list li a").click(function () {
        $(this).parents(".dropdown").removeClass('open');
    });

    // Autocomplete data from database
    var cities = JSON.parse(hr19.cities);
    var addresses = JSON.parse(hr19.addresses);
    var postalcodes = JSON.parse(hr19.postalcodes);

    var city = $.map(cities, function (q) {
        return {value: q, data: {category: hr19.acaddress}};
    });
    var add = $.map(addresses, function (q) {
        return {value: q, data: {category: hr19.accity}};
    });
    var pc = $.map(postalcodes, function (q) {
        return {value: q, data: {category: hr19.acpc}};
    });

    var query = city.concat(add, pc);
    // Initialize autocomplete
    $('#s').devbridgeAutocomplete({
        lookup: query,
        minChars: 1,
        autoSelectFirst: true,
        showNoSuggestionNotice: true,
        noSuggestionNotice: hr19.msj,
        groupBy: 'category',
        onSearchStart: function () {
            $('body').addClass('has-active-menu');
        },
        onHide: function () {
            $('body').removeClass('has-active-menu');
        },
        onSelect: function (suggestion) {
            var actualValue = $('#s').val();
            if (actualValue != suggestion.value) {
                $(this).closest('form').submit();
            }
            $('body').removeClass('has-active-menu');
        },
    });

    // Stop propagation (close) propety types dropdown
    $(document).on('click', '#property-type-dd', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', '#price-dd', function (e) {
        e.stopPropagation();
    });

    // Submit form on click option
    $(document).on('click', '.clickdd li a', function (e) {
        $(this).closest('form').submit();
    });
    $(document).on('click', '#min-list li a', function (e) {
        $('#min').focus();
    });
    $(document).on('click', '#max-list li a', function (e) {
        $(this).closest('form').submit();
    });
    $(document).on('click', '#any-price', function (e) {
        $('#min').val('');
        $('#max').val('');
        $(this).closest('form').submit();
    });
    $('input[type=radio][name=showowner]').change(function () {
        $(this).closest('form').submit();
    });
    $(document).on('click', '#usa', function (e) {
        e.preventDefault();
        var selcountry = $(this).attr('data-value');
        $("#country").val(selcountry);
        $(this).closest('form').submit();
    });
    $(document).on('click', '#spain', function (e) {
        e.preventDefault();
        var selcountry = $(this).attr('data-value');
        $("#country").val(selcountry);
        $(this).closest('form').submit();
    });

    // Set input hidden values by selected option clicked
    $("#baths-dd li a").click(function () {
        var selbath = $(this).attr('data-value');
        $("#baths").val(selbath);
    });
    $("#rooms-dd li a").click(function () {
        var selroom = $(this).attr('data-value');
        $("#rooms").val(selroom);
    });
    $("#transction-dd li a").click(function () {
        var seltransc = $(this).attr('data-value');
        $("#transaction").val(seltransc);
    });
    $('#property-type-dd input[type=checkbox]').change(function () {
        if ($('input[type=checkbox]:checked')) {
            var vals = $('input[type=checkbox]:checked').map(function () {
                return $(this).val();
            }).get().join(',');
            $('#proptype').val(vals);
            $(this).closest('form').submit();
        } else {
            $('#proptype').val("");
            $(this).closest('form').submit();
        }
    });
    $("#proporder").change(function () {
        var firstTimeInput = $('#firstTimeLoad');
        switch (+this.value) {
            case 0:
                $("#proporderby").val("date");
                $("#propsort").val("ASC");
                break;
            case 1:
                $("#proporderby").val("date");
                $("#propsort").val("DESC");
                break;
            case 2:
                $("#proporderby").val("_pr_current_price");
                $("#propsort").val("DESC");
                break;
            case 3:
                $("#proporderby").val("_pr_current_price");
                $("#propsort").val("ASC");
                break;
        }
        if (firstTimeInput.val() == 1) {
            firstTimeInput.val(0);
        }
        else {
            $("#proporder").closest('form').submit();
        }

    }).change();

    // Set min-max values
    $("#min-list li a").click(function () {
        var selmin = $(this).attr('data-value');
        $("#min").val(selmin);
    });
    $("#max-list li a").click(function () {
        var selmax = $(this).attr('data-value');
        $("#max").val(selmax);
    });


    //Search Google Maps
    var propertiesArray = [];
    $('.property').each(function () {
        var propertyData = {};
        propertyData.image = $(this).find('.property-image').attr('data-url');
        propertyData.address = $(this).find('.property-address').html();
        propertyData.address = propertyData.address.replace(/[\t\n,]/g, '');
        propertyData.price = $(this).find('.property-price').html();
        propertyData.highlights = $(this).find('.property-highlights').html();
        propertyData.highlights = propertyData.highlights.replace(/[\t\n,]/g, '');
        propertyData.mls = $(this).find('.property-code').html();
        propertyData.mls = (propertyData.mls).substring(5);
        propertiesArray.push(propertyData);
    });

    //Search Google Maps
    var locations = [];
    for (var i in propertiesArray) {
        locations.push(propertiesArray[i]);
    }

    var geocoder;
    var map;
    var bounds = new google.maps.LatLngBounds();
    var infowindows = [];
    var activeMarker = '';
    var allData = [];
    var place = '';

    function initialize() {

        geocoder = new google.maps.Geocoder();

        //Get city searched
        if (locations.length == 0) {
            geocoder.geocode({'address': hr19.place}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var place = {"lat": results[0].geometry.location.lat(), "long": results[0].geometry.location.lng()};
                    map = new google.maps.Map(
                        document.getElementById("search-map"), {
                            center: new google.maps.LatLng(place.lat, place.long),
                            zoom: 7,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            mapTypeControl: false,
                            fullscreenControl: false
                        });
                }
            });
        } else {
            map = new google.maps.Map(
                document.getElementById("search-map"), {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false,
                    fullscreenControl: false
                });
        }

        oms = new OverlappingMarkerSpiderfier(map, {markersWontMove: true, markersWontHide: true});
        for (i = 0; i < locations.length; i++) {
            geocodeAddress(locations, i);
            oms.addListener('format', function (marker, status) {
                var text = '';

                if (status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIED) {
                    var iconSize = new google.maps.Size(36, 35);
                    marker.setIcon({
                        url: hr19.root + '/assets/icon-plus-group.svg',
                        size: iconSize,
                        scaledSize: iconSize,
                        labelOrigin: new google.maps.Point(17, 25),
                        origin: new google.maps.Point(0.5, -10),
                    });
                    text = marker.price;
                    color = '#ffffff';
                    size = "7px";
                }

                if (status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE) {
                    var iconSize = new google.maps.Size(70, 70);
                    marker.setIcon({
                        url: hr19.root + '/assets/pointgreen.svg',
                        size: iconSize,
                        scaledSize: iconSize,
                    });

                    text = "More...";
                    size = "10px";
                    color = '#ffffff';
                }

                if (status == OverlappingMarkerSpiderfier.markerStatus.UNSPIDERFIABLE) {
                    var iconSize = new google.maps.Size(70, 70);
                    marker.setIcon({
                        url: hr19.root + '/assets/pointgreen.svg',
                        size: iconSize,
                        scaledSize: iconSize,
                    });
                    text = marker.price;
                    size = "10px";
                    color = '#ffffff';
                }

                marker.setLabel({
                    text: text,
                    color: color,
                    fontWeight: "bold",
                    fontFamily: 'Montserrat-Regular',
                    fontSize: size,
                });
            });
        }

        iw = new google.maps.InfoWindow();

        function iwClose() {
            iw.close();
        }

        google.maps.event.addListener(map, 'click', iwClose);
    }

    google.maps.event.addDomListener(window, "load", initialize);

    function geocodeAddress(locations, i) {
        var priceUnformatted = locations[i].price;
        var price = '';
        if (priceUnformatted > 999 && priceUnformatted < 1000000) {
            price = (priceUnformatted / 1000) + 'K';
        }
        else if (priceUnformatted >= 1000000) {
            price = (priceUnformatted / 1000000) + 'm';
        }
        else {
            price = priceUnformatted;
        }

        var cont = 0;
        var address = locations[i].address;
        var highlights = locations[i].highlights;
        var mls = locations[i].mls;
        var image = locations[i].image;
        geocoder.geocode({
                'address': address
            },

            function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    var marker = new google.maps.Marker({
                        map: map,
                        optimized: false,
                        position: results[0].geometry.location,
                        address: address,
                        price: price,
                        highlights: highlights,
                        mls: mls,
                        image: image,
                    });

                    bounds.extend(marker.position);

                    var html = "<a href=property/" + mls + "><div class='info-container'>" +
                        "<div class='info-image' style='background-image: url(" + image + ")'></div>" +
                        "<div class='info-data'>" +
                        "<h2 class='info-data-price'>" + price + "</h2>" +
                        "<h3 class='info-data-highlights'>" + highlights + "</h3>" +
                        "<h3 class='info-data-address'>" + address + "</h3>" +
                        "<h3 class='info-data-mls'>MLS: " + mls + "</h3>" +
                        "</div>" +
                        "</div></a>"
                    ;

                    google.maps.event.addListener(marker, 'click', iwClose);
                    oms.addMarker(marker, function (e) {
                        iw.setContent(html);
                        iw.open(map, marker);
                    });

                    map.fitBounds(bounds);
                }

            });
    }

    window.setTimeout(initialize(), 5000)

    function iwClose() {
        iw.close();
    }

    // Price range function
    $("#min").focus(function () {
        $("#min-list").show();
        $("#max-list").hide();
    });
    $("#max").focus(function () {
        $("#min-list").hide();
        $("#max-list").show();
    });

    $('.nn .wp-pagenavi a').on('click', function (e) {
        e.preventDefault();
        var link = $(this).attr('href');
        $('#responsed').load(link + ' #responsed', function () {
            $('#responsed').fadeIn();
        });
    });

    $('#go-back').click(function () {
        parent.history.back();
        return false;
    });


});


// Property sale/lease/presale scroll animation
$(window).on('load', function () {
    if ($('#presale-list').length) {
        var position = $("#presale-list").offset().top;
        var finalPosition = position - 80;
        $('html, body').animate({
            scrollTop: finalPosition
        }, 1000);
    }
    if ($('#lease-list').length) {
        var position = $("#lease-list").offset().top;
        var finalPosition = position - 80;
        $('html, body').animate({
            scrollTop: finalPosition
        }, 1000);
    }
    if ($('#buy-list').length) {
        var position = $("#buy-list").offset().top;
        var finalPosition = position - 80;
        $('html, body').animate({
            scrollTop: finalPosition
        }, 1000);
    }
    if ($('#map-detail').is(':empty')) {
        $('.prlocation').css('display', 'none');
    }

    var screen = $(window);
    if (screen.width() > 767) {
        if (window.location.href.indexOf("firstTimeLoad") > -1) {
            $('html, body').animate({
                scrollTop: $(".property-list").offset().top - 170
            }, 500);
        }
        if (window.location.href.indexOf("page") > -1 || window.location.href.indexOf("section") > -1) {
            $('html, body').animate({
                scrollTop: $(".property-list").offset().top - 170
            }, 500);
        }
        if (document.referrer.indexOf("/page") > 0) {
            $('html, body').animate({
                scrollTop: $(".property-list").offset().top - 170
            }, 500);
        }
    }

    //Slider Amenities
    var slideComodidades;
    $('.gallery-comodidades').click(function () {
        slideComodidades = $(this).attr('data-number');
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
                galleryThumbs.slideTo(slideComodidades, 0);
            }, 500);
        });
    });

    var slideDetalles;
    $('.gallery-detalles').click(function () {
        slideDetalles = $(this).attr('data-number');
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
                galleryThumbs.slideTo(slideDetalles, 0);
            }, 500);
        });
    });

    var galleryTop = new Swiper('.gallery-top-blueprint', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        initialSlide: 1
    });
    var galleryThumbs = new Swiper('.gallery-thumbs-blueprint', {
        spaceBetween: 98,
        slidesPerView: 3,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        slideToClickedSlide: true,
        initialSlide: 1,
        centeredSlides: true,
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

});

// Show/Hide Filter button on scroll
var screen = $(window);
if (screen.width() < 768) {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 400) {
            $('#search-filters').fadeOut();
        } else {
            $('#search-filters').fadeIn();
        }
    });
}

$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 800) {
        $('.footer-top').fadeIn();
    } else {
        $('.footer-top').fadeOut();
    }
});

//Objetivo: Devolver la ruta correspondiente para el cambio de idiomas en el header

$(document).on('change', '#sl-lgg', function (e) {

    window.location.href = $('#sl-lgg').val();

});


 
