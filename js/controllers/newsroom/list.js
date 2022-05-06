'use strict';

app.controller('NewsRoomController', ['$scope', '$http', '$state', 'authServices', '$stateParams', 'webServices', 'utility', '$rootScope', '$timeout', '$filter', '$ngConfirm', 'toaster', function($scope, $http, $state, authServices, $stateParams, webServices, utility, $rootScope, $timeout, $filter, $ngConfirm, toaster) {

    $scope.newslist = [];
    $scope.pagedata = [];
    $scope.pageno = 1;
    $scope.totalData = 0;
    $scope.totalPerPage = $rootScope.pagelimits[0];
    $rootScope.loading = true;
    $scope.filterData = {};
    $scope.filterData.sortorder = '';
    $scope.filterData.type = 5;
    $scope.errorData = {};
    $scope.activetab = '';
    $scope.activesubcategory = '';
    $scope.subcategorylist = [];
    $scope.slides = [{ image: 'img/c1.jpg' }, { image: 'img/c2.jpg' }, { image: 'img/c3.jpg' }, { image: 'img/c4.jpg' }];


    $scope.sortData = function(key, order) {
        $scope.filterData.sortkey = key;
        $scope.filterData.sortorder = order;
        $scope.pagedata = [];
        $scope.pageno = 1;
        $scope.getResults();
    }

    $scope.searchClick = function() {
        $scope.isSearch = !$scope.isSearch;
        if (!$scope.isSearch) {
            $scope.filterData.keyword = '';
            $scope.getResults();
        }
    }

    $scope.changeActive = function(tab) {
        if ($scope.activetab != tab) {
            console.log(tab)
            $scope.subcategorylist = [];
            $scope.activesubcategory = '';
            if (tab != '') {
                $scope.subcategorylist = tab.subcategories;
                $scope.activetab = tab.category;
                $scope.filterData.category = tab.category;
                $scope.filterData.subcategory = '';
            } else {
                $scope.activetab = '';
                $scope.filterData.category = '';
                $scope.filterData.subcategory = '';
            }

            $rootScope.loading = true;
            $scope.getResults();
        }
    }

    $scope.changeSub = function(sub) {
        if ($scope.activesubcategory != sub) {
            $scope.activesubcategory = sub;
            $scope.filterData.subcategory = sub;
            $rootScope.loading = true;
            $scope.getResults();
        }
    }

    $scope.getResults = function() {
        webServices.post($scope.url + '?page=' + $scope.pageno, $scope.filterData).then(function(getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.pagination = {
                    current: $scope.pageno
                };
                $scope.pagedata[$scope.pageno] = getData.data;
                $scope.newslist = getData.data;
                $scope.marketTotal = 0;
                $scope.toyotaTotal = 0;
                angular.forEach($scope.newslist.data, function(data, no) {
                    if (data.category == 'Toyota Latest News') {
                        $scope.toyotaTotal++;
                    }
                    if (data.category == 'Market Latest News') {
                        $scope.marketTotal++;
                    }
                });
                console.log($scope.newslist)
            } else {
                //$rootScope.logout();
            }
        });
    };

    $scope.pageChanged = function(newPage) {
        $scope.pageno = newPage;
        if (!$scope.pagedata[$scope.pageno]) {
            $scope.getResults();
        } else {
            $scope.newslist = $scope.pagedata[$scope.pageno];
        }
    };

    $scope.getDatas = function() {
        $rootScope.loading = true;
        $scope.pageno = 1;
        $scope.url = 'news/paginate/' + $scope.totalPerPage;
        $scope.getResults();
    };

    $scope.getVideos = function(month, year) {
        webServices.get('news/video/list').then(function(getData) {
            console.log(getData)
            if (getData.status == 200) {
                $scope.quarteryvideos = getData.data.quarteryVideos;
                $scope.crisislist = getData.data.crisis;
                $scope.videos = getData.data.Videos;
                $scope.videoCategories = [];
                angular.forEach($scope.videos, function(data, no) {
                    console.log(data)
                });
                $scope.getDatas();
            } else {
                $rootScope.$emit("showerror", getData);
            }
        });
    }
    $scope.getVideos();

    var obj = { page_component: 'news_room', page_name: 'list', module: 10, item: 0 };
    $rootScope.viewPage(obj);


}]);