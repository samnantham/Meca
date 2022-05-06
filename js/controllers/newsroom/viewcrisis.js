'use strict';

app.controller('CrisisInfoController', ['$scope', '$state', '$stateParams', 'webServices', 'utility', '$rootScope', '$timeout', '$filter', '$ngConfirm', '$sce', function($scope, $state, $stateParams, webServices, utility, $rootScope, $timeout, $filter, $ngConfirm, $sce) {

    $scope.crisis = {};
    $scope.filterData = {};

    $scope.getData = function() {
        webServices.get('news/crisis/' + $stateParams.id).then(function(getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.crisis = getData.data;
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.editCrisis = function() {
        $rootScope.isEdititem = true;
        $rootScope.formData = $scope.news;
        $rootScope.ModalOpen('crisisModal', 'CrisisModalController');
    }

    $scope.removeCrisis = function() {
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
                        $scope.deleteCrisis();
                    }
                },
                cancel: {
                    text: 'No',
                    action: function() {}
                }
            }
        });
    }

    $scope.deleteCrisis = function(id) {
        webServices.delete('news/crisis/' + $stateParams.id).then(function(getData) {
            if (getData.status == 200) {
                $rootScope.$emit("showSuccessMsg", getData.data.message);
                $state.go('app.newsroom');
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.getData();

    var obj = { page_component: 'news_room', page_name: 'crisis_info', module: 10, item: $stateParams.id };
    $rootScope.viewPage(obj);

}]);