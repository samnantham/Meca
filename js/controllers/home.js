'use strict';
app.controller('DashboardCtrl', ['$scope', '$state', 'webServices', '$rootScope', 'authServices', '$timeout', '$sessionStorage', 'NgMap', '$http', '$filter', '$sce', '$window',
    function ($scope, $state, webServices, $rootScope, authServices, $timeout, $sessionStorage, NgMap, $http, $filter, $sce, $window) {

        $rootScope.$emit("setSliderConfig", {});
        $scope.firstloadingdone = false;
        $scope.doclink = '';

        $scope.clickTMC = function (data) {
            if (data.type == 'link') {
                // $window.open(data.doc_link, '_blank');
            } else if (data.type == 'document') {
                $scope.openPDF($rootScope.IMGURL + data.doc_link);
            }
        }

        $scope.openPDF = function (link) {
            console.log(link)
            $scope.doclink = $sce.trustAsResourceUrl(link);
            $('#PDFModal').modal({
                backdrop: 'static',
                keyboard: false
            });
        }

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
                eventClick: function (event) {
                    $rootScope.formData = event;
                    $scope.activeDate = event.start._d;
                    $scope.calenderevents = [];
                    $scope.getCalenderEvents(event.start._d.getTime());
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

        $scope.viewEvent = function () {
            if ($rootScope.formData.type < 4) {
                if ($rootScope.formData.type == 1) {
                    $state.go('app.viewevent', {
                        id: $rootScope.formData.caleventInfo.item
                    });
                } else if ($rootScope.formData.type == 2) {
                    $state.go('app.viewtbp', {
                        id: $rootScope.formData.caleventInfo.item
                    });
                } else if ($rootScope.formData.type == 3) {
                    $state.go('app.viewkaizen', {
                        id: $rootScope.formData.caleventInfo.item
                    });
                }
            }
        }

        $scope.viewItem = function (item) {
            if (item.whatsnew_type == 2) {
                $state.go('app.viewevent', {
                    id: item.id
                });

            } else if (item.whatsnew_type == 3) {
                $state.go('app.viewkaizen', {
                    id: item.id
                });
            }
            console.log(item)
        }


        $scope.updateReminder = function (reminder) {
            var obj = {};
            obj.item = reminder.item;
            obj.module = reminder.module;
            webServices.put('reminder/update', obj).then(function (getData) {
                console.log(getData)
                /*if (getData.status == 200) {
                    $rootScope.loading = false;
                    $scope.calendarevents = getData.data;
                    angular.forEach($scope.calendarevents, function(data, no) {
                        data.start = new Date(data.start);
                    });
                    $scope.eventSources.splice(0,1);
                    $scope.eventSources.push($scope.calendarevents);
                } else {
                    $rootScope.$emit("showerror", getData);
                }*/
            });
        }

        $scope.getMonthevents = function (month, year) {
            webServices.get('calendar/info/' + month + '/' + year).then(function (getData) {
                if (getData.status == 200) {
                    $rootScope.loading = false;
                    $scope.calendarevents = getData.data;
                    angular.forEach($scope.calendarevents, function (data, no) {
                        data.start = new Date(data.start);
                    });
                    $scope.eventSources.splice(0, 1);
                    $scope.eventSources.push($scope.calendarevents);
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.getData = function () {
            var obj = {};
            obj.title = 'We set up the "Regional Awards of Toyota Dream Car Art Contest" from 2021';
            obj.cover_image = 'public/upload/fromTMC/60596a1a68321.png';
            obj.doc_link = 'https://mecacampus.com/awards';
            obj.type = 'link';
            webServices.get('home/info').then(function (getData) {
                $rootScope.loading = false;
                $scope.firstloadingdone = true;
                if (getData.status == 200) {
                    $scope.homeData = getData.data;
                    $scope.homeData.tmcs = [];
                    $scope.homeData.fromTMC.type = 'document';
                    $scope.homeData.tmcs.push($scope.homeData.fromTMC);
                    //$scope.homeData.tmcs.push(obj)
                    console.log($scope.homeData.tmcs);
                    $scope.calendarevents = getData.data.caldata;
                    angular.forEach($scope.calendarevents, function (data, no) {
                        data.start = new Date(data.start);
                    });
                    angular.forEach($scope.homeData.whatsnew, function (data, no) {
                        if (data.whatsnew_type == 3) {
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



        $rootScope.openModal = function () {
            $('#PopupModal').modal({
                backdrop: 'static',
                keyboard: false
            });
        }

        $rootScope.openeventModal = function () {
            $('#EventInfoModal').modal({
                backdrop: 'static',
                keyboard: false
            });
        }

        $rootScope.closeModal = function () {
            $rootScope.formData = {};
            $('#PopupModal').modal('hide');
            $('#EventInfoModal').modal('hide');
            $('#PDFModal').modal('hide');
        }

        $scope.getData();

    }
]);