'use strict';
app.controller('CalendarCtrl', ['$scope', 'webServices', '$rootScope', '$http', '$filter', '$state',
    function($scope, webServices, $rootScope, $http, $filter, $state) {
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
                eventMouseover: $scope.alertOnMouseOver,
                eventClick: function (event) {
                    $rootScope.formData = event;
                    $scope.activeDate = event.start._d;
                    $scope.calenderevents = [];
                    $scope.getCalenderEvents(event.start._d.getTime());
                },
                viewRender: function(view, element) {
                    var monthyear = view.title.split(' ');
                    var month = $rootScope.getMonthFromString(view.title.split(' ')[0]);
                    var year = parseInt(monthyear[1]);
                    if($scope.firstloadingdone){
                        $scope.getMonthevents(month,year);
                    }
                    
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

        $scope.openModal = function(){
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

        $scope.getMonthevents = function(month,year) {
            webServices.get('calendar/info/'+month+'/'+year).then(function(getData) {
                if (getData.status == 200) {
                    $rootScope.loading = false;
                    $scope.calendarevents = getData.data;
                    angular.forEach($scope.calendarevents, function(data, no) {
                        data.start = new Date(data.start);
                    });
                    if(!$scope.firstloadingdone){
                        $scope.eventSources = [$scope.calendarevents];
                        $scope.firstloadingdone = true;
                    }else{
                        $scope.eventSources.splice(0,1);
                        $scope.eventSources.push($scope.calendarevents);
                    }
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

        var d = new Date();
        $scope.getMonthevents(d.getMonth(),d.getYear());

    }
]);