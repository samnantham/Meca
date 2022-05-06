'use strict';
app.controller('SGACtrl', ['$scope', '$state', 'webServices', '$rootScope', 'authServices', '$timeout', '$sessionStorage', 'NgMap', '$http', '$filter', '$sce', '$window', '$ngConfirm',
    function($scope, $state, webServices, $rootScope, authServices, $timeout, $sessionStorage, NgMap, $http, $filter, $sce, $window, $ngConfirm) {

        $scope.carouselslides = [
            { filetype: 'image', name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(0,carouselslides)"> <a href="https://mecacampus.com/API/public/upload/dakar/gallery/1.jpg" download="gallery1.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ', src: 'https://mecacampus.com/API/public/upload/dakar/gallery/1.jpg', file: 'https://mecacampus.com/API/public/upload/dakar/gallery/1.jpg' },
            { filetype: 'image', name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(1,carouselslides)"> <a href="https://mecacampus.com/API/public/upload/dakar/gallery/2.jpg" download="gallery2.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ', src: 'https://mecacampus.com/API/public/upload/dakar/gallery/2.jpg', file: 'https://mecacampus.com/API/public/upload/dakar/gallery/2.jpg' },
            { filetype: 'image', name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(2,carouselslides)"> <a href="https://mecacampus.com/API/public/upload/dakar/gallery/3.jpg" download="gallery3.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ', src: 'https://mecacampus.com/API/public/upload/dakar/gallery/3.jpg', file: 'https://mecacampus.com/API/public/upload/dakar/gallery/3.jpg' },
            { filetype: 'image', name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(3,carouselslides)"> <a href="https://mecacampus.com/API/public/upload/dakar/gallery/4.jpg" download="gallery4.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ', src: 'https://mecacampus.com/API/public/upload/dakar/gallery/4.jpg', file: 'https://mecacampus.com/API/public/upload/dakar/gallery/4.jpg' },
            { filetype: 'image', name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(4,carouselslides)"> <a href="https://mecacampus.com/API/public/upload/dakar/gallery/5.jpg" download="gallery5.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ', src: 'https://mecacampus.com/API/public/upload/dakar/gallery/5.jpg', file: 'https://mecacampus.com/API/public/upload/dakar/gallery/5.jpg' },
            { filetype: 'image', name: 'Team Land Cruiser 2021 <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(5,carouselslides)"> <a href="https://mecacampus.com/API/public/upload/dakar/gallery/6.jpg" download="gallery6.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ', src: 'https://mecacampus.com/API/public/upload/dakar/gallery/6.jpg', file: 'https://mecacampus.com/API/public/upload/dakar/gallery/6.jpg' },
            { filetype: 'image', name: 'Toyota GAZOO Racing <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(6,carouselslides)"> <a href="https://mecacampus.com/API/public/upload/dakar/gallery/7.jpg" download="gallery7.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ', src: 'https://mecacampus.com/API/public/upload/dakar/gallery/7.jpg', file: 'https://mecacampus.com/API/public/upload/dakar/gallery/7.jpg' },
            { filetype: 'image', name: 'Toyota GAZOO Racing <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(7,carouselslides)"> <a href="https://mecacampus.com/API/public/upload/dakar/gallery/8.jpg" download="gallery8.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ', src: 'https://mecacampus.com/API/public/upload/dakar/gallery/8.jpg', file: 'https://mecacampus.com/API/public/upload/dakar/gallery/8.jpg' },
            { filetype: 'image', name: 'Toyota GAZOO Racing <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(8,carouselslides)"> <a href="https://mecacampus.com/API/public/upload/dakar/gallery/9.jpg" download="gallery9.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ', src: 'https://mecacampus.com/API/public/upload/dakar/gallery/9.jpg', file: 'https://mecacampus.com/API/public/upload/dakar/gallery/9.jpg' },
            { filetype: 'image', name: 'Toyota GAZOO Racing <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(9,carouselslides)"> <a href="https://mecacampus.com/API/public/upload/dakar/gallery/10.jpg" download="gallery10.jpg" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ', src: 'https://mecacampus.com/API/public/upload/dakar/gallery/10.jpg', file: 'https://mecacampus.com/API/public/upload/dakar/gallery/10.jpg' },
            { filetype: 'video', name: 'Toyota GAZOO Racing <img src="img/dakar/full-screen.png" class="carousel-btn" ng-click="openGallery(10,carouselslides)"> <a href="https://mecacampus.com/API/public/upload/dakar/gallery/11.mp4" download="gallery11.mp4" target="_blank"> <img class="carousel-btn" src="img/dakar/download.png"></a> ', src: 'https://mecacampus.com/API/public/upload/dakar/gallery/thumb.jpg', file: 'https://mecacampus.com/API/public/upload/dakar/gallery/11.mp4' }
        ];

        $scope.visible = 3;
        $scope.graphColor = '#0e5f77';

        $scope.currentPeriod = 0;

        if ($rootScope.isMobile) {
            $scope.visible = 1;
        }

        $scope.showPeriodicalData = function(currentPeriod) {
            if (currentPeriod != $scope.currentPeriod) {
                $scope.currentPeriod = currentPeriod;
                $rootScope.loading = true;
                if ($scope.currentPeriod == 0) {
                    $scope.graphColor = '#0e5f77';
                } else if ($scope.currentPeriod == 1) {
                    $scope.graphColor = '#629FD6';
                } else if ($scope.currentPeriod == 2) {
                    $scope.graphColor = '#ED8239';
                }
                $scope.getData();
            }
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
            webServices.get('sga/home/' + $scope.currentPeriod).then(function(getData) {
                $rootScope.loading = false;
                if (getData.status == 200) {
                    $scope.SGAData = getData.data;
                    $scope.setChart($scope.SGAData.labels, $scope.SGAData.values);
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.setChart = function(chartlabels, chartvalues) {
            $('#container').highcharts({
                colors: [$scope.graphColor],
                title: {
                    text: ''
                },
                chart: {},
                plotOptions: {
                    series: {
                        pointWidth: 25
                    }
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    gridLineColor: $scope.graphColor,
                    gridLineWidth: 0,
                    minorGridLineWidth: 0,
                    categories: chartlabels,
                    labels: {
                        style: {
                            color: $scope.graphColor,
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>' + this.x +
                            '</b> : <b>' + this.y + '</b>';
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    gridLineColor: $scope.graphColor,
                    gridLineWidth: 1,
                    minorGridLineWidth: 0,
                    lineWidth: 1,
                    plotLines: [{
                        color: '#FF0000',
                        width: 1,
                        value: 0
                    }],
                    min: 0,
                    // max: 9,
                    // tickInterval: 1,
                    endOnTick: false,
                    labels: {
                        style: {
                            color: $scope.graphColor,
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }
                    }
                },

                series: [{
                    type: 'column',

                    data: chartvalues
                }]
            });

            if($scope.currentPeriod == 2){
                $scope.setCustom(chartlabels, chartvalues);
            }
        }
        
        $scope.setCustom =function(chartlabels, chartvalues){
            $('#container').highcharts({
                colors: [$scope.graphColor],
                title: {
                    text: ''
                },
                chart: {},
                plotOptions: {
                    series: {
                        pointWidth: 25
                    }
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    gridLineColor: $scope.graphColor,
                    gridLineWidth: 0,
                    minorGridLineWidth: 0,
                    categories: chartlabels,
                    labels: {
                        style: {
                            color: $scope.graphColor,
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>' + this.x +
                            '</b> : <b>' + this.y + '</b>';
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    gridLineColor: $scope.graphColor,
                    gridLineWidth: 1,
                    minorGridLineWidth: 0,
                    lineWidth: 1,
                    plotLines: [{
                        color: '#FF0000',
                        width: 1,
                        value: 0
                    }],
                    min: 0,
                    max: 8,
                    tickInterval: 2,
                    endOnTick: false,
                    labels: {
                        style: {
                            color: $scope.graphColor,
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }
                    }
                },

                series: [{
                    type: 'column',

                    data: chartvalues
                }]
            });
        }

        $scope.getData();

        var obj = { page_name: 'sga', page_component: 'common' };
        $rootScope.viewPage(obj);

    }
]);