'use strict';
app.controller('GRContactusCtrl', ['$scope', 'webServices', '$rootScope', '$http', '$filter',
    function($scope, webServices, $rootScope, $http, $filter) {
        $rootScope.loading = true;
        $scope.contacts = [];
        $scope.getContacts = function(month,year) {
            webServices.get('gr/contacts/list').then(function(getData) {
                if (getData.status == 200) {
                    $rootScope.loading = false;
                    $scope.contacts = getData.data;
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.getContacts();
    }
]);