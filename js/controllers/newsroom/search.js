'use strict';

app.controller('NewsRoomSearchController', ['$scope', '$http', '$state', 'authServices', '$stateParams', 'webServices', 'utility', '$rootScope', '$timeout', '$filter', '$ngConfirm', 'toaster', function($scope, $http, $state, authServices, $stateParams, webServices, utility, $rootScope, $timeout, $filter, $ngConfirm, toaster) {

    $scope.newslist = [];
    $scope.pagedata = [];
    $scope.pageno = 1;
    $scope.totalData = 0;
    $scope.totalPerPage = $rootScope.pagelimits[0];
    $rootScope.loading = true;
    $scope.filterData = {};
    $scope.filterData.sortorder = '';
    $scope.filterData.tags = [];
    $scope.filterData.tags.push($stateParams.tag);
    $scope.errorData = {};
    $scope.isSearch = false;

    $scope.sortData = function(key, order, label) {
        $scope.filterData.sortkey = key;
        $scope.filterData.sortorder = order;
        $scope.filterData.sortlabel = label;
        $scope.pagedata = [];
        $scope.pageno = 1;
        $scope.getResults();
    }

    $scope.addremovetags = function(tag) {
        var index = $scope.filterData.tags.indexOf(tag);
        if (index > -1) {
            $scope.filterData.tags.splice(index, 1);
        } else {
            $scope.filterData.tags.push(tag);
        }
        $scope.getResults();
    }

    $scope.getResults = function() {
        webServices.post($scope.url + '?page=' + $scope.pageno, $scope.filterData).then(function(getData) {
            console.log(getData)
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.pagination = {
                    current: $scope.pageno
                };
                $scope.pagedata[$scope.pageno] = getData.data;
                $scope.newslist = getData.data;
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

    $scope.getDatas();

    var obj = { page_component: 'news_room', page_name: 'search', module: 10, item: 0 };
    $rootScope.viewPage(obj);

}]);