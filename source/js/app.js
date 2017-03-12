(function() {
  'use strict';

  setTimeout(function() {
    document.querySelector('.greating_picture').classList.add('m--show');
  }, 1000);
})();





$(document).ready(function(){
    $('#hum__nav').click(function(){
        $('#hum__nav').toggleClass('open');
        $('.open-nav').fadeToggle("slow");
    });
    $('.flip-container').addClass('animated flipInX');


    $("#link").click(function(){
        $('.back').css({
            'transform' : 'rotateY(0deg)'
        });
        $('.front').css({
            'transform' : 'rotateY(180deg)'
        });
    });


    var Slider = (function () {
        var items = $('.work-slider__item', '.work-slider__list_next'),
            index = 1,
            ndx,
            duration = 500,
            title = $('.work__title'),
            skills = $('.work__technology'),
            imgContainer = $('.work__pic');

        function _init() {
            var activeItem = items.eq(index),
                imgSrc = activeItem.find('img').attr('src'),
                activeTitle = activeItem.data('title'),
                activeSlill = activeItem.data('technology');

            imgContainer.attr('src', imgSrc);
            title.text(activeTitle);
            skills.text(activeSlill);

            var nextItem = $('.work-slider__item', '.work-slider__list_next').eq(index + 1);
            nextItem.addClass('work-slider__item_current');
            var prevItem = $('.work-slider__item', '.work-slider__list_prev').eq(index - 1);
            prevItem.addClass('work-slider__item_current');
        }

        function animateSlide(ndx, container, direction) {
            var nextItems = $('.work-slider__item', container),
                currentItem = nextItems.filter('.work-slider__item_current'),
                reqItem = nextItems.eq(ndx);
            direction = direction === 'up' ? -100 : 100;

            currentItem.animate({
                'top': direction + '%'
            }, duration);

            reqItem.animate({
                'top': 0
            }, duration, function () {
                currentItem.removeClass('work-slider__item_current').css('top', -direction + '%');
                reqItem.addClass('work-slider__item_current');
            })
        }

        function _moveNext() {
            var container = $('.work-slider__list_next'),
                direction = 'up';

            if (index == items.length - 1) {
                ndx = 0;
            } else if (index < 0) {
                ndx = items.length - 1;
            } else {
                ndx = index + 1;
            }

            animateSlide(ndx, container, direction);
        }

        function _movePrev() {
            var container = $('.work-slider__list_prev'),
                direction = 'down';

            if (index > items.length - 1) {
                ndx = 0;
            } else if (index <= 0) {
                ndx = items.length - 1;
            } else {
                ndx = index - 1;
            }

            animateSlide(ndx, container, direction);
        }

        function _slideShow() {
            var fadedOut = $.Deferred(),
                loaded = $.Deferred(),
                nextSrc = items.eq(index).find('img').attr('src'),
                nextTitle = items.eq(index).data('title'),
                nextSkills = items.eq(index).data('technology');

            _moveNext();
            _movePrev();

            imgContainer.fadeOut(function () {
                title.slideUp();
                skills.fadeOut();
                fadedOut.resolve();
            });

            fadedOut.done(function () {
                title.text(nextTitle);
                skills.text(nextSkills);
                imgContainer.attr('src', nextSrc).on('load', function () {
                    loaded.resolve();
                })
            });

            loaded.done(function () {
                title.slideDown();
                skills.fadeIn();
                imgContainer.fadeIn();
            });
        }

        return {
            init: _init,
            move: function () {

                $('.toggle__link').on('click', function (e) {
                    e.preventDefault();

                    if ($(this).hasClass('toggle__link_next')) {
                        index++;
                    } else if ($(this).hasClass('toggle__link_prev')) {
                        index--;
                    }

                    if (index > items.length - 1) {
                        index = 0;
                    } else if (index < 0) {
                        index = items.length - 1;
                    }

                    _slideShow();

                })
            }
        }
    })
    ();





    var parallaxContainer = document.getElementById('parallax'),
        layers = parallaxContainer.children;
    window.addEventListener('mousemove', function (e) {
        var pageX = e.pageX,
            pageY = e.pageY,
            initialX = (window.innerWidth / 2) - pageX,
            initialY = (window.innerHeight / 2) - pageY;

        [].slice.call(layers).forEach(function (layer, i) {
            var
                divider = i / 100,
                bottomPosition = (window.innerHeight / 2) * divider,
                positionX = initialX * divider,
                positionY = initialY * divider,
                layerStyle = layer.style,
                transformString = 'translate3d('+ positionX + 'px,' + positionY + 'px, 0)';

            layerStyle.transform = transformString;
            layerStyle.bottom = '-' + bottomPosition + 'px';

        });


    });


    var preloader = (function(){
        var percentsTotal = 0;
        var preloader = $('.preloader');

        var imgPath = $('*').map(function (ndx, element) {
            var background = $(element).css('background-image');
            var isImg = $(element).is('img');
            var path = '';

            if (background != 'none') {
                path = background.replace('url("', '').replace('")', '');
            }

            if (isImg) {
                path = $(element).attr('src');
            }

            if (path) return path;
        });

        var setPercents = function(total, current) {
            var percents = Math.ceil(current / total * 100);

            $('.preloader__percents').text(percents + '%');

            if (percents >= 100) {
                preloader.fadeOut();
            }
        }

        var loadImages = function(images) {

            if (!images.length) preloader.fadeOut();

            images.forEach(function(img, i, images){
                var fakeImage = $('<img>', {
                    attr : {
                        src : img
                    }
                });

                fakeImage.on('load error', function(){
                    percentsTotal++;
                    setPercents(images.length, percentsTotal);
                });
            });

        }

        return {
            init: function () {
                var imgs = imgPath.toArray();

                loadImages(imgs);
            }
        }
    }());

    $(function () {
        preloader.init();
    });
});


