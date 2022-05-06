'use strict';

app.controller('HistoryFolderController', ['$scope', '$http', '$state', 'authServices', '$stateParams', 'webServices', 'utility', '$rootScope', '$timeout', '$filter', '$ngConfirm', 'toaster', function($scope, $http, $state, authServices, $stateParams, webServices, utility, $rootScope, $timeout, $filter, $ngConfirm, toaster) {

    $scope.folderlist = [];
    $scope.folders = [];
    $rootScope.loading = true;
    $scope.filterData = {};
    $scope.errorData = {};

    $scope.seterrorMsg = function() {
        $scope.errorData.folder_name_errorMsg = 'Enter Folder Name';
    }

    $scope.setservererrorMsg = function(errors) {
        $scope.errorData = {};
        angular.forEach(errors, function(error, no) {
            $scope.errorData[no.replace('new', '') + '_errorMsg'] = error[0];
            $scope.errorData[no.replace('new', '') + '_error'] = true;
        });
    }

    $scope.addData = function(form) {
        $scope.seterrorMsg();
        if (form.$valid) {
            $rootScope.loading = true;
            if ($scope.isedit) {
                webServices.post('history/folder/' + $scope.formData.id, $scope.formData).then(function(getData) {
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
            } else {
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

    $scope.getDatas = function() {
        webServices.post('history/list/folder', $scope.filterData).then(function(getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.folderlist = getData.data;
                console.log($scope.folderlist)
            } else {
                //$rootScope.logout();
            }
        });
    };

    $scope.openaddModal = function() {
        $scope.inputchange();
        $scope.formData = {};
        $scope.formData.has_parent = 0;
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

    $scope.deleteData = function(value) {
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
                        $scope.deleteFolder(value.id);
                    }
                },
                cancel: {
                    text: 'No',
                    action: function() {}
                }
            }
        });
    }

    $scope.deleteFolder = function(id) {
        webServices.delete('history/folder/' + id).then(function(getData) {
            if (getData.status == 200) {
                $scope.getFolders();
            } else {
                $rootScope.$emit("showISError", getData);
            }
        });
    }

    $scope.closeModal = function() {
        $scope.formData = {};
        $scope.isedit = false;
        $('#PopupModal').modal('hide');
        $rootScope.modalerrors = [];
    }

    $scope.inputchange = function() {
        $scope.errorData = {};
        $scope.seterrorMsg();
    }

    $scope.getFolders = function() {
        webServices.get('history/folder/get/all').then(function(getData) {
            $rootScope.loading = false;
            if (getData.status == 200) {
                $scope.folders = getData.data;
                console.log($scope.folders)
                $scope.getDatas();
            } else {
                //$rootScope.logout();
            }
        });
    }

    $scope.openParticipantModal = function(data) {
        $scope.addedData = {};
        $scope.addedData.is_public = data.is_public;
        $scope.addedData.item = data.id;
        $scope.addedData.module = 9;
        $scope.addedData.members = data.members;
        $scope.getUsers();
        $scope.filterData = {};
        $('#ParticipantModal').modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    $scope.updateParticipants = function() {
        $rootScope.loading = true;
        webServices.post('history/participants/assign', $scope.addedData).then(function(getData) {
            if (getData.status == 200) {
                $rootScope.$emit("showSuccessMsg", getData.data.message);
                $scope.getFolders();
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

    $scope.addremoveMember = function(status, id) {
        if (status) {
            $scope.addedData.members.push(id);
        } else {
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
                    if ($scope.addedData.members.includes(member.id)) {
                        member.is_added = 1;
                    }
                });
            }
        });
    };

    $scope.getFolders();

    var obj = { page_name: 'folders', page_component: 'history', module: 0, item: 0 };
    $rootScope.viewPage(obj);

}]);