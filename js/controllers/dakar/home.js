'use strict';
app.controller('SGACtrl', ['$scope', '$state', 'webServices', '$rootScope', 'authServices', '$timeout', '$sessionStorage', 'NgMap', '$http', '$filter', '$sce', '$window', '$ngConfirm',
    function($scope, $state, webServices, $rootScope, authServices, $timeout, $sessionStorage, NgMap, $http, $filter, $sce, $window, $ngConfirm) {
        $scope.newslist = [];
        $scope.module_id = 18;
        $scope.carouselslides = [{
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(12,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/13.jpg" download="gallery13.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/13.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/13.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(13,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/14.jpg" download="gallery14.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/14.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/14.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(14,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/15.jpg" download="gallery15.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/15.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/15.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(15,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/16.jpg" download="gallery16.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/16.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/16.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(16,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/17.jpg" download="gallery17.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/17.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/17.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(17,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/18.jpg" download="gallery18.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/18.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/18.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(18,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/19.jpg" download="gallery19.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/19.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/19.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(19,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/20.jpg" download="gallery20.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/20.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/20.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(20,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/21.jpg" download="gallery21.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/21.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/21.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(21,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/22.jpg" download="gallery22.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/22.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/22.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(22,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/23.jpg" download="gallery23.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/23.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/23.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(23,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/24.jpg" download="gallery24.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/24.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/24.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(24,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/25.jpg" download="gallery25.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/25.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/25.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(25,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/26.jpg" download="gallery26.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/26.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/26.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(26,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/27.jpg" download="gallery27.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/27.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/27.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(27,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/28.jpg" download="gallery28.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/28.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/28.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(28,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/29.jpg" download="gallery29.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/29.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/29.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(29,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/30.jpg" download="gallery30.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/30.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/30.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(30,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/31.jpg" download="gallery31.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/31.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/31.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(31,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/32.jpg" download="gallery32.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/32.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/32.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(32,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/33.jpg" download="gallery33.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/33.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/33.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(33,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/34.jpg" download="gallery4.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/34.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/34.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(34,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/35.jpg" download="gallery35.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/35.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/35.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(35,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/36.jpg" download="gallery36.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/36.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/36.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(36,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/37.jpg" download="gallery37.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/37.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/37.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(37,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/38.jpg" download="gallery38.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/38.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/38.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(38,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/39.jpg" download="gallery39.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/39.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/39.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(39,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/40.jpg" download="gallery40.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/40.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/40.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(40,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/41.jpg" download="gallery41.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/41.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/41.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(41,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/44.jpg" download="gallery42.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/42.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/42.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(42,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/44.jpg" download="gallery43.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/43.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/43.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(43,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/44.jpg" download="gallery44.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/44.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/44.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(44,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/45.jpg" download="gallery45.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/45.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/45.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(45,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/46.jpg" download="gallery46.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/46.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/46.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(46,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/47.jpg" download="gallery47.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/47.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/47.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(47,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/48.jpg" download="gallery48.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/48.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/48.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(48,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/49.jpg" download="gallery49.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/49.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/49.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(49,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/50.jpg" download="gallery50.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/50.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/50.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(50,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/51.jpg" download="gallery51.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/51.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/51.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(51,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/52.jpg" download="gallery52.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/52.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/52.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(0,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/1.jpg" download="gallery1.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/1.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/1.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(1,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/2.jpg" download="gallery2.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/2.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/2.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(2,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/3.jpg" download="gallery3.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/3.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/3.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(3,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/4.jpg" download="gallery4.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/4.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/4.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(4,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/5.jpg" download="gallery5.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/5.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/5.jpg'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(5,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/6.jpg" download="gallery6.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/6.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/6.jpg'
            },
            {
                filetype: 'image',
                name: 'Toyota GAZOO Racing <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(6,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/7.jpg" download="gallery7.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/7.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/7.jpg'
            },
            {
                filetype: 'image',
                name: 'Toyota GAZOO Racing <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(7,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/8.jpg" download="gallery8.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/8.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/8.jpg'
            },
            {
                filetype: 'image',
                name: 'Toyota GAZOO Racing <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(8,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/9.jpg" download="gallery9.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/9.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/9.jpg'
            },
            {
                filetype: 'image',
                name: 'Toyota GAZOO Racing <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(9,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/10.jpg" download="gallery10.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/10.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/10.jpg'
            },
            {
                filetype: 'video',
                name: 'Toyota GAZOO Racing <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(10,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/11.mp4" download="gallery11.mp4" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/thumb.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/11.mp4'
            },
            {
                filetype: 'image',
                name: 'Team Land Cruiser <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(11,carouselslides)"><a href="https://mecacampus.com/API/public/upload/dakar/gallery/12.jpg" download="gallery12.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ',
                src: 'https://mecacampus.com/API/public/upload/dakar/gallery/12.jpg',
                file: 'https://mecacampus.com/API/public/upload/dakar/gallery/12.jpg'
            }
        ];

        $scope.visible = 3;

        if ($rootScope.isMobile) {
            $scope.visible = 1;
        }

        $scope.selectedClick = function(index) {
            if (index == 10) {
                $rootScope.openGallery(index, $scope.carouselslides);
            }
        }

        $scope.carouseloptions = {
            clicking: true,
            sourceProp: 'src',
            visible: $scope.visible,
            perspective: 35,
            startSlide: 0,
            border: 3,
            dir: 'ltr',
            width: 360,
            height: 270,
            space: 220,
            loop: true,
            controls: true
        };

        $scope.getData = function() {
            webServices.post('dakar/special/news/list', {}).then(function(getData) {
                $rootScope.loading = false;
                if (getData.status == 200) {
                    $scope.newslist = getData.data;
                    $rootScope.viewModuleItem($scope.module_id, 1);
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.getData();

        var obj = { page_name: 'home', page_component: 'dakar', module: $scope.module_id, item: 0 };
        $rootScope.viewPage(obj);

    }
]);