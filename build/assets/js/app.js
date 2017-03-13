



    /*var Slider = (function () {
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
    ();*/

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











//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcblxyXG5cclxuICAgIC8qdmFyIFNsaWRlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgJy53b3JrLXNsaWRlcl9fbGlzdF9uZXh0JyksXHJcbiAgICAgICAgICAgIGluZGV4ID0gMSxcclxuICAgICAgICAgICAgbmR4LFxyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IDUwMCxcclxuICAgICAgICAgICAgdGl0bGUgPSAkKCcud29ya19fdGl0bGUnKSxcclxuICAgICAgICAgICAgc2tpbGxzID0gJCgnLndvcmtfX3RlY2hub2xvZ3knKSxcclxuICAgICAgICAgICAgaW1nQ29udGFpbmVyID0gJCgnLndvcmtfX3BpYycpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBfaW5pdCgpIHtcclxuICAgICAgICAgICAgdmFyIGFjdGl2ZUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcbiAgICAgICAgICAgICAgICBpbWdTcmMgPSBhY3RpdmVJdGVtLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlVGl0bGUgPSBhY3RpdmVJdGVtLmRhdGEoJ3RpdGxlJyksXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVTbGlsbCA9IGFjdGl2ZUl0ZW0uZGF0YSgndGVjaG5vbG9neScpO1xyXG5cclxuICAgICAgICAgICAgaW1nQ29udGFpbmVyLmF0dHIoJ3NyYycsIGltZ1NyYyk7XHJcbiAgICAgICAgICAgIHRpdGxlLnRleHQoYWN0aXZlVGl0bGUpO1xyXG4gICAgICAgICAgICBza2lsbHMudGV4dChhY3RpdmVTbGlsbCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV4dEl0ZW0gPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCAnLndvcmstc2xpZGVyX19saXN0X25leHQnKS5lcShpbmRleCArIDEpO1xyXG4gICAgICAgICAgICBuZXh0SXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gICAgICAgICAgICB2YXIgcHJldkl0ZW0gPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCAnLndvcmstc2xpZGVyX19saXN0X3ByZXYnKS5lcShpbmRleCAtIDEpO1xyXG4gICAgICAgICAgICBwcmV2SXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIG5leHRJdGVtcyA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsIGNvbnRhaW5lciksXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SXRlbSA9IG5leHRJdGVtcy5maWx0ZXIoJy53b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50JyksXHJcbiAgICAgICAgICAgICAgICByZXFJdGVtID0gbmV4dEl0ZW1zLmVxKG5keCk7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PT0gJ3VwJyA/IC0xMDAgOiAxMDA7XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50SXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICd0b3AnOiBkaXJlY3Rpb24gKyAnJSdcclxuICAgICAgICAgICAgfSwgZHVyYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgcmVxSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICd0b3AnOiAwXHJcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SXRlbS5yZW1vdmVDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpLmNzcygndG9wJywgLWRpcmVjdGlvbiArICclJyk7XHJcbiAgICAgICAgICAgICAgICByZXFJdGVtLmFkZENsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50Jyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfbW92ZU5leHQoKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSAkKCcud29yay1zbGlkZXJfX2xpc3RfbmV4dCcpLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3VwJztcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBuZHggPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgbmR4ID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5keCA9IGluZGV4ICsgMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX21vdmVQcmV2KCkge1xyXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJCgnLndvcmstc2xpZGVyX19saXN0X3ByZXYnKSxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdkb3duJztcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IGl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIG5keCA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgbmR4ID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5keCA9IGluZGV4IC0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX3NsaWRlU2hvdygpIHtcclxuICAgICAgICAgICAgdmFyIGZhZGVkT3V0ID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICAgICAgbG9hZGVkID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICAgICAgbmV4dFNyYyA9IGl0ZW1zLmVxKGluZGV4KS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKSxcclxuICAgICAgICAgICAgICAgIG5leHRUaXRsZSA9IGl0ZW1zLmVxKGluZGV4KS5kYXRhKCd0aXRsZScpLFxyXG4gICAgICAgICAgICAgICAgbmV4dFNraWxscyA9IGl0ZW1zLmVxKGluZGV4KS5kYXRhKCd0ZWNobm9sb2d5Jyk7XHJcblxyXG4gICAgICAgICAgICBfbW92ZU5leHQoKTtcclxuICAgICAgICAgICAgX21vdmVQcmV2KCk7XHJcblxyXG4gICAgICAgICAgICBpbWdDb250YWluZXIuZmFkZU91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZS5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICAgICBza2lsbHMuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICAgICAgZmFkZWRPdXQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZhZGVkT3V0LmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGl0bGUudGV4dChuZXh0VGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgc2tpbGxzLnRleHQobmV4dFNraWxscyk7XHJcbiAgICAgICAgICAgICAgICBpbWdDb250YWluZXIuYXR0cignc3JjJywgbmV4dFNyYykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVkLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbG9hZGVkLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGl0bGUuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgICAgICAgICBza2lsbHMuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICBpbWdDb250YWluZXIuZmFkZUluKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5pdDogX2luaXQsXHJcbiAgICAgICAgICAgIG1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcudG9nZ2xlX19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd0b2dnbGVfX2xpbmtfbmV4dCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd0b2dnbGVfX2xpbmtfcHJldicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4LS07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBfc2xpZGVTaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAoKTsqL1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICQoJyNodW1fX25hdicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnI2h1bV9fbmF2JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAkKCcub3Blbi1uYXYnKS5mYWRlVG9nZ2xlKFwic2xvd1wiKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5mbGlwLWNvbnRhaW5lcicpLmFkZENsYXNzKCdhbmltYXRlZCBmbGlwSW5YJyk7XHJcblxyXG5cclxuICAgICQoXCIjbGlua1wiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJy5iYWNrJykuY3NzKHtcclxuICAgICAgICAgICAgJ3RyYW5zZm9ybScgOiAncm90YXRlWSgwZGVnKSdcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuZnJvbnQnKS5jc3Moe1xyXG4gICAgICAgICAgICAndHJhbnNmb3JtJyA6ICdyb3RhdGVZKDE4MGRlZyknXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgcHJlbG9hZGVyID0gKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHBlcmNlbnRzVG90YWwgPSAwO1xyXG4gICAgICAgIHZhciBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XHJcblxyXG4gICAgICAgIHZhciBpbWdQYXRoID0gJCgnKicpLm1hcChmdW5jdGlvbiAobmR4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBiYWNrZ3JvdW5kID0gJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKTtcclxuICAgICAgICAgICAgdmFyIGlzSW1nID0gJChlbGVtZW50KS5pcygnaW1nJyk7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc0ltZykge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwYXRoKSByZXR1cm4gcGF0aDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIHNldFBlcmNlbnRzID0gZnVuY3Rpb24odG90YWwsIGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgdmFyIHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG4gICAgICAgICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50cycpLnRleHQocGVyY2VudHMgKyAnJScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBlcmNlbnRzID49IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxvYWRJbWFnZXMgPSBmdW5jdGlvbihpbWFnZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGltZywgaSwgaW1hZ2VzKXtcclxuICAgICAgICAgICAgICAgIHZhciBmYWtlSW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmMgOiBpbWdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWFnZXMubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxvYWRJbWFnZXMoaW1ncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KCkpO1xyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHByZWxvYWRlci5pbml0KCk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcclxuICAgIC8vc2V0IHlvdXIgZ29vZ2xlIG1hcHMgcGFyYW1ldGVyc1xyXG4gICAgdmFyIGxhdGl0dWRlID0gNTYuODYyMjMwLFxyXG4gICAgICAgIGxvbmdpdHVkZSA9IDUzLjIxNzM3MixcclxuICAgICAgICBtYXBfem9vbSA9IDEzO1xyXG5cclxuICAgIC8vZ29vZ2xlIG1hcCBjdXN0b20gbWFya2VyIGljb24gLSAucG5nIGZhbGxiYWNrIGZvciBJRTExXHJcbiAgICB2YXIgaXNfaW50ZXJuZXRFeHBsb3JlcjExPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZigndHJpZGVudCcpID4gLTE7XHJcbiAgICB2YXIgbWFya2VyX3VybCA9ICggaXNfaW50ZXJuZXRFeHBsb3JlcjExICkgPyAnaW1nL2NkLWljb24tbG9jYXRpb24ucG5nJyA6ICdpbWcvY2QtaWNvbi1sb2NhdGlvbi5zdmcnO1xyXG5cclxuICAgIC8vZGVmaW5lIHRoZSBiYXNpYyBjb2xvciBvZiB5b3VyIG1hcCwgcGx1cyBhIHZhbHVlIGZvciBzYXR1cmF0aW9uIGFuZCBicmlnaHRuZXNzXHJcbiAgICB2YXJcdG1haW5fY29sb3IgPSAnIzJkMzEzZicsXHJcbiAgICAgICAgd2F0ZXJfY29sb3IgPSAnIzI1QzVBRScsXHJcbiAgICAgICAgc2F0dXJhdGlvbl92YWx1ZT0gLTIwLFxyXG4gICAgICAgIGJyaWdodG5lc3NfdmFsdWU9IDU7XHJcblxyXG4gICAgLy93ZSBkZWZpbmUgaGVyZSB0aGUgc3R5bGUgb2YgdGhlIG1hcFxyXG4gICAgdmFyIHN0eWxlPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3NldCBzYXR1cmF0aW9uIGZvciB0aGUgbGFiZWxzIG9uIHRoZSBtYXBcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwibGFiZWxzXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHtzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHQvL3BvaSBzdGFuZHMgZm9yIHBvaW50IG9mIGludGVyZXN0IC0gZG9uJ3Qgc2hvdyB0aGVzZSBsYWJsZXMgb24gdGhlIG1hcFxyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJwb2lcIixcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwibGFiZWxzXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHt2aXNpYmlsaXR5OiBcIm9mZlwifVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vZG9uJ3Qgc2hvdyBoaWdod2F5cyBsYWJsZXMgb24gdGhlIG1hcFxyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogJ3JvYWQuaGlnaHdheScsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzJyxcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAge3Zpc2liaWxpdHk6IFwib2ZmXCJ9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9kb24ndCBzaG93IGxvY2FsIHJvYWQgbGFibGVzIG9uIHRoZSBtYXBcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwicm9hZC5sb2NhbFwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJsYWJlbHMuaWNvblwiLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7dmlzaWJpbGl0eTogXCJvZmZcIn1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2Rvbid0IHNob3cgYXJ0ZXJpYWwgcm9hZCBsYWJsZXMgb24gdGhlIG1hcFxyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHt2aXNpYmlsaXR5OiBcIm9mZlwifVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vZG9uJ3Qgc2hvdyByb2FkIGxhYmxlcyBvbiB0aGUgbWFwXHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcInJvYWRcIixcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHt2aXNpYmlsaXR5OiBcIm9mZlwifVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL3N0eWxlIGRpZmZlcmVudCBlbGVtZW50cyBvbiB0aGUgbWFwXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJ0cmFuc2l0XCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJwb2lcIixcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7IGh1ZTogbWFpbl9jb2xvciB9LFxyXG4gICAgICAgICAgICAgICAgeyB2aXNpYmlsaXR5OiBcIm9uXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbGlnaHRuZXNzOiBicmlnaHRuZXNzX3ZhbHVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHNhdHVyYXRpb246IHNhdHVyYXRpb25fdmFsdWUgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcInBvaS5nb3Zlcm5tZW50XCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJwb2kuc3BvcnRfY29tcGxleFwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgaHVlOiBtYWluX2NvbG9yIH0sXHJcbiAgICAgICAgICAgICAgICB7IHZpc2liaWxpdHk6IFwib25cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSxcclxuICAgICAgICAgICAgICAgIHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwicG9pLmF0dHJhY3Rpb25cIixcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7IGh1ZTogbWFpbl9jb2xvciB9LFxyXG4gICAgICAgICAgICAgICAgeyB2aXNpYmlsaXR5OiBcIm9uXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbGlnaHRuZXNzOiBicmlnaHRuZXNzX3ZhbHVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHNhdHVyYXRpb246IHNhdHVyYXRpb25fdmFsdWUgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcInBvaS5idXNpbmVzc1wiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgaHVlOiBtYWluX2NvbG9yIH0sXHJcbiAgICAgICAgICAgICAgICB7IHZpc2liaWxpdHk6IFwib25cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSxcclxuICAgICAgICAgICAgICAgIHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwidHJhbnNpdFwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgaHVlOiBtYWluX2NvbG9yIH0sXHJcbiAgICAgICAgICAgICAgICB7IHZpc2liaWxpdHk6IFwib25cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSxcclxuICAgICAgICAgICAgICAgIHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwidHJhbnNpdC5zdGF0aW9uXCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwicm9hZFwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgaHVlOiBtYWluX2NvbG9yIH0sXHJcbiAgICAgICAgICAgICAgICB7IHZpc2liaWxpdHk6IFwib25cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSxcclxuICAgICAgICAgICAgICAgIHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwicm9hZC5oaWdod2F5XCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJ3YXRlclwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7IGh1ZTogd2F0ZXJfY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgLy9zZXQgZ29vZ2xlIG1hcCBvcHRpb25zXHJcbiAgICB2YXIgbWFwX29wdGlvbnMgPSB7XHJcbiAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdGl0dWRlLCBsb25naXR1ZGUpLFxyXG4gICAgICAgIHpvb206IG1hcF96b29tLFxyXG4gICAgICAgIHBhbkNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgIHpvb21Db250cm9sOiBmYWxzZSxcclxuICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXHJcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgIHN0eWxlczogc3R5bGUsXHJcbiAgICB9XHJcbiAgICAvL2luaXppYWxpemUgdGhlIG1hcFxyXG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvb2dsZS1jb250YWluZXInKSwgbWFwX29wdGlvbnMpO1xyXG4gICAgLy9hZGQgYSBjdXN0b20gbWFya2VyIHRvIHRoZSBtYXBcclxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXRpdHVkZSwgbG9uZ2l0dWRlKSxcclxuICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgIGljb246IG1hcmtlcl91cmwsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2FkZCBjdXN0b20gYnV0dG9ucyBmb3IgdGhlIHpvb20taW4vem9vbS1vdXQgb24gdGhlIG1hcFxyXG4gICAgZnVuY3Rpb24gQ3VzdG9tWm9vbUNvbnRyb2woY29udHJvbERpdiwgbWFwKSB7XHJcbiAgICAgICAgLy9ncmFwIHRoZSB6b29tIGVsZW1lbnRzIGZyb20gdGhlIERPTSBhbmQgaW5zZXJ0IHRoZW0gaW4gdGhlIG1hcFxyXG4gICAgICAgIHZhciBjb250cm9sVUl6b29tSW49IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZC16b29tLWluJyksXHJcbiAgICAgICAgICAgIGNvbnRyb2xVSXpvb21PdXQ9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZC16b29tLW91dCcpO1xyXG4gICAgICAgIGNvbnRyb2xEaXYuYXBwZW5kQ2hpbGQoY29udHJvbFVJem9vbUluKTtcclxuICAgICAgICBjb250cm9sRGl2LmFwcGVuZENoaWxkKGNvbnRyb2xVSXpvb21PdXQpO1xyXG5cclxuICAgICAgICAvLyBTZXR1cCB0aGUgY2xpY2sgZXZlbnQgbGlzdGVuZXJzIGFuZCB6b29tLWluIG9yIG91dCBhY2NvcmRpbmcgdG8gdGhlIGNsaWNrZWQgZWxlbWVudFxyXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKGNvbnRyb2xVSXpvb21JbiwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIG1hcC5zZXRab29tKG1hcC5nZXRab29tKCkrMSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcihjb250cm9sVUl6b29tT3V0LCAnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbWFwLnNldFpvb20obWFwLmdldFpvb20oKS0xKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB6b29tQ29udHJvbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdmFyIHpvb21Db250cm9sID0gbmV3IEN1c3RvbVpvb21Db250cm9sKHpvb21Db250cm9sRGl2LCBtYXApO1xyXG5cclxuICAgIC8vaW5zZXJ0IHRoZSB6b29tIGRpdiBvbiB0aGUgdG9wIGxlZnQgb2YgdGhlIG1hcFxyXG4gICAgbWFwLmNvbnRyb2xzW2dvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5MRUZUX1RPUF0ucHVzaCh6b29tQ29udHJvbERpdik7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19
