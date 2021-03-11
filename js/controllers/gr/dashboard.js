'use strict';
app.controller('GRDashboardCtrl', ['$scope', '$state', 'webServices', '$rootScope', 'authServices', '$timeout', '$sessionStorage', 'NgMap', '$http', '$filter',
    function ($scope, $state, webServices, $rootScope, authServices, $timeout, $sessionStorage, NgMap, $http, $filter) {

        $rootScope.$emit("setSliderConfig", {});
        $scope.firstloadingdone = false;

        $scope.uiConfig = {
            calendar: {
                height: 'auto',
                editable: true,
                fixedWeekCount: false,
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month basicWeek basicDay listDay listWeek listMonth,'
                },
                dayClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventMouseover: $scope.alertOnMouseOver,
                dayClick: function (date, allDay, jsEvent, view) {

                }, eventClick: function (event) {
                    console.log(event)
                    $scope.goToitem(event);
                }, viewRender: function (view, element) {
                    var monthyear = view.title.split(' ');
                    var month = $rootScope.getMonthFromString(view.title.split(' ')[0]);
                    var year = parseInt(monthyear[1]);
                    if ($scope.firstloadingdone) {
                        $scope.getMonthevents(month, year);
                    }
                }
            }
        };

        $scope.goToitem = function (item) {
            $state.go('app.viewgr', {
                id: item.gr
            });
        }

        $scope.getMonthevents = function (month, year) {
            webServices.get('gr/calendar/info/' + month + '/' + year).then(function (getData) {
                console.log(getData)
                if (getData.status == 200) {
                    $rootScope.loading = false;
                    $scope.calendarevents = getData.data;
                    angular.forEach($scope.calendarevents, function (data, no) {
                        data.start = new Date(data.start);
                    });
                    $scope.eventSources.splice(0, 1);
                    $scope.eventSources.push($scope.calendarevents);
                    $scope.firstloadingdone = true;
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.getData = function () {
            webServices.get('gr/dashboard/info').then(function (getData) {
                $rootScope.loading = false;
                $scope.firstloadingdone = true;
                if (getData.status == 200) {
                    $scope.grData = getData.data;
                    $scope.calendarevents = getData.data.caldata;
                    // angular.forEach($scope.calendarevents, function(data, no) {
                    //     data.start = new Date(data.start);
                    // });
                    $scope.eventSources = [$scope.calendarevents];
                    console.log($scope.eventSources)
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.getData();

    }
]);