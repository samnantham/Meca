'use strict';
app.controller('CalendarCtrl', ['$scope', 'webServices', '$rootScope', '$http', '$filter', '$state', '$window',
    function ($scope, webServices, $rootScope, $http, $filter, $state, $window) {
        $rootScope.loading = true;
        $scope.firstloadingdone = false;
        
        $scope.uiConfig = {
            calendar: {
                height: 'auto',
                editable: true,
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month basicWeek basicDay listDay listWeek listMonth,'
                },
                dayClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                fixedWeekCount: true,
                weekMode: 'liquid',
                eventMouseover: $scope.alertOnMouseOver,
                eventClick: function (event) {
                    if(event.from_google){
                        $window.open( $rootScope.calendarURL, '_blank' );
                    }else{
                        $rootScope.formData = event;
                        $scope.activeDate = event.start._d;
                        $scope.calenderevents = [];
                        $scope.getCalenderEvents(event.start._d.getTime());
                    }
                },
                viewRender: function (view, element) {
                    var monthyear = view.title.split(' ');
                    var month = $rootScope.getMonthFromString(view.title.split(' ')[0]);
                    var year = parseInt(monthyear[1]);
                    $scope.getGoogleCalHolidays(month, year);
                }
            }
        };

        $scope.getCalenderEvents = function (date) {
            webServices.get('calendar/daily/events/' + date).then(function (getData) {
                if (getData.status == 200) {
                    $scope.calenderevents = getData.data;
                    $scope.openModal();
                } else {
                    $rootScope.$emit("showISError", getData);
                }
            });
        }

        $rootScope.openeventModal = function () {
            $('#PopupModal').modal({
                backdrop: 'static',
                keyboard: false
            });
        }

        $scope.openModal = function () {
            $('#PopupModal').modal({
                backdrop: 'static',
                keyboard: false
            });
        }

        $scope.gotoItem = function (type, item) {
            $scope.closeModal();
            if (type == 'kaizen') {
                $state.go('app.viewkaizen', { 'id': item });
            } else if (type == 'tbp') {
                $state.go('app.viewtbp', { 'id': item });
            } else if (type == 'event') {
                $state.go('app.viewevent', { 'id': item });
            } else if (type == 'gr') {
                $state.go('app.viewgr', { 'id': item });
            } else if (type == 'hydrogen') {
                $state.go('app.viewhydrogen', { 'id': item });
            } else if (type == 'maas') {
                $state.go('app.viewmaas', { 'id': item });
            } else if (type == 'sdgs') {
                $state.go('app.viewsdgs', { 'id': item });
            }
        }

        $scope.getMonthevents = function (month, year) {
            webServices.get('calendar/info/' + month + '/' + year).then(function (getData) {
                if (getData.status == 200) {
                    $rootScope.loading = false;
                    //$scope.calendarevents = getData.data;
                    angular.forEach(getData.data, function (data, no) {
                        data.start = new Date(data.start);
                        $scope.calendarevents.push(data)
                    });
                    if (!$scope.firstloadingdone) {
                        $scope.eventSources = [$scope.calendarevents];
                        $scope.firstloadingdone = true;
                    } else {
                        $scope.eventSources.splice(0, 1);
                        $scope.eventSources.push($scope.calendarevents);
                    }
                    console.log($scope.eventSources)
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $rootScope.closeModal = function () {
            $rootScope.formData = {};
            $('#PopupModal').modal('hide');
            $('#EventInfoModal').modal('hide');
            $('#PDFModal').modal('hide');
        }

        $scope.getGoogleCalEvents = function (month,year) {
            $http({
                method: 'GET',
                url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + $rootScope.CalendarID + '/events?key=' + $rootScope.Calendarkey),
                cache: false,
                dataType: 'json',
            }).then(function (response) {
                angular.forEach(response.data.items, function (item, no) {
                    var obj = {};
                    obj.title = item.summary;
                    obj.className = ['bg-info-cal'];
                    obj.start = new Date(item.start.date);
                    obj.from_google = 1;
                    $scope.calendarevents.push(obj)
                });
                $scope.getMonthevents(month,year);
            }, function (response) {
                console.log(response)
            });

        }
        

        $scope.getGoogleCalHolidays = function (month,year) {
            $scope.calendarevents = [];
            $http({
                method: 'GET',
                url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/japanese@holiday.calendar.google.com/events?key=' + $rootScope.Calendarkey),
                cache: false,
                dataType: 'json',
            }).then(function (response) {
                console.log(response)
                angular.forEach(response.data.items, function (item, no) {
                    var obj = {};
                    obj.title = item.summary;
                    obj.className = ['bg-info-cal'];
                    obj.start = new Date(item.start.date);
                    obj.from_google = 1;
                    $scope.calendarevents.push(obj)
                });
                $scope.getGoogleCalEvents(month,year);
            }, function (response) {
                console.log(response)
            });

        }

        var d = new Date();
        $scope.getGoogleCalHolidays(d.getMonth(), d.getYear());

    }
]);