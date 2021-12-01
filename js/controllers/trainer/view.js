'use strict';

app.controller('TrainerInfoController', ['$scope', '$state', '$stateParams', 'webServices', 'utility', '$rootScope', '$timeout', '$filter', '$ngConfirm', '$sce', function ($scope, $state, $stateParams, webServices, utility, $rootScope, $timeout, $filter, $ngConfirm, $sce) {

    $scope.pdca = {};
    $scope.filterData = {};
    $scope.pdca_uploads = angular.copy($rootScope.pdca_upload_types);
    $scope.module_id = 16;
    
    $scope.getData = function () {
        webServices.get('trainer/training/' + $stateParams.id).then(function (getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.pdca = getData.data;
                console.log($scope.pdca)
                $rootScope.viewModuleItem($scope.module_id,$stateParams.id);
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.viewVideo = function (data) {
        var obj = { video: data.id, training: $stateParams.id };
        webServices.upload('trainer/view/video', obj).then(function (getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                data.viewstatus = getData.data;
                $scope.showVideo(data);
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.openVideo = function (key, data) {
        if (!data.viewstatus) {
            $scope.viewVideo(data);
        } else {
            $scope.showVideo(data);
        }
    }

    $scope.showVideo = function (data) {
        $scope.videoData = data;
        var files = [];
        var obj = {};
        obj.type = 'video';
        obj.thumbUrl = 'img/logoLG.png';
        if (data.type == 2) {
            obj.url = data.video_link;
        } else {
            obj.url = $rootScope.IMGURL + data.video_link;
        }
        files.push(obj);
        $rootScope.openLightbox(files, 0);
        $scope.getData();
    }

    $scope.uploadReport = function (session, files) {
        $scope.errors = [];
        if (files && files.length) {
            var extn = files[0].name.split(".").pop();
            if ($rootScope.validfileextensions.includes(extn.toLowerCase())) {
                if (files[0].size <= $rootScope.maxUploadsize) {
                    $scope.uploadData = {};
                    $scope.uploadData.training = $stateParams.id;
                    $scope.uploadData.session = session;
                    $scope.uploadData.newdocument = files[0];
                    $scope.confirmUpload();
                } else {
                    $scope.errors.push(files[0].name + ' size exceeds 2MB.')
                }
            } else {
                $scope.errors.push(files[0].name + ' format unsupported.');
            }
        }
        if ($scope.errors.length > 0) {
            $rootScope.$emit("showErrors", $scope.errors);
        }
    }

    $scope.confirmUpload = function () {
        $ngConfirm({
            title: 'Are you sure want to upload this?',
            content: '',
            type: 'success',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Yes',
                    btnClass: 'btn-red',
                    action: function () {
                        $scope.uploadDocument();
                    }
                },
                cancel: {
                    text: 'No',
                    action: function () {
                        $scope.uploadData = {};
                        $scope.uploadData.newdocument = '';
                    }
                }
            }
        });
    }

    $scope.uploadDocument = function () {
        webServices.upload('trainer/training/session/upload', $scope.uploadData).then(function (getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $rootScope.$emit("showSuccessMsg", getData.data.message);
                $scope.uploadData = {};
                $scope.uploadData.newdocument = '';
                $scope.getData();
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    };

    $scope.getData();

}]);