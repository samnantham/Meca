'use strict';
app.controller('ContactusCtrl', ['$scope', 'webServices', '$rootScope', '$http', '$filter',
    function($scope, webServices, $rootScope, $http, $filter) {
        $rootScope.loading = false;
        $scope.contacts = [{ category:"MEBIT", incharge: "MEBIT TEAM", email :"up-mebit-team@mail.toyota.co.jp"},
            { category:"Maas", incharge: "Yuki Ikeda", email :"yuki_ikeda_ad@mail.toyota.co.jp"},
            { category:"SDGs", incharge: "Satoshi Yamaguchi", email :"satoshi_yamaguchi_ae@mail.toyota.co.jp"},
            { category:"GR", incharge: "Ryosuke Oshida", email :"ryosuke_oshida@mail.toyota.co.jp"},
            { category:"History/Relationship", incharge: "Takashi Hatano", email:"takashi_hatano@mail.toyota.co.jp"},
            {category:"History/Relationship", incharge: "Sumiyo Morishita", email:"sumiyo_morishita@mail.toyota.co.jp"}
        ];
    }
]);