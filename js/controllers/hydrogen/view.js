'use strict';

app.controller('HydrogenInfoController', ['$scope', '$http', '$state', '$stateParams', 'webServices', 'utility', '$rootScope', '$timeout', '$filter', '$ngConfirm', '$sce', function($scope, $http, $state, $stateParams, webServices, utility, $rootScope, $timeout, $filter, $ngConfirm, $sce) {

    $scope.hydrogen = {};
    $scope.module_id = 7;
    $scope.commentData = {};
    $scope.commentData.isfile = 0;
    
    $scope.getData = function() {
        webServices.get('hydrogen/' + $stateParams.id).then(function(getData) {
            if (getData.status == 200) {
                $scope.hydrogen = getData.data;
                if(!$scope.hydrogen.has_access){
                    $state.go('app.hydrogen',{type:1});
                }else{
                    $scope.mediafiles = $rootScope.splitFiles($scope.hydrogen.hydrogen_files); 
                    $scope.hydrogen.videocount = $rootScope.getfileCounts($scope.hydrogen.hydrogen_files,'video'); 
                    $scope.hydrogen.imagecount = $rootScope.getfileCounts($scope.hydrogen.hydrogen_files,'image'); 
                    $scope.getComments();
                }
            } else {
                $rootScope.$emit("showISError",getData);
            }
        });
    }

    $scope.editHydrogen = function(){
        $rootScope.isEdititem = true;
        $rootScope.formData = $scope.hydrogen;
        $rootScope.ModalOpen('hydrogenModal','HydrogenModalController');
    }

    $scope.removeComment = function(id){
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
                    action: function () {
                    }
                }
            }
        });
    }

    $scope.changeLike = function(){
        var obj = {};
        obj.module = $scope.module_id;
        obj.item = $stateParams.id;
        if(parseInt($scope.hydrogen.isliked)){
            obj.status = 0;
        }else{
            obj.status = 1;
        }
        webServices.post('like',obj).then(function(getData) {
            console.log(getData)
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.hydrogen.isliked = obj.status;
                if(obj.status){
                    $scope.hydrogen.likes ++ ;
                }else{
                    $scope.hydrogen.likes -- ;
                }
                 
            } else {
                $rootScope.$emit("showISError",getData);
            }
        });
    }

    $scope.deleteComment = function(id){
        webServices.delete('comment/' + id).then(function(getData) {
            if (getData.status == 200) {
                $scope.getComments();
            } else {
                $rootScope.$emit("showISError",getData);
            }
        });
    }

    $scope.getComments = function() {
        webServices.get('comments/'+$scope.module_id+'/' + $stateParams.id).then(function(getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.comments = getData.data;
                $rootScope.viewModuleItem($scope.module_id,$stateParams.id);
            } else {
                $rootScope.$emit("showISError",getData);
            }
        });
    }

    $scope.showHidecomment = function(key){
        if($scope.comments[key].showreply){
            $scope.commentData = {};
        }else{
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

    $scope.sendCommentReply = function(comment){
        if(comment){
            $scope.commentData.comment = comment;
            $scope.sendComment();
        }
    }

    $scope.sendsubCommentReply = function(comment){
        if(comment){
            $scope.commentData.comment = comment;
            $scope.sendComment();
        }
    }

    $scope.showHideSubCommentcomment = function(key,no){
        if($scope.comments[key].subcomments[no].showreply){
            $scope.commentData = {};
        }else{
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

    $scope.addComment = function(){
        if($scope.commentData.comment){
            $scope.commentData.commentfile = '';
            $scope.commentData.isfile = 0;
            $scope.commentData.item = $stateParams.id;
            $scope.commentData.module = $scope.module_id;
            $scope.sendComment();
        }
    }

    $scope.sendComment = function(){
         webServices.upload('comment',$scope.commentData).then(function(getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                 $scope.commentData = {};
                 $scope.getComments();
            } else {
                $rootScope.$emit("showISError",getData);
            }
        });
    }

    $scope.removeHydrogen = function() {
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
                        $scope.deleteHydrogen();
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

    $scope.deleteHydrogen = function(id){
        webServices.delete('hydrogen/' + $stateParams.id).then(function(getData) {
            if (getData.status == 200) {
                $rootScope.$emit("showSuccessMsg", getData.data.message);
                $state.go('app.hydrogen',{type:1});
            } else {
                $rootScope.$emit("showISError",getData);
            }
        });
    }

   $scope.getData();

}]);