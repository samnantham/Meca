'use strict';
app.controller('GRDashboardCtrl', ['$scope', '$state', 'webServices', '$rootScope', 'authServices', '$timeout', '$window', 'NgMap', '$http', '$filter',
    function($scope, $state, webServices, $rootScope, authServices, $timeout, $window, NgMap, $http, $filter) {

        $rootScope.$emit("setSliderConfig", {});
        $scope.firstloadingdone = false;
        $scope.activeTab = 1;
        $scope.gr_specialSites = [{
            'link': 'https://toyotagazooracing.com/e-motorsports/',
            'img': 'img/GT-Cup.png'
        }, {
            'link': 'https://www.gran-turismo.com/gb/gtsport/sportmode/championship/archives',
            'img': 'img/Gran-Turismo.png'
        }, {
            'link': 'https://www.instagram.com/menadigitalmotorsports/',
            'img': 'img/mena.png'
        }, {
            'link': 'https://toyotagazooracing.com/e-motorsports/',
            'img': 'img/Youtube.png'
        }];

        $scope.YoutubeLinks = [{
            'country': 'Jordan',
            'link': 'https://www.youtube.com/watch?v=FgI80AFnvcY'
        }, {
            'country': 'Oman',
            'link': 'https://www.youtube.com/c/OmanAutomobileAssociation-oaa'
        }, {
            'country': 'UAE',
            'link': 'https://www.youtube.com/user/TheATCUAE'
        }, {
            'country': 'Saudi Arabia',
            'link': 'https://www.youtube.com/watch?v=3T44vB-Keec'
        }, {
            'country': 'Bahrain',
            'link': 'https://www.youtube.com/channel/UCADrkUkU5nHrrdHszNcLCPg'
        }, {
            'country': 'The Finals',
            'link': 'https://www.youtube.com/watch?v=iM83LnJYdTA'
        }, {
            'country': 'Exhibition Races	',
            'link': 'https://www.youtube.com/watch?v=tsGSCGjivQI'
        }];
        $scope.changeActive = function(activeTab) {
            if (activeTab != $scope.activeTab) {
                $scope.activeTab = activeTab;
            }
        }

        $scope.activeClass = 0;

        $scope.changeClass = function() {
            $scope.activeClass = !$scope.activeClass;
            $timeout($scope.changeClass, 1000);
            console.log($scope.activeClass)
        }

        $timeout($scope.changeClass, 1000);

        $scope.gotoSpecial = function(key, link) {
            if (key > 2) {
                $('#PopupModal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            } else {
                $scope.openLink(link);
            }
        }

        $scope.openLink = function(link) {
            $window.open(link, '_blank');
        }

        $rootScope.closeModal = function() {
            $('#PopupModal').modal('hide');
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
                dayClick: function(date, allDay, jsEvent, view) {

                },
                eventClick: function(event) {
                    console.log(event)
                    $scope.goToitem(event);
                },
                viewRender: function(view, element) {
                    var monthyear = view.title.split(' ');
                    var month = $rootScope.getMonthFromString(view.title.split(' ')[0]);
                    var year = parseInt(monthyear[1]);
                    if ($scope.firstloadingdone) {
                        $scope.getMonthevents(month, year);
                    }
                }
            }
        };

        $scope.goToitem = function(item) {
            $state.go('app.viewgr', {
                id: item.gr
            });
        }

        $scope.getMonthevents = function(month, year) {
            webServices.get('gr/calendar/info/' + month + '/' + year).then(function(getData) {
                console.log(getData)
                if (getData.status == 200) {
                    $rootScope.loading = false;
                    $scope.calendarevents = getData.data;
                    angular.forEach($scope.calendarevents, function(data, no) {
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

        $scope.getData = function() {
            webServices.get('gr/dashboard/info').then(function(getData) {
                $rootScope.loading = false;
                $scope.firstloadingdone = true;
                if (getData.status == 200) {
                    $scope.grData = getData.data;
                    $scope.calendarevents = getData.data.caldata;
                    // angular.forEach($scope.calendarevents, function(data, no) {
                    //     data.start = new Date(data.start);
                    // });
                    $scope.eventSources = [$scope.calendarevents];
                    console.log($scope.grData)
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        var obj = { page_name: 'dashboard', page_component: 'gr', module: 6, item: 0 };
        $rootScope.viewPage(obj);

        $scope.getData();

    }
]);