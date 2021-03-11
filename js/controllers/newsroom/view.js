'use strict';

app.controller('NewsInfoController', ['$scope', '$state', '$stateParams', 'webServices', 'utility', '$rootScope', '$timeout', '$filter', '$ngConfirm', '$sce', function ($scope, $state, $stateParams, webServices, utility, $rootScope, $timeout, $filter, $ngConfirm, $sce) {

    $scope.news = {};
    $scope.filterData = {};

    $scope.getData = function () {
        webServices.get('news/' + $stateParams.id).then(function (getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.news = getData.data;
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.editNews = function(){
        $rootScope.isEdititem = true;
        $rootScope.formData = $scope.news;
        $rootScope.ModalOpen('newsModal','NewsModalController');
    }

    $scope.removeNews = function() {
        $ngConfirm({
            title: 'Are you sure want to remove?',
            content: '',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Yes',
                    btnClass: 'btn-red',
                    action: function() {
                        $scope.deleteNews();
                    }
                },
                cancel: {
                    text: 'No',
                    action: function () {
                    }
                }
            }
        });
    }

    $scope.deleteNews = function(id){
        webServices.delete('news/' + $stateParams.id).then(function(getData) {
            if (getData.status == 200) {
                $rootScope.$emit("showSuccessMsg", getData.data.message);
                $state.go('app.newsroom');
            } else {
                $rootScope.$emit("showISError",getData);
            }
        });
    }

    $scope.getData();

}]);