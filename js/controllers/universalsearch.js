'use strict';
app.controller('UniversalSearchCtrl', ['$scope', '$state', 'webServices', '$rootScope', '$stateParams', '$sce',
    function($scope, $state, webServices, $rootScope, $stateParams, $sce) {

        $scope.searchresults = [];
        $scope.getData = function() {
            var obj = {
                keyword: $stateParams.keyword
            };
            webServices.post('universal/search', obj).then(function(getData) {
                $rootScope.loading = false;
                console.log(getData)
                if (getData.status == 200) {
                    $scope.searchresults = getData.data;
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.highlight = function(text) {
            if (!$stateParams.keyword) {
                return $sce.trustAsHtml(text);
            }
            return $sce.trustAsHtml(text.replace(new RegExp($stateParams.keyword, 'gi'), '<span class="highlightedText">$&</span>'));
        };

        $scope.gotoModule = function(module, type) {
            if (module == 1) {
                $state.go('app.events', { type: type });
            } else if (module == 2) {
                $state.go('app.tbps', { type: type });
            } else if (module == 3) {
                $state.go('app.kaizens', { type: type });
            } else if (module == 4) {
                $state.go('app.tbps', { type: 4 });
            } else if (module == 5) {
                $state.go('app.maas', { type: type });
            } else if (module == 6) {
                $state.go('app.grdashboard');
            } else if (module == 8) {
                $state.go('app.sdgs', { type: type });
            } else if (module == 10) {
                $state.go('app.newsroom');
            } else if (module == 11) {
                $state.go('app.oneandonly');
            } else if (module == 13) {
                $state.go('app.home');
            } else if (module == 16) {
                $state.go('app.tbps', { type: 6 });
            } else if (module == 20) {
                $state.go('app.sga');
            }
        }

        $scope.gotoItem = function(module, item) {
            if (module == 1) {
                $state.go('app.viewevent', {
                    id: item
                });
            } else if (module == 2) {
                $state.go('app.viewtbp', {
                    id: item
                });
            } else if (module == 3) {
                $state.go('app.viewkaizen', {
                    id: item
                });
            } else if (module == 4) {
                $state.go('app.viewtbp', {
                    id: item
                });
            } else if (module == 5) {
                $state.go('app.viewmaas', {
                    id: item
                });
            } else if (module == 6) {
                $state.go('app.viewgr', {
                    id: item
                });
            } else if (module == 8) {
                $state.go('app.viewsdgs', {
                    id: item
                });
            } else if (module == 10) {
                $state.go('app.viewnews', {
                    id: item
                });
            } else if (module == 11) {
                $state.go('app.viewoneandonly', {
                    id: item
                });
            } else if (module == 13) {
                $state.go('app.home');
            } else if (module == 16) {
                $state.go('app.trainerinfo', {
                    id: item
                });
            } else if (module == 20) {
                $state.go('app.sga');
            }
        }

        $scope.getData();

        var obj = { page_name: 'universal_search', page_component: 'common' };
        $rootScope.viewPage(obj);

    }
]);