'use strict';
app.controller('ContactusCtrl', ['$scope', 'webServices', '$rootScope', '$http', '$filter',
    function($scope, webServices, $rootScope, $http, $filter) {
        $rootScope.loading = false;
        $scope.contacts = [{ category: "MEBIT", incharge: "MEBIT TEAM", email: "Ex_UP04_Org@exmail.toyota.co.jp" },
            { category: "Hydrogen", incharge: "Hiromasa Iwamoto", email: "hiromasa.iwamoto@toyota-me.ae" },
            { category: "Maas", incharge: "Taketo Nezu", email: "taketo_nezu@mail.toyota.co.jp" },
            { category: "SDGs", incharge: "Kazuma Shibata", email: "kazuma_shibata@mail.toyota.co.jp" },
            { category: "GR", incharge: "Ryosuke Oshida", email: "ryosuke_oshida@mail.toyota.co.jp" },
            { category: "PR", incharge: "Kenichiro Fujita", email: "kenichiro_fujita@mail.toyota.co.jp" },
            { category: "Training", incharge: "Kenichiro Fujita", email: "kenichiro_fujita@mail.toyota.co.jp" },
            { category: "History/Relationship", incharge: "Sumiyo Morishita", email: "sumiyo_morishita@mail.toyota.co.jp" }
        ];

        var obj = { page_name: 'contactus', page_component: 'common' };
        $rootScope.viewPage(obj);
    }
]);