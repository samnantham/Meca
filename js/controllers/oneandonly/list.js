'use strict';

app.controller('OnlyDayController', ['$scope', '$http', '$state', 'authServices', '$stateParams', 'webServices', 'utility', '$rootScope', '$timeout', '$filter', '$ngConfirm', 'toaster', function($scope, $http, $state, authServices, $stateParams, webServices, utility, $rootScope, $timeout, $filter, $ngConfirm, toaster) {

    $scope.onlydaylist = [];
    $scope.pagedata = [];
    $scope.pageno = 1;
    $scope.totalData = 0;
    $scope.totalPerPage = $rootScope.pagelimits[0];
    $rootScope.loading = true;
    $scope.filterData = {};
    $scope.filterData.sortorder = '';
    $scope.activetab = $stateParams.type;
    $scope.filterData.status = $stateParams.type;
    $scope.errorData = {};

    $scope.sortData = function(key,order) {
        $scope.filterData.sortkey = key;
        $scope.filterData.sortorder = order;
        $scope.pagedata = [];
        $scope.pageno = 1;
        $scope.getResults();
    }

    $scope.getResults = function() {
        webServices.post($scope.url + '?page=' + $scope.pageno,$scope.filterData).then(function(getData) {
            console.log(getData)
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.pagination = {
                    current: $scope.pageno
                };
                $scope.pagedata[$scope.pageno] = getData.data;
                $scope.onlydaylist = getData.data;
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
            $scope.onlydaylist = $scope.pagedata[$scope.pageno];
        }
    };

    $scope.getDatas = function() {
        $rootScope.loading = true;
        $scope.pageno = 1;
        $scope.url = 'oneandonlyday/paginate/' + $scope.totalPerPage;
        $scope.getResults();
    };
    
    $scope.getDatas();

}]);