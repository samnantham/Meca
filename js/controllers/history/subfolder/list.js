'use strict';

app.controller('HistorySubFolderController', ['$scope', '$http', '$state', 'authServices', '$stateParams', 'webServices', 'utility', '$rootScope', '$timeout', '$filter', '$ngConfirm', 'toaster', function($scope, $http, $state, authServices, $stateParams, webServices, utility, $rootScope, $timeout, $filter, $ngConfirm, toaster) {

    $scope.folderinfo = [];
    $scope.folders = [];
    $rootScope.loading = true;
    $scope.errorData = {};
    $scope.fileData = {};

    $scope.seterrorMsg = function(){
        $scope.errorData.folder_name_errorMsg = 'Enter Folder Name';
    }

    $scope.setservererrorMsg = function(errors){
        $scope.errorData = {};
        angular.forEach(errors, function(error, no) {
            $scope.errorData[no.replace('new','')+'_errorMsg'] = error[0];
            $scope.errorData[no.replace('new','')+'_error'] = true;
        });
    }

    $scope.uploadDoc = function(files){
        $scope.fileData.folder = $stateParams.id;
        $scope.fileData.newdocument = files[0];
        $ngConfirm({
            title: 'Are you sure want to upload this file?',
            content: '',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Yes',
                    btnClass: 'btn-red',
                    action: function() {
                        $scope.uploadFile();
                    }
                },
                cancel: {
                    text: 'No',
                    action: function () {
                        $scope.fileData = {};
                    }
                }
            }
        });
    }

    $scope.uploadFile = function(){
        $rootScope.loading = true;
        webServices.upload('history/folder/file/upload', $scope.fileData).then(function(getData) {
            if (getData.status == 200) {
                $rootScope.$emit("showSuccessMsg", getData.data.message);
                $scope.getData();
                $scope.closeModal();
            }
        });
    }

    $scope.addData = function(form) {
        $scope.seterrorMsg();
        if (form.$valid) {
            $rootScope.loading = true;
            if($scope.isedit){
                webServices.post('history/folder/'+ $scope.formData.id, $scope.formData).then(function(getData) {
                    $rootScope.loading = false;
                    if (getData.status == 200) {
                        $scope.closeModal();
                        $rootScope.$emit("showSuccessMsg", getData.data.message);
                        $scope.getFolders();
                    } else if (getData.status == 401) {
                        $scope.setservererrorMsg(getData.data.message);
                        $rootScope.loading = false;
                    } else {
                        $rootScope.$emit("showISError", getData);
                    }
                });
            }else{
                webServices.post('history/folder', $scope.formData).then(function(getData) {
                    console.log(getData)
                    $rootScope.loading = false;
                    if (getData.status == 200) {
                        $scope.closeModal();
                        $rootScope.$emit("showSuccessMsg", getData.data.message);
                        $scope.getFolders();
                    } else if (getData.status == 401) {
                        $scope.setservererrorMsg(getData.data.message);
                        $rootScope.loading = false;
                    } else {
                        $rootScope.$emit("showISError", getData);
                    }
                });
            }
               
        } else {
            if (!form.folder_name.$valid) {
                $scope.errorData.folder_name_error = true;
            }
        }
    }

    $scope.getData = function() {
        webServices.get('history/folderandfiles/' + $stateParams.id).then(function(getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.folderinfo = getData.data;
                console.log($scope.folderinfo)
            } else {
                //$rootScope.logout();
            }
        });
    };

    $scope.openaddModal = function() {
        $scope.inputchange();
        $scope.formData = {};
        $scope.formData.has_parent = 1;
        $scope.formData.parent_id = $stateParams.id;
        $scope.isedit = false;
        $('#PopupModal').modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    $scope.editData = function(data) {
        $scope.formData = {};
        $scope.isedit = true;
        $scope.formData = data;
        $('#PopupModal').modal({
            backdrop: 'static',
            keyboard: false
        });
    };

    $scope.deleteFolder = function(value) {
        $ngConfirm({
            title: 'Are you sure want to remove this folder?',
            content: 'All folders & files inside this folder will be deleted',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Yes',
                    btnClass: 'btn-red',
                    action: function() {
                        $scope.deleteFolderInfo(value.id);
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

    $scope.deleteFile = function(value) {
        $ngConfirm({
            title: 'Are you sure want to remove this file?',
            content: '',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Yes',
                    btnClass: 'btn-red',
                    action: function() {
                        $scope.deleteFileInfo(value.id);
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

    $scope.deleteFolderInfo = function(id){
        webServices.delete('history/folder/' + id).then(function(getData) {
            if (getData.status == 200) {
                $scope.getFolders();
            } else {
                $rootScope.$emit("showISError",getData);
            }
        });
    }

    $scope.deleteFileInfo = function(id){
        webServices.delete('history/folder/file/delete/' + id).then(function(getData) {
            if (getData.status == 200) {
                $scope.getFolders();
            } else {
                $rootScope.$emit("showISError",getData);
            }
        });
    }

    $scope.openParticipantModal = function(data){
        $scope.addedData = {};
        $scope.addedData.is_public  = data.is_public;
        $scope.addedData.item  = data.id;
        $scope.addedData.module  = 9;
        $scope.addedData.members = data.members;
        $scope.getUsers();
        $scope.filterData = {};
        $('#ParticipantModal').modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    $scope.updateParticipants = function(){
        $rootScope.loading = true;
        webServices.post('history/participants/assign', $scope.addedData).then(function(getData) {
            if (getData.status == 200) {
                $rootScope.$emit("showSuccessMsg", getData.data.message);
                $scope.getData();
                $scope.closeModal();
            }
        });
    }

    $scope.closeModal = function() {
        $scope.formData = {};
        $scope.addedData = {};
        $scope.isedit = false;
        $('#PopupModal').modal('hide');
        $('#ParticipantModal').modal('hide');
        $rootScope.modalerrors = [];
    }

    $scope.inputchange = function() {
        $scope.errorData = {};
        $scope.seterrorMsg();
    }

    $scope.pageChanged = function(newPage) {
        $scope.pageno = newPage;
        if (!$scope.pagedata[$scope.pageno]) {
            $scope.getResults();
        } else {
            $scope.folderlist = $scope.pagedata[$scope.pageno];
        }
    };
    
    $scope.getFolders = function(){
        webServices.get('history/folder/get/all').then(function(getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.folders = getData.data;
                console.log($scope.folders)
                $scope.getData();
            } else {
                //$rootScope.logout();
            }
        });
    }

    $scope.addremoveMember = function(status,id){
        if(status){
            $scope.addedData.members.push(id);
        }else{
            var index = $scope.addedData.members.indexOf(id);
            if (index !== -1) $scope.addedData.members.splice(index, 1);
        }
    }

    $scope.getUsers = function() {
        webServices.post('distributor/users/list/' + $rootScope.user.distributor, $scope.filterData).then(function(getData) {
            console.log(getData)
            if (getData.status == 200) {
                $scope.users = getData.data;
                angular.forEach($scope.users, function(member, no) {
                    if($scope.addedData.members.includes(member.id)){
                        member.is_added = 1;
                    }
                });
            }
        });
    };
    
    $scope.getFolders();

}]);