jQuery(document).ready(function($){
    //set your google maps parameters
    var latitude = 56.862230,
        longitude = 53.217372,
        map_zoom = 13;

    //google map custom marker icon - .png fallback for IE11
    var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
    var marker_url = ( is_internetExplorer11 ) ? 'img/cd-icon-location.png' : 'img/cd-icon-location.svg';

    //define the basic color of your map, plus a value for saturation and brightness
    var	main_color = '#2d313f',
        water_color = '#25C5AE',
        saturation_value= -20,
        brightness_value= 5;

    //we define here the style of the map
    var style= [
        {
            //set saturation for the labels on the map
            elementType: "labels",
            stylers: [
                {saturation: saturation_value}
            ]
        },
        {	//poi stands for point of interest - don't show these lables on the map
            featureType: "poi",
            elementType: "labels",
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            //don't show highways lables on the map
            featureType: 'road.highway',
            elementType: 'labels',
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            //don't show local road lables on the map
            featureType: "road.local",
            elementType: "labels.icon",
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            //don't show arterial road lables on the map
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            //don't show road lables on the map
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
                {visibility: "off"}
            ]
        },
        //style different elements on the map
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.government",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.sport_complex",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.attraction",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.business",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "transit.station",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "landscape",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]

        },
        {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                { hue: water_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }
    ];

    //set google map options
    var map_options = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: map_zoom,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: style,
    }
    //inizialize the map
    var map = new google.maps.Map(document.getElementById('google-container'), map_options);
    //add a custom marker to the map
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        visible: true,
        icon: marker_url,
    });

    //add custom buttons for the zoom-in/zoom-out on the map
    function CustomZoomControl(controlDiv, map) {
        //grap the zoom elements from the DOM and insert them in the map
        var controlUIzoomIn= document.getElementById('cd-zoom-in'),
            controlUIzoomOut= document.getElementById('cd-zoom-out');
        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);

        // Setup the click event listeners and zoom-in or out according to the clicked element
        google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
            map.setZoom(map.getZoom()+1)
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
            map.setZoom(map.getZoom()-1)
        });
    }

    var zoomControlDiv = document.createElement('div');
    var zoomControl = new CustomZoomControl(zoomControlDiv, map);

    //insert the zoom div on the top left of the map
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
});

var s = Snap('.skills__circle-above');
var progress = s.select('.skills__circle-above');

progress.attr({strokeDasharray: '0, 110'});
Snap.animate(0,110, function( value ) {
    progress.attr({ 'stroke-dasharray':value+',110'});
}, 5000);









