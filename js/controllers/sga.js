'use strict';
app.controller('SGACtrl', ['$scope', '$state', 'webServices', '$rootScope', 'authServices', '$timeout', '$sessionStorage', 'NgMap', '$http', '$filter', '$sce', '$window', '$ngConfirm',
    function ($scope, $state, webServices, $rootScope, authServices, $timeout, $sessionStorage, NgMap, $http, $filter, $sce, $window, $ngConfirm) {

        $rootScope.$emit("setSliderConfig", {});
        $scope.firstloadingdone = false;
        $scope.doclink = '';
        $scope.commentData = {};
        $scope.feeds = [];
        $scope.Colors = [{backgroundColor : '#0e5f77' }];

        $scope.getData = function () {
            var obj = {};
            obj.title = 'We set up the "Regional Awards of Toyota Dream Car Art Contest" from 2021';
            obj.cover_image = 'public/upload/fromTMC/60596a1a68321.png';
            obj.doc_link = 'https://mecacampus.com/awards';
            obj.type = 'link';
            webServices.get('home/info').then(function (getData) {
                $rootScope.loading = false;
                $scope.data = [
                    [6, 9, 8, 1, 5, 7, 4]
                ];
                $scope.firstloadingdone = true;
                if (getData.status == 200) {
                    $scope.homeData = getData.data;
                    $scope.feeds = getData.data.feeds;
                    $scope.calendarevents = getData.data.caldata;
                    angular.forEach($scope.calendarevents, function (data, no) {
                        data.start = new Date(data.start);
                    });
                    angular.forEach($scope.homeData.whatsnew, function (data, no) {
                        if (data.whatsnew_type == 3) {
                            data.typeData = $rootScope.kaizentypes.filter(function (kaizen) {
                                return kaizen.id == data.type;
                            })[0];
                        } else if (data.whatsnew_type == 8) {
                            data.typeData = $rootScope.kaizentypes.filter(function (kaizen) {
                                return kaizen.id == data.type;
                            })[0];
                        }
                    });
                    $scope.eventSources = [$scope.calendarevents];
                    console.log($scope.homeData)
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Posts'];
        
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        var delayed;

        $scope.baroptions = {
            animation: {
                duration: 2000,
                easing: 'linear',
                loop: true
            },
            tooltips: {
                enabled: true
            },
            hover: {
                mode: null
            },
            scales: {
                xAxes: [{
                    display: true,
                    barPercentage: 0.4,
                    categoryPercentage: 0.5,
                    gridLines: {
                        drawBorder: true,
                        display: false
                    },
                    ticks: {
                        fontSize: 14,
                        fontColor: '#0e5f77',
                        fontWeight: 600,
                    },
                }],
                yAxes: [{
                    gridLines: {
                        drawBorder: true,
                        display: false
                    },
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        fontSize: 14,
                        step: 1,
                        fontColor: '#0e5f77',
                        fontWeight: 600,
                    },
                }],
            },
            maintainAspectRatio: false,
            responsive: true,
        }

        $scope.getData();

    }
]);