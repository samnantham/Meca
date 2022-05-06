'use strict';

app.controller('KaizenInfoController', ['$scope', '$http', '$state', '$stateParams', 'webServices', 'utility', '$rootScope', '$timeout', '$filter', '$ngConfirm', '$sce', function($scope, $http, $state, $stateParams, webServices, utility, $rootScope, $timeout, $filter, $ngConfirm, $sce) {

    $scope.kaizen = {};
    $scope.module_id = 3;
    $scope.commentData = {};
    $scope.commentData.isfile = 0;

    $scope.getData = function() {
        webServices.get('kaizen/' + $stateParams.id).then(function(getData) {
            if (getData.status == 200) {
                $scope.kaizen = getData.data;
                if (!$scope.kaizen.has_access) {
                    $state.go('app.kaizens', { type: 1 });
                } else {
                    $scope.mediafiles = $rootScope.splitFiles($scope.kaizen.kaizen_files);
                    $scope.kaizen.videocount = $rootScope.getfileCounts($scope.kaizen.kaizen_files, 'video');
                    $scope.kaizen.imagecount = $rootScope.getfileCounts($scope.kaizen.kaizen_files, 'image');
                    $scope.getComments();
                }
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.editKaizen = function() {
        $rootScope.isEdititem = true;
        $rootScope.formData = $scope.kaizen;
        $rootScope.ModalOpen('kaizenModal', 'KaizenModalController');
    }

    $scope.removeComment = function(id) {
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
                        $scope.deleteComment(id);
                    }
                },
                cancel: {
                    text: 'No',
                    action: function() {}
                }
            }
        });
    }

    $scope.changeLike = function() {
        var obj = {};
        obj.module = $scope.module_id;
        obj.item = $stateParams.id;
        if (parseInt($scope.kaizen.isliked)) {
            obj.status = 0;
        } else {
            obj.status = 1;
        }
        webServices.post('like', obj).then(function(getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.kaizen.isliked = obj.status;
                if (obj.status) {
                    $scope.kaizen.likes++;
                } else {
                    $scope.kaizen.likes--;
                }

            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.deleteComment = function(id) {
        webServices.delete('comment/' + id).then(function(getData) {
            if (getData.status == 200) {
                $scope.getComments();
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.getComments = function() {
        webServices.get('comments/3/' + $stateParams.id).then(function(getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.comments = getData.data;
                $rootScope.viewModuleItem($scope.module_id, $stateParams.id);
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.showHidecomment = function(key) {
        if ($scope.comments[key].showreply) {
            $scope.commentData = {};
        } else {
            $scope.comments[key].replycomment = '';
        }
        $scope.comments[key].showreply = !$scope.comments[key].showreply;
        $scope.commentData.parent = $scope.comments[key].id;
        $scope.commentData.isfile = 0;
        $scope.commentData.item = $stateParams.id;
        $scope.commentData.module = $scope.module_id;
        $scope.commentData.is_admin = 0;
        $scope.commentData.is_reply = 1;
        $scope.commentData.reply_for = $scope.comments[key].id;
    }

    $scope.sendCommentReply = function(comment) {
        if (comment) {
            $scope.commentData.comment = comment;
            $scope.sendComment();
        }
    }

    $scope.sendsubCommentReply = function(comment) {
        if (comment) {
            $scope.commentData.comment = comment;
            $scope.sendComment();
        }
    }

    $scope.showHideSubCommentcomment = function(key, no) {
        if ($scope.comments[key].subcomments[no].showreply) {
            $scope.commentData = {};
        } else {
            $scope.comments[key].subcomments[no].replycomment = '';
        }
        $scope.commentData.isfile = 0;
        $scope.commentData.item = $stateParams.id;
        $scope.commentData.module = $scope.module_id;
        $scope.comments[key].subcomments[no].showreply = !$scope.comments[key].subcomments[no].showreply;
        $scope.commentData.parent = $scope.comments[key].id;
        $scope.commentData.is_admin = 0
        $scope.commentData.is_reply = 1
        $scope.commentData.reply_for = $scope.comments[key].subcomments[no].id;
    }

    $scope.addComment = function() {
        if ($scope.commentData.comment) {
            $scope.commentData.commentfile = '';
            $scope.commentData.isfile = 0;
            $scope.commentData.item = $stateParams.id;
            $scope.commentData.module = $scope.module_id;
            $scope.sendComment();
        }
    }

    $scope.sendComment = function() {
        webServices.upload('comment', $scope.commentData).then(function(getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.commentData = {};
                $scope.getComments();
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.removeKaizen = function() {
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
                        $scope.deleteKaizen();
                    }
                },
                cancel: {
                    text: 'No',
                    action: function() {}
                }
            }
        });
    }

    $scope.deleteKaizen = function(id) {
        webServices.delete('kaizen/' + $stateParams.id).then(function(getData) {
            if (getData.status == 200) {
                $rootScope.$emit("showSuccessMsg", getData.data.message);
                $state.go('app.kaizens', { type: 1 });
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.getData();
    var obj = { page_component: 'kaizen', page_name: 'info', module: $scope.module_id, item: $stateParams.id };
    $rootScope.viewPage(obj);


}]);