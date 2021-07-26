'use strict';
app.controller('SGACtrl', ['$scope', '$state', 'webServices', '$rootScope', 'authServices', '$timeout', '$sessionStorage', 'NgMap', '$http', '$filter', '$sce', '$window', '$ngConfirm',
    function ($scope, $state, webServices, $rootScope, authServices, $timeout, $sessionStorage, NgMap, $http, $filter, $sce, $window, $ngConfirm) {
        $scope.getData = function () {
            webServices.get('sga/home').then(function (getData) {
                $rootScope.loading = false;
                if (getData.status == 200) {
                    $scope.SGAData = getData.data;
                    console.log($scope.SGAData)
                    $scope.setChart($scope.SGAData.labels, $scope.SGAData.values);
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.setChart = function (chartlabels, chartvalues) {
            $('#container').highcharts({
                colors: ['#0e5f77'],
                title: {
                    text: ''
                },
                chart: {
                },
                plotOptions: {
                    series: {
                        pointWidth: 25
                    }
                },
                legend: {
                    enabled: false
                  },
                xAxis: {
                    gridLineColor: '#0e5f77',
                    gridLineWidth: 0,
                    minorGridLineWidth: 0,
                    categories: chartlabels,
                    labels: {
                        style: {
                            color: '#0e5f77',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                      return '<b>'+ this.x +
                             '</b> : <b>'+ this.y +'</b>';
                    }
                  },
                yAxis: {
                    title: {
                        text: ''
                    },
                    gridLineColor: '#0e5f77',
                    gridLineWidth: 0,
                    minorGridLineWidth: 0,
                    lineWidth: 1,
                    plotLines: [{
                        color: '#FF0000',
                        width: 1,
                        value: 0
                    }],
                    min: 0,
                    max: 9,
                    tickInterval: 1,
                    labels: {
                        style: {
                            color: '#0e5f77',
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

    }
]);