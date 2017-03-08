(function() {
  'use strict';

  setTimeout(function() {
    document.querySelector('.greating_picture').classList.add('m--show');
  }, 1000);
})();


/*var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 56.862230, lng: 53.217372},
        zoom: 12
           //styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
            });

}*/

$(document).ready(function(){
    $('#hum__nav').click(function(){
        $(this).toggleClass('open');
    });

    $('.open-menu').on('click', function() {
        $('.overlay').addClass('open-nav');
    });

    $('.close-menu').on('click', function() {
        $('.overlay').removeClass('open-nav');
    });

    $('.main-block').addClass('animated flipInX');

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





//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWF0aW5nX3BpY3R1cmUnKS5jbGFzc0xpc3QuYWRkKCdtLS1zaG93Jyk7XHJcbiAgfSwgMTAwMCk7XHJcbn0pKCk7XHJcblxyXG5cclxuLyp2YXIgbWFwO1xyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcclxuICAgICAgICBjZW50ZXI6IHtsYXQ6IDU2Ljg2MjIzMCwgbG5nOiA1My4yMTczNzJ9LFxyXG4gICAgICAgIHpvb206IDEyXHJcbiAgICAgICAgICAgLy9zdHlsZXM6IFt7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDQ0NDQ0XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOi0xMDB9LHtcImxpZ2h0bmVzc1wiOjQ1fV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwic2ltcGxpZmllZFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDZiY2VjXCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX1dXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxufSovXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgJCgnI2h1bV9fbmF2JykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcub3Blbi1tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLm92ZXJsYXknKS5hZGRDbGFzcygnb3Blbi1uYXYnKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5jbG9zZS1tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLm92ZXJsYXknKS5yZW1vdmVDbGFzcygnb3Blbi1uYXYnKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5tYWluLWJsb2NrJykuYWRkQ2xhc3MoJ2FuaW1hdGVkIGZsaXBJblgnKTtcclxuXHJcbiAgICB2YXIgcHJlbG9hZGVyID0gKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHBlcmNlbnRzVG90YWwgPSAwO1xyXG4gICAgICAgIHZhciBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XHJcblxyXG4gICAgICAgIHZhciBpbWdQYXRoID0gJCgnKicpLm1hcChmdW5jdGlvbiAobmR4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBiYWNrZ3JvdW5kID0gJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKTtcclxuICAgICAgICAgICAgdmFyIGlzSW1nID0gJChlbGVtZW50KS5pcygnaW1nJyk7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc0ltZykge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwYXRoKSByZXR1cm4gcGF0aDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIHNldFBlcmNlbnRzID0gZnVuY3Rpb24odG90YWwsIGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgdmFyIHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG4gICAgICAgICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50cycpLnRleHQocGVyY2VudHMgKyAnJScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBlcmNlbnRzID49IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxvYWRJbWFnZXMgPSBmdW5jdGlvbihpbWFnZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGltZywgaSwgaW1hZ2VzKXtcclxuICAgICAgICAgICAgICAgIHZhciBmYWtlSW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmMgOiBpbWdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWFnZXMubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxvYWRJbWFnZXMoaW1ncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KCkpO1xyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHByZWxvYWRlci5pbml0KCk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKXtcclxuICAgIC8vc2V0IHlvdXIgZ29vZ2xlIG1hcHMgcGFyYW1ldGVyc1xyXG4gICAgdmFyIGxhdGl0dWRlID0gNTYuODYyMjMwLFxyXG4gICAgICAgIGxvbmdpdHVkZSA9IDUzLjIxNzM3MixcclxuICAgICAgICBtYXBfem9vbSA9IDEzO1xyXG5cclxuICAgIC8vZ29vZ2xlIG1hcCBjdXN0b20gbWFya2VyIGljb24gLSAucG5nIGZhbGxiYWNrIGZvciBJRTExXHJcbiAgICB2YXIgaXNfaW50ZXJuZXRFeHBsb3JlcjExPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZigndHJpZGVudCcpID4gLTE7XHJcbiAgICB2YXIgbWFya2VyX3VybCA9ICggaXNfaW50ZXJuZXRFeHBsb3JlcjExICkgPyAnaW1nL2NkLWljb24tbG9jYXRpb24ucG5nJyA6ICdpbWcvY2QtaWNvbi1sb2NhdGlvbi5zdmcnO1xyXG5cclxuICAgIC8vZGVmaW5lIHRoZSBiYXNpYyBjb2xvciBvZiB5b3VyIG1hcCwgcGx1cyBhIHZhbHVlIGZvciBzYXR1cmF0aW9uIGFuZCBicmlnaHRuZXNzXHJcbiAgICB2YXJcdG1haW5fY29sb3IgPSAnIzJkMzEzZicsXHJcbiAgICAgICAgd2F0ZXJfY29sb3IgPSAnIzI1QzVBRScsXHJcbiAgICAgICAgc2F0dXJhdGlvbl92YWx1ZT0gLTIwLFxyXG4gICAgICAgIGJyaWdodG5lc3NfdmFsdWU9IDU7XHJcblxyXG4gICAgLy93ZSBkZWZpbmUgaGVyZSB0aGUgc3R5bGUgb2YgdGhlIG1hcFxyXG4gICAgdmFyIHN0eWxlPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3NldCBzYXR1cmF0aW9uIGZvciB0aGUgbGFiZWxzIG9uIHRoZSBtYXBcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwibGFiZWxzXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHtzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHQvL3BvaSBzdGFuZHMgZm9yIHBvaW50IG9mIGludGVyZXN0IC0gZG9uJ3Qgc2hvdyB0aGVzZSBsYWJsZXMgb24gdGhlIG1hcFxyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJwb2lcIixcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwibGFiZWxzXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHt2aXNpYmlsaXR5OiBcIm9mZlwifVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vZG9uJ3Qgc2hvdyBoaWdod2F5cyBsYWJsZXMgb24gdGhlIG1hcFxyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogJ3JvYWQuaGlnaHdheScsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiAnbGFiZWxzJyxcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAge3Zpc2liaWxpdHk6IFwib2ZmXCJ9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9kb24ndCBzaG93IGxvY2FsIHJvYWQgbGFibGVzIG9uIHRoZSBtYXBcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwicm9hZC5sb2NhbFwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJsYWJlbHMuaWNvblwiLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7dmlzaWJpbGl0eTogXCJvZmZcIn1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2Rvbid0IHNob3cgYXJ0ZXJpYWwgcm9hZCBsYWJsZXMgb24gdGhlIG1hcFxyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHt2aXNpYmlsaXR5OiBcIm9mZlwifVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vZG9uJ3Qgc2hvdyByb2FkIGxhYmxlcyBvbiB0aGUgbWFwXHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcInJvYWRcIixcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuc3Ryb2tlXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHt2aXNpYmlsaXR5OiBcIm9mZlwifVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL3N0eWxlIGRpZmZlcmVudCBlbGVtZW50cyBvbiB0aGUgbWFwXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJ0cmFuc2l0XCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJwb2lcIixcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7IGh1ZTogbWFpbl9jb2xvciB9LFxyXG4gICAgICAgICAgICAgICAgeyB2aXNpYmlsaXR5OiBcIm9uXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbGlnaHRuZXNzOiBicmlnaHRuZXNzX3ZhbHVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHNhdHVyYXRpb246IHNhdHVyYXRpb25fdmFsdWUgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcInBvaS5nb3Zlcm5tZW50XCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJwb2kuc3BvcnRfY29tcGxleFwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgaHVlOiBtYWluX2NvbG9yIH0sXHJcbiAgICAgICAgICAgICAgICB7IHZpc2liaWxpdHk6IFwib25cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSxcclxuICAgICAgICAgICAgICAgIHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwicG9pLmF0dHJhY3Rpb25cIixcclxuICAgICAgICAgICAgZWxlbWVudFR5cGU6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7IGh1ZTogbWFpbl9jb2xvciB9LFxyXG4gICAgICAgICAgICAgICAgeyB2aXNpYmlsaXR5OiBcIm9uXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgbGlnaHRuZXNzOiBicmlnaHRuZXNzX3ZhbHVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHNhdHVyYXRpb246IHNhdHVyYXRpb25fdmFsdWUgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcInBvaS5idXNpbmVzc1wiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgaHVlOiBtYWluX2NvbG9yIH0sXHJcbiAgICAgICAgICAgICAgICB7IHZpc2liaWxpdHk6IFwib25cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSxcclxuICAgICAgICAgICAgICAgIHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwidHJhbnNpdFwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgaHVlOiBtYWluX2NvbG9yIH0sXHJcbiAgICAgICAgICAgICAgICB7IHZpc2liaWxpdHk6IFwib25cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSxcclxuICAgICAgICAgICAgICAgIHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwidHJhbnNpdC5zdGF0aW9uXCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwicm9hZFwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgIHN0eWxlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgaHVlOiBtYWluX2NvbG9yIH0sXHJcbiAgICAgICAgICAgICAgICB7IHZpc2liaWxpdHk6IFwib25cIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBsaWdodG5lc3M6IGJyaWdodG5lc3NfdmFsdWUgfSxcclxuICAgICAgICAgICAgICAgIHsgc2F0dXJhdGlvbjogc2F0dXJhdGlvbl92YWx1ZSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmVhdHVyZVR5cGU6IFwicm9hZC5oaWdod2F5XCIsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICAgICAgc3R5bGVyczogW1xyXG4gICAgICAgICAgICAgICAgeyBodWU6IG1haW5fY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJ3YXRlclwiLFxyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgICAgICBzdHlsZXJzOiBbXHJcbiAgICAgICAgICAgICAgICB7IGh1ZTogd2F0ZXJfY29sb3IgfSxcclxuICAgICAgICAgICAgICAgIHsgdmlzaWJpbGl0eTogXCJvblwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGxpZ2h0bmVzczogYnJpZ2h0bmVzc192YWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uX3ZhbHVlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgLy9zZXQgZ29vZ2xlIG1hcCBvcHRpb25zXHJcbiAgICB2YXIgbWFwX29wdGlvbnMgPSB7XHJcbiAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdGl0dWRlLCBsb25naXR1ZGUpLFxyXG4gICAgICAgIHpvb206IG1hcF96b29tLFxyXG4gICAgICAgIHBhbkNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgIHpvb21Db250cm9sOiBmYWxzZSxcclxuICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXHJcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgIHN0eWxlczogc3R5bGUsXHJcbiAgICB9XHJcbiAgICAvL2luaXppYWxpemUgdGhlIG1hcFxyXG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvb2dsZS1jb250YWluZXInKSwgbWFwX29wdGlvbnMpO1xyXG4gICAgLy9hZGQgYSBjdXN0b20gbWFya2VyIHRvIHRoZSBtYXBcclxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXRpdHVkZSwgbG9uZ2l0dWRlKSxcclxuICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgIGljb246IG1hcmtlcl91cmwsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2FkZCBjdXN0b20gYnV0dG9ucyBmb3IgdGhlIHpvb20taW4vem9vbS1vdXQgb24gdGhlIG1hcFxyXG4gICAgZnVuY3Rpb24gQ3VzdG9tWm9vbUNvbnRyb2woY29udHJvbERpdiwgbWFwKSB7XHJcbiAgICAgICAgLy9ncmFwIHRoZSB6b29tIGVsZW1lbnRzIGZyb20gdGhlIERPTSBhbmQgaW5zZXJ0IHRoZW0gaW4gdGhlIG1hcFxyXG4gICAgICAgIHZhciBjb250cm9sVUl6b29tSW49IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZC16b29tLWluJyksXHJcbiAgICAgICAgICAgIGNvbnRyb2xVSXpvb21PdXQ9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZC16b29tLW91dCcpO1xyXG4gICAgICAgIGNvbnRyb2xEaXYuYXBwZW5kQ2hpbGQoY29udHJvbFVJem9vbUluKTtcclxuICAgICAgICBjb250cm9sRGl2LmFwcGVuZENoaWxkKGNvbnRyb2xVSXpvb21PdXQpO1xyXG5cclxuICAgICAgICAvLyBTZXR1cCB0aGUgY2xpY2sgZXZlbnQgbGlzdGVuZXJzIGFuZCB6b29tLWluIG9yIG91dCBhY2NvcmRpbmcgdG8gdGhlIGNsaWNrZWQgZWxlbWVudFxyXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKGNvbnRyb2xVSXpvb21JbiwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIG1hcC5zZXRab29tKG1hcC5nZXRab29tKCkrMSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcihjb250cm9sVUl6b29tT3V0LCAnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbWFwLnNldFpvb20obWFwLmdldFpvb20oKS0xKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB6b29tQ29udHJvbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdmFyIHpvb21Db250cm9sID0gbmV3IEN1c3RvbVpvb21Db250cm9sKHpvb21Db250cm9sRGl2LCBtYXApO1xyXG5cclxuICAgIC8vaW5zZXJ0IHRoZSB6b29tIGRpdiBvbiB0aGUgdG9wIGxlZnQgb2YgdGhlIG1hcFxyXG4gICAgbWFwLmNvbnRyb2xzW2dvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5MRUZUX1RPUF0ucHVzaCh6b29tQ29udHJvbERpdik7XHJcbn0pO1xyXG5cclxudmFyIHMgPSBTbmFwKCcuc2tpbGxzX19jaXJjbGUtYWJvdmUnKTtcclxudmFyIHByb2dyZXNzID0gcy5zZWxlY3QoJy5za2lsbHNfX2NpcmNsZS1hYm92ZScpO1xyXG5cclxucHJvZ3Jlc3MuYXR0cih7c3Ryb2tlRGFzaGFycmF5OiAnMCwgMTEwJ30pO1xyXG5TbmFwLmFuaW1hdGUoMCwxMTAsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcclxuICAgIHByb2dyZXNzLmF0dHIoeyAnc3Ryb2tlLWRhc2hhcnJheSc6dmFsdWUrJywxMTAnfSk7XHJcbn0sIDUwMDApO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbnZhciBwcmVsb2FkZXIgPSAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMDtcclxuICAgIHZhciBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XHJcblxyXG4gICAgdmFyIGltZ1BhdGggPSAkKCcqJykubWFwKGZ1bmN0aW9uIChuZHgsIGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgYmFja2dyb3VuZCA9ICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyk7XHJcbiAgICAgICAgdmFyIGlzSW1nID0gJChlbGVtZW50KS5pcygnaW1nJyk7XHJcbiAgICAgICAgdmFyIHBhdGggPSAnJztcclxuXHJcbiAgICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNJbWcpIHtcclxuICAgICAgICAgICAgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGF0aCkgcmV0dXJuIHBhdGg7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgc2V0UGVyY2VudHMgPSBmdW5jdGlvbih0b3RhbCwgY3VycmVudCkge1xyXG4gICAgICAgIHZhciBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG5cclxuICAgICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50cycpLnRleHQocGVyY2VudHMgKyAnJScpO1xyXG5cclxuICAgICAgICBpZiAocGVyY2VudHMgPj0gMTAwKSB7XHJcbiAgICAgICAgICAgIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBsb2FkSW1hZ2VzID0gZnVuY3Rpb24oaW1hZ2VzKSB7XHJcblxyXG4gICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oaW1nLCBpLCBpbWFnZXMpe1xyXG4gICAgICAgICAgICB2YXIgZmFrZUltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYyA6IGltZ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWFnZXMubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIHByZWxvYWRlci5pbml0KCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuIl19
