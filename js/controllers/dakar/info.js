'use strict';

app.controller('DakarNewsInfoController', ['$scope', '$http', '$state', '$stateParams', 'webServices', 'utility', '$rootScope', '$timeout', '$filter', '$ngConfirm', '$sce', function($scope, $http, $state, $stateParams, webServices, utility, $rootScope, $timeout, $filter, $ngConfirm, $sce) {

    $scope.news = {};
    $scope.module_id = 19;

    $scope.getData = function() {
        webServices.get('dakar/special/news/' + $stateParams.id).then(function(getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.news = getData.data;
                $rootScope.viewModuleItem($scope.module_id, $stateParams.id);
                $scope.mediafiles = $rootScope.splitFiles($scope.news.uploaded_files);
                $scope.news.videocount = $rootScope.getfileCounts($scope.news.uploaded_files, 'video');
                $scope.news.imagecount = $rootScope.getfileCounts($scope.news.uploaded_files, 'image');
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }


    $scope.getData();

    var obj = { page_name: 'info', page_component: 'dakar', module: $scope.module_id, item: $stateParams.id };
    $rootScope.viewPage(obj);

}]);