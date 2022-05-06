'use strict';

app.controller('VideoInfoController', ['$scope', '$state', '$stateParams', 'webServices', 'utility', '$rootScope', '$timeout', '$filter', '$ngConfirm', '$sce', function($scope, $state, $stateParams, webServices, utility, $rootScope, $timeout, $filter, $ngConfirm, $sce) {

    $scope.video = {};
    $scope.filterData = {};

    $scope.getData = function() {
        webServices.get('news/video/' + $stateParams.id).then(function(getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.video = getData.data;
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.editVideo = function() {
        $rootScope.isEdititem = true;
        $rootScope.formData = $scope.video;
        $rootScope.ModalOpen('videoModal', 'videoModalController');
    }

    $scope.removeVideo = function() {
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
                        $scope.deleteVideo();
                    }
                },
                cancel: {
                    text: 'No',
                    action: function() {}
                }
            }
        });
    }

    $scope.deleteVideo = function(id) {
        webServices.delete('news/video/' + $stateParams.id).then(function(getData) {
            if (getData.status == 200) {
                $rootScope.$emit("showSuccessMsg", getData.data.message);
                $state.go('app.newsroom');
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.getData();

    var obj = { page_component: 'news_room', page_name: 'video_info', module: 10, item: $stateParams.id };
    $rootScope.viewPage(obj);

}]);