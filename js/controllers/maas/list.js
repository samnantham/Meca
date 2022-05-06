'use strict';

app.controller('MaasController', ['$scope', '$http', '$state', 'authServices', '$stateParams', 'webServices', 'utility', '$rootScope', '$timeout', '$filter', '$ngConfirm', 'toaster', function($scope, $http, $state, authServices, $stateParams, webServices, utility, $rootScope, $timeout, $filter, $ngConfirm, toaster) {

    $scope.maaslist = [];
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

    $scope.changeActive = function(tab) {
        if ($scope.activetab != tab) {
            $rootScope.loading = true;
            $scope.activetab = tab;
            $scope.filterData.type = tab;
            $scope.getResults();
        }
    }

    $scope.changeLimit = function(totalPerPage) {
        $scope.totalPerPage = totalPerPage;
        $scope.pagedata = [];
        $scope.pageno = 1;
        if ($scope.sortorder) {
            $scope.pagedata = [];
            $scope.pageno = 1;
            $scope.url = 'vendor/sort/' + $scope.sortkey + '/' + $scope.sortorder + '/' + $scope.totalPerPage;
        } else {
            $scope.url = 'vendor/get/paginate/' + $scope.totalPerPage;
        }
        $scope.getResults();
    };

    $scope.sortData = function(key, order) {
        $scope.filterData.sortkey = key;
        $scope.filterData.sortorder = order;
        $scope.pagedata = [];
        $scope.pageno = 1;
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
                $scope.maaslist = getData.data;
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
            $scope.maaslist = $scope.pagedata[$scope.pageno];
        }
    };

    $scope.getDatas = function() {
        $rootScope.loading = true;
        $scope.pageno = 1;
        $scope.url = 'maas/paginate/' + $scope.totalPerPage;
        $scope.getResults();
    };

    $scope.getDatas();

    var obj = { page_component: 'maas', page_name: 'list', module: 5, item: 0 };
    $rootScope.viewPage(obj);

}]);