'use strict';
app.controller('ReminderCtrl', ['$scope', '$state', 'webServices', '$rootScope', 'authServices', '$timeout', '$sessionStorage', 'NgMap', '$http', '$filter', '$sce', '$window', '$ngConfirm',
    function ($scope, $state, webServices, $rootScope, authServices, $timeout, $sessionStorage, NgMap, $http, $filter, $sce, $window, $ngConfirm) {

        $scope.reminders = [];
        $scope.filterData = {};
        $scope.filterData.status = 0;
        
        $scope.changeTab = function(status){
            console.log(status)
            if($scope.filterData.status != status){
                $scope.filterData.status = !$scope.filterData.status;
                $scope.getData();
            }
        }

        $scope.updateReminder = function (reminder) {
            $ngConfirm({
                title: 'Are you sure want to update?',
                content: '',
                type: 'success',
                typeAnimated: true,
                buttons: {
                    tryAgain: {
                        text: 'Yes',
                        btnClass: 'btn-red',
                        action: function() {
                            $scope.updateReminderData(reminder);
                        }
                    },
                    cancel: {
                        text: 'No',
                        action: function () {
                            reminder.status =  1 - reminder.status;
                        }
                    }
                }
            });
           
        }

        $scope.updateReminderData = function(reminder){
            var obj = {};
            obj.item = reminder.item;
            obj.module = reminder.module;
            obj.status = reminder.status;
            obj.due_date = reminder.due_date;
            webServices.post('reminder/update', obj).then(function (getData) {
                $scope.getData();
            });
        }

        $scope.getData = function () {
            webServices.post('reminders',$scope.filterData).then(function (getData) {
                $rootScope.loading = false;
                if (getData.status == 200) {
                    $scope.reminders = getData.data;
                    console.log($scope.reminders);
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.getData();

    }
]);