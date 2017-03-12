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










//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWF0aW5nX3BpY3R1cmUnKS5jbGFzc0xpc3QuYWRkKCdtLS1zaG93Jyk7XHJcbiAgfSwgMTAwMCk7XHJcbn0pKCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICQoJyNodW1fX25hdicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnI2h1bV9fbmF2JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAkKCcub3Blbi1uYXYnKS5mYWRlVG9nZ2xlKFwic2xvd1wiKTtcclxuICAgIH0pO1xyXG4gICAgJCgnLmZsaXAtY29udGFpbmVyJykuYWRkQ2xhc3MoJ2FuaW1hdGVkIGZsaXBJblgnKTtcclxuXHJcblxyXG4gICAgJChcIiNsaW5rXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnLmJhY2snKS5jc3Moe1xyXG4gICAgICAgICAgICAndHJhbnNmb3JtJyA6ICdyb3RhdGVZKDBkZWcpJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5mcm9udCcpLmNzcyh7XHJcbiAgICAgICAgICAgICd0cmFuc2Zvcm0nIDogJ3JvdGF0ZVkoMTgwZGVnKSdcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICB2YXIgU2xpZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaXRlbXMgPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCAnLndvcmstc2xpZGVyX19saXN0X25leHQnKSxcclxuICAgICAgICAgICAgaW5kZXggPSAxLFxyXG4gICAgICAgICAgICBuZHgsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0gNTAwLFxyXG4gICAgICAgICAgICB0aXRsZSA9ICQoJy53b3JrX190aXRsZScpLFxyXG4gICAgICAgICAgICBza2lsbHMgPSAkKCcud29ya19fdGVjaG5vbG9neScpLFxyXG4gICAgICAgICAgICBpbWdDb250YWluZXIgPSAkKCcud29ya19fcGljJyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9pbml0KCkge1xyXG4gICAgICAgICAgICB2YXIgYWN0aXZlSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuICAgICAgICAgICAgICAgIGltZ1NyYyA9IGFjdGl2ZUl0ZW0uZmluZCgnaW1nJykuYXR0cignc3JjJyksXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVUaXRsZSA9IGFjdGl2ZUl0ZW0uZGF0YSgndGl0bGUnKSxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZVNsaWxsID0gYWN0aXZlSXRlbS5kYXRhKCd0ZWNobm9sb2d5Jyk7XHJcblxyXG4gICAgICAgICAgICBpbWdDb250YWluZXIuYXR0cignc3JjJywgaW1nU3JjKTtcclxuICAgICAgICAgICAgdGl0bGUudGV4dChhY3RpdmVUaXRsZSk7XHJcbiAgICAgICAgICAgIHNraWxscy50ZXh0KGFjdGl2ZVNsaWxsKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBuZXh0SXRlbSA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsICcud29yay1zbGlkZXJfX2xpc3RfbmV4dCcpLmVxKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIG5leHRJdGVtLmFkZENsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50Jyk7XHJcbiAgICAgICAgICAgIHZhciBwcmV2SXRlbSA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsICcud29yay1zbGlkZXJfX2xpc3RfcHJldicpLmVxKGluZGV4IC0gMSk7XHJcbiAgICAgICAgICAgIHByZXZJdGVtLmFkZENsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhbmltYXRlU2xpZGUobmR4LCBjb250YWluZXIsIGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgbmV4dEl0ZW1zID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgY29udGFpbmVyKSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtID0gbmV4dEl0ZW1zLmZpbHRlcignLndvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKSxcclxuICAgICAgICAgICAgICAgIHJlcUl0ZW0gPSBuZXh0SXRlbXMuZXEobmR4KTtcclxuICAgICAgICAgICAgZGlyZWN0aW9uID0gZGlyZWN0aW9uID09PSAndXAnID8gLTEwMCA6IDEwMDtcclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgJ3RvcCc6IGRpcmVjdGlvbiArICclJ1xyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICByZXFJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgJ3RvcCc6IDBcclxuICAgICAgICAgICAgfSwgZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtLnJlbW92ZUNsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50JykuY3NzKCd0b3AnLCAtZGlyZWN0aW9uICsgJyUnKTtcclxuICAgICAgICAgICAgICAgIHJlcUl0ZW0uYWRkQ2xhc3MoJ3dvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9tb3ZlTmV4dCgpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoJy53b3JrLXNsaWRlcl9fbGlzdF9uZXh0JyksXHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAndXAnO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4ID09IGl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIG5keCA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZHggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmR4ID0gaW5kZXggKyAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhbmltYXRlU2xpZGUobmR4LCBjb250YWluZXIsIGRpcmVjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfbW92ZVByZXYoKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSAkKCcud29yay1zbGlkZXJfX2xpc3RfcHJldicpLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJ2Rvd24nO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgbmR4ID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZHggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmR4ID0gaW5kZXggLSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhbmltYXRlU2xpZGUobmR4LCBjb250YWluZXIsIGRpcmVjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfc2xpZGVTaG93KCkge1xyXG4gICAgICAgICAgICB2YXIgZmFkZWRPdXQgPSAkLkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgICAgICBsb2FkZWQgPSAkLkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgICAgICBuZXh0U3JjID0gaXRlbXMuZXEoaW5kZXgpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxyXG4gICAgICAgICAgICAgICAgbmV4dFRpdGxlID0gaXRlbXMuZXEoaW5kZXgpLmRhdGEoJ3RpdGxlJyksXHJcbiAgICAgICAgICAgICAgICBuZXh0U2tpbGxzID0gaXRlbXMuZXEoaW5kZXgpLmRhdGEoJ3RlY2hub2xvZ3knKTtcclxuXHJcbiAgICAgICAgICAgIF9tb3ZlTmV4dCgpO1xyXG4gICAgICAgICAgICBfbW92ZVByZXYoKTtcclxuXHJcbiAgICAgICAgICAgIGltZ0NvbnRhaW5lci5mYWRlT3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgICAgIHNraWxscy5mYWRlT3V0KCk7XHJcbiAgICAgICAgICAgICAgICBmYWRlZE91dC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZmFkZWRPdXQuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZS50ZXh0KG5leHRUaXRsZSk7XHJcbiAgICAgICAgICAgICAgICBza2lsbHMudGV4dChuZXh0U2tpbGxzKTtcclxuICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lci5hdHRyKCdzcmMnLCBuZXh0U3JjKS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsb2FkZWQuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZS5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgICAgIHNraWxscy5mYWRlSW4oKTtcclxuICAgICAgICAgICAgICAgIGltZ0NvbnRhaW5lci5mYWRlSW4oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0OiBfaW5pdCxcclxuICAgICAgICAgICAgbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy50b2dnbGVfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3RvZ2dsZV9fbGlua19uZXh0JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3RvZ2dsZV9fbGlua19wcmV2JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgtLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IGl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF9zbGlkZVNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgICgpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICB2YXIgcGFyYWxsYXhDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFyYWxsYXgnKSxcclxuICAgICAgICBsYXllcnMgPSBwYXJhbGxheENvbnRhaW5lci5jaGlsZHJlbjtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBwYWdlWCA9IGUucGFnZVgsXHJcbiAgICAgICAgICAgIHBhZ2VZID0gZS5wYWdlWSxcclxuICAgICAgICAgICAgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxyXG4gICAgICAgICAgICBpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIHBhZ2VZO1xyXG5cclxuICAgICAgICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcclxuICAgICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgICBkaXZpZGVyID0gaSAvIDEwMCxcclxuICAgICAgICAgICAgICAgIGJvdHRvbVBvc2l0aW9uID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpICogZGl2aWRlcixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWCA9IGluaXRpYWxYICogZGl2aWRlcixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uWSA9IGluaXRpYWxZICogZGl2aWRlcixcclxuICAgICAgICAgICAgICAgIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgnKyBwb3NpdGlvblggKyAncHgsJyArIHBvc2l0aW9uWSArICdweCwgMCknO1xyXG5cclxuICAgICAgICAgICAgbGF5ZXJTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgICAgIGxheWVyU3R5bGUuYm90dG9tID0gJy0nICsgYm90dG9tUG9zaXRpb24gKyAncHgnO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIHZhciBwcmVsb2FkZXIgPSAoZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgcGVyY2VudHNUb3RhbCA9IDA7XHJcbiAgICAgICAgdmFyIHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKTtcclxuXHJcbiAgICAgICAgdmFyIGltZ1BhdGggPSAkKCcqJykubWFwKGZ1bmN0aW9uIChuZHgsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGJhY2tncm91bmQgPSAkKGVsZW1lbnQpLmNzcygnYmFja2dyb3VuZC1pbWFnZScpO1xyXG4gICAgICAgICAgICB2YXIgaXNJbWcgPSAkKGVsZW1lbnQpLmlzKCdpbWcnKTtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGlzSW1nKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHBhdGgpIHJldHVybiBwYXRoO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgc2V0UGVyY2VudHMgPSBmdW5jdGlvbih0b3RhbCwgY3VycmVudCkge1xyXG4gICAgICAgICAgICB2YXIgcGVyY2VudHMgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcclxuXHJcbiAgICAgICAgICAgICQoJy5wcmVsb2FkZXJfX3BlcmNlbnRzJykudGV4dChwZXJjZW50cyArICclJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGVyY2VudHMgPj0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbG9hZEltYWdlcyA9IGZ1bmN0aW9uKGltYWdlcykge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpbWFnZXMubGVuZ3RoKSBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG5cclxuICAgICAgICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oaW1nLCBpLCBpbWFnZXMpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGZha2VJbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYyA6IGltZ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbWdzID0gaW1nUGF0aC50b0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0oKSk7XHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcHJlbG9hZGVyLmluaXQoKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpe1xyXG4gICAgLy9zZXQgeW91ciBnb29nbGUgbWFwcyBwYXJhbWV0ZXJzXHJcbiAgICB2YXIgbGF0aXR1ZGUgPSA1Ni44NjIyMzAsXHJcbiAgICAgICAgbG9uZ2l0dWRlID0gNTMuMjE3MzcyLFxyXG4gICAgICAgIG1hcF96b29tID0gMTM7XHJcblxyXG4gICAgLy9nb29nbGUgbWFwIGN1c3RvbSBtYXJrZXIgaWNvbiAtIC5wbmcgZmFsbGJhY2sgZm9yIElFMTFcclxuICAgIHZhciBpc19pbnRlcm5ldEV4cGxvcmVyMTE9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCd0cmlkZW50JykgPiAtMTtcclxuICAgIHZhciBtYXJrZXJfdXJsID0gKCBpc19pbnRlcm5ldEV4cGxvcmVyMTEgKSA/ICdpbWcvY2QtaWNvbi1sb2NhdGlvbi5wbmcnIDogJ2ltZy9jZC1pY29uLWxvY2F0aW9uLnN2Zyc7XHJcblxyXG4gICAgLy9kZWZpbmUgdGhlIGJhc2ljIGNvbG9yIG9mIHlvdXIgbWFwLCBwbHVzIGEgdmFsdWUgZm9yIHNhdHVyYXRpb24gYW5kIGJyaWdodG5lc3NcclxuICAgIHZhclx0bWFpbl9jb2xvciA9ICcjMmQzMTNmJyxcclxuICAgICAgICB3YXRlcl9jb2xvciA9ICcjMjVDNUFFJyxcclxuICAgICAgICBzYXR1cmF0aW9uX3ZhbHVlPSAtMjAsXHJcbiAgICAgICAgYnJpZ2h0bmVzc192YWx1ZT0gNTtcclxuXHJcbiAgICAvL3dlIGRlZmluZSBoZXJlIHRoZSBzdHlsZSBvZiB0aGUgbWFwXHJcbiAgICB2YXIgc3R5bGU9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vc2V0IHNhdHVyYXRpb24gZm9yIHRoZSBsYWJlbHMgb24gdGhlIG1hcFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJsYWJlbHNcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAge3NhdHVyYXRpb246IHNhdHVyYXRpb25fdmFsdWV9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcdC8vcG9pIHN0YW5kcyBmb3IgcG9pbnQgb2YgaW50ZXJlc3QgLSBkb24ndCBzaG93IHRoZXNlIGxhYmxlcyBvbiB0aGUgbWFwXHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcInBvaVwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJsYWJlbHNcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAge3Zpc2liaWxpdHk6IFwib2ZmXCJ9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9kb24ndCBzaG93IGhpZ2h3YXlzIGxhYmxlcyBvbiB0aGUgbWFwXHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiAncm9hZC5oaWdod2F5JyxcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6ICdsYWJlbHMnLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7dmlzaWJpbGl0eTogXCJvZmZcIn1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2Rvbid0IHNob3cgbG9jYWwgcm9hZCBsYWJsZXMgb24gdGhlIG1hcFxyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJyb2FkLmxvY2FsXCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHt2aXNpYmlsaXR5OiBcIm9mZlwifVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vZG9uJ3Qgc2hvdyBhcnRlcmlhbCByb2FkIGxhYmxlcyBvbiB0aGUgbWFwXHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcInJvYWQuYXJ0ZXJpYWxcIixcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAge3Zpc2liaWxpdHk6IFwib2ZmXCJ9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9kb24ndCBzaG93IHJvYWQgbGFibGVzIG9uIHRoZSBtYXBcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwicm9hZFwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5zdHJva2VcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAge3Zpc2liaWxpdHk6IFwib2ZmXCJ9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vc3R5bGUgZGlmZmVyZW50IGVsZW1lbnRzIG9uIHRoZSBtYXBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcInRyYW5zaXRcIixcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7IGh1ZTogbWFpbl9jb2xvciB9LFxyXG4gICAgICAgICAgICAgICAgeyB2aXNpYmlsaXR5OiBcIm9uXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbGlnaHRuZXNzOiBicmlnaHRuZXNzX3ZhbHVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHNhdHVyYXRpb246IHNhdHVyYXRpb25fdmFsdWUgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcInBvaVwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgaHVlOiBtYWluX2NvbG9yIH0sXHJcbiAgICAgICAgICAgICAgICB7IHZpc2liaWxpdHk6IFwib25cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSxcclxuICAgICAgICAgICAgICAgIHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwicG9pLmdvdmVybm1lbnRcIixcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7IGh1ZTogbWFpbl9jb2xvciB9LFxyXG4gICAgICAgICAgICAgICAgeyB2aXNpYmlsaXR5OiBcIm9uXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbGlnaHRuZXNzOiBicmlnaHRuZXNzX3ZhbHVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHNhdHVyYXRpb246IHNhdHVyYXRpb25fdmFsdWUgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcInBvaS5zcG9ydF9jb21wbGV4XCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJwb2kuYXR0cmFjdGlvblwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgaHVlOiBtYWluX2NvbG9yIH0sXHJcbiAgICAgICAgICAgICAgICB7IHZpc2liaWxpdHk6IFwib25cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSxcclxuICAgICAgICAgICAgICAgIHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwicG9pLmJ1c2luZXNzXCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJ0cmFuc2l0XCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJ0cmFuc2l0LnN0YXRpb25cIixcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7IGh1ZTogbWFpbl9jb2xvciB9LFxyXG4gICAgICAgICAgICAgICAgeyB2aXNpYmlsaXR5OiBcIm9uXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbGlnaHRuZXNzOiBicmlnaHRuZXNzX3ZhbHVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHNhdHVyYXRpb246IHNhdHVyYXRpb25fdmFsdWUgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcImxhbmRzY2FwZVwiLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7IGh1ZTogbWFpbl9jb2xvciB9LFxyXG4gICAgICAgICAgICAgICAgeyB2aXNpYmlsaXR5OiBcIm9uXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbGlnaHRuZXNzOiBicmlnaHRuZXNzX3ZhbHVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHNhdHVyYXRpb246IHNhdHVyYXRpb25fdmFsdWUgfVxyXG4gICAgICAgICAgICBdXHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJyb2FkXCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7IGh1ZTogbWFpbl9jb2xvciB9LFxyXG4gICAgICAgICAgICAgICAgeyB2aXNpYmlsaXR5OiBcIm9uXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbGlnaHRuZXNzOiBicmlnaHRuZXNzX3ZhbHVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHNhdHVyYXRpb246IHNhdHVyYXRpb25fdmFsdWUgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcIndhdGVyXCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgaHVlOiB3YXRlcl9jb2xvciB9LFxyXG4gICAgICAgICAgICAgICAgeyB2aXNpYmlsaXR5OiBcIm9uXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbGlnaHRuZXNzOiBicmlnaHRuZXNzX3ZhbHVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHNhdHVyYXRpb246IHNhdHVyYXRpb25fdmFsdWUgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICAvL3NldCBnb29nbGUgbWFwIG9wdGlvbnNcclxuICAgIHZhciBtYXBfb3B0aW9ucyA9IHtcclxuICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0aXR1ZGUsIGxvbmdpdHVkZSksXHJcbiAgICAgICAgem9vbTogbWFwX3pvb20sXHJcbiAgICAgICAgcGFuQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgem9vbUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcclxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgc3R5bGVzOiBzdHlsZSxcclxuICAgIH1cclxuICAgIC8vaW5pemlhbGl6ZSB0aGUgbWFwXHJcbiAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29vZ2xlLWNvbnRhaW5lcicpLCBtYXBfb3B0aW9ucyk7XHJcbiAgICAvL2FkZCBhIGN1c3RvbSBtYXJrZXIgdG8gdGhlIG1hcFxyXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdGl0dWRlLCBsb25naXR1ZGUpLFxyXG4gICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgaWNvbjogbWFya2VyX3VybCxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vYWRkIGN1c3RvbSBidXR0b25zIGZvciB0aGUgem9vbS1pbi96b29tLW91dCBvbiB0aGUgbWFwXHJcbiAgICBmdW5jdGlvbiBDdXN0b21ab29tQ29udHJvbChjb250cm9sRGl2LCBtYXApIHtcclxuICAgICAgICAvL2dyYXAgdGhlIHpvb20gZWxlbWVudHMgZnJvbSB0aGUgRE9NIGFuZCBpbnNlcnQgdGhlbSBpbiB0aGUgbWFwXHJcbiAgICAgICAgdmFyIGNvbnRyb2xVSXpvb21Jbj0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NkLXpvb20taW4nKSxcclxuICAgICAgICAgICAgY29udHJvbFVJem9vbU91dD0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NkLXpvb20tb3V0Jyk7XHJcbiAgICAgICAgY29udHJvbERpdi5hcHBlbmRDaGlsZChjb250cm9sVUl6b29tSW4pO1xyXG4gICAgICAgIGNvbnRyb2xEaXYuYXBwZW5kQ2hpbGQoY29udHJvbFVJem9vbU91dCk7XHJcblxyXG4gICAgICAgIC8vIFNldHVwIHRoZSBjbGljayBldmVudCBsaXN0ZW5lcnMgYW5kIHpvb20taW4gb3Igb3V0IGFjY29yZGluZyB0byB0aGUgY2xpY2tlZCBlbGVtZW50XHJcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIoY29udHJvbFVJem9vbUluLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbWFwLnNldFpvb20obWFwLmdldFpvb20oKSsxKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKGNvbnRyb2xVSXpvb21PdXQsICdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBtYXAuc2V0Wm9vbShtYXAuZ2V0Wm9vbSgpLTEpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHpvb21Db250cm9sRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB2YXIgem9vbUNvbnRyb2wgPSBuZXcgQ3VzdG9tWm9vbUNvbnRyb2woem9vbUNvbnRyb2xEaXYsIG1hcCk7XHJcblxyXG4gICAgLy9pbnNlcnQgdGhlIHpvb20gZGl2IG9uIHRoZSB0b3AgbGVmdCBvZiB0aGUgbWFwXHJcbiAgICBtYXAuY29udHJvbHNbZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLkxFRlRfVE9QXS5wdXNoKHpvb21Db250cm9sRGl2KTtcclxufSk7XHJcblxyXG52YXIgcyA9IFNuYXAoJy5za2lsbHNfX2NpcmNsZS1hYm92ZScpO1xyXG52YXIgcHJvZ3Jlc3MgPSBzLnNlbGVjdCgnLnNraWxsc19fY2lyY2xlLWFib3ZlJyk7XHJcblxyXG5wcm9ncmVzcy5hdHRyKHtzdHJva2VEYXNoYXJyYXk6ICcwLCAxMTAnfSk7XHJcblNuYXAuYW5pbWF0ZSgwLDExMCwgZnVuY3Rpb24oIHZhbHVlICkge1xyXG4gICAgcHJvZ3Jlc3MuYXR0cih7ICdzdHJva2UtZGFzaGFycmF5Jzp2YWx1ZSsnLDExMCd9KTtcclxufSwgNTAwMCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==
