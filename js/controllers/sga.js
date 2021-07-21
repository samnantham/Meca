'use strict';
app.controller('SGACtrl', ['$scope', '$state', 'webServices', '$rootScope', 'authServices', '$timeout', '$sessionStorage', 'NgMap', '$http', '$filter', '$sce', '$window', '$ngConfirm',
    function ($scope, $state, webServices, $rootScope, authServices, $timeout, $sessionStorage, NgMap, $http, $filter, $sce, $window, $ngConfirm) {
        $scope.getData = function () {
            webServices.get('sga/home').then(function (getData) {
                $rootScope.loading = false;
                if (getData.status == 200) {
                    $scope.SGAData = getData.data;
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

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
                    // ticks: {
                    //     fontSize: 14,
                    //     fontColor: '#0e5f77',
                    //     fontWeight: 600,
                    // },
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
                        min:0,
                        max:9
                    },
                }],
            },
            maintainAspectRatio: false,
            responsive: true,
        }

        $scope.getData();

    }
]);