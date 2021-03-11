'use strict';
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
            function ($stateProvider, $urlRouterProvider, $locationProvider, JQ_CONFIG, MODULE_CONFIG) {

                var layout = "tpl/app.html";

                $urlRouterProvider.otherwise('/signin');
                if ((window.location.href.substr(window.location.href.lastIndexOf('/') + 1)) == '') {
                    window.location.href = 'signin';
                }

                $locationProvider.html5Mode(true);

                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/',
                        templateUrl: layout
                    })

                    //DASHBOARD

                    .state('app.home', {
                        url: 'home',
                        templateUrl: 'tpl/home.html',
                        resolve: load(['moment', 'fullcalendar', 'ui.calendar', 'js/controllers/home.js'])
                    })

                    //MEBIT Events

                    .state('app.mebitdashboard', {
                        url: 'mebit/dashboard',
                        templateUrl: 'tpl/mebit/dashboard.html',
                        resolve: load(['moment', 'fullcalendar', 'ui.calendar', 'js/controllers/home.js'])
                    })

                    .state('app.events', {
                        url: 'mebit/event/list/:type?',
                        templateUrl: 'tpl/mebit/list.html',
                        resolve: load(['js/controllers/mebit/list.js'])
                    })

                    .state('app.viewevent', {
                        url: 'event/info/:id',
                        templateUrl: 'tpl/mebit/view.html',
                        resolve: load(['js/controllers/mebit/view.js'])
                    })

                    .state('app.editevent', {
                        url: 'event/edit/:id',
                        templateUrl: 'tpl/mebit/edit.html',
                        resolve: load(['js/controllers/mebit/edit.js'])
                    })

                    //TBP
                    .state('app.tbps', {
                        url: 'tbps/list/:type?',
                        templateUrl: 'tpl/tbp/list.html',
                        resolve: load(['js/controllers/tbp/list.js'])
                    })

                    .state('app.viewtbp', {
                        url: 'tbp/info/:id',
                        templateUrl: 'tpl/tbp/view.html',
                        resolve: load(['js/controllers/tbp/view.js'])
                    })

                    .state('app.viewpdca', {
                        url: 'pdca/info/:id',
                        templateUrl: 'tpl/tbp/viewpdca.html',
                        resolve: load(['js/controllers/tbp/viewpdca.js'])
                    })

                    .state('app.pdcainfo', {
                        url: 'pdca/view/:id',
                        templateUrl: 'tpl/pdca/view.html',
                        resolve: load(['js/controllers/pdca/view.js'])
                    })

                    //Kaizen
                    .state('app.kaizens', {
                        url: 'kaizen/list/:type/:tmc?',
                        templateUrl: 'tpl/kaizen/list.html',
                        resolve: load(['js/controllers/kaizen/list.js'])
                    })

                    .state('app.viewkaizen', {
                        url: 'kaizen/view/:id',
                        templateUrl: 'tpl/kaizen/view.html',
                        resolve: load(['js/controllers/kaizen/view.js'])
                    })

                    //Maas
                    .state('app.maas', {
                        url: 'maas/list/:type?',
                        templateUrl: 'tpl/maas/list.html',
                        resolve: load(['js/controllers/maas/list.js'])
                    })

                    .state('app.viewmaas', {
                        url: 'maas/view/:id',
                        templateUrl: 'tpl/maas/view.html',
                        resolve: load(['js/controllers/maas/view.js'])
                    })

                    //SDGs

                    .state('app.sdgsdashboard', {
                        url: 'sdgs/dashboard',
                        templateUrl: 'tpl/sdgs/dashboard.html',
                        resolve: load(['moment', 'fullcalendar', 'ui.calendar', 'js/controllers/sdgs/dashboard.js'])
                    })


                    .state('app.sdgs', {
                        url: 'sdgs/list/:type?',
                        templateUrl: 'tpl/sdgs/list.html',
                        resolve: load(['js/controllers/sdgs/list.js'])
                    })

                    .state('app.viewsdgs', {
                        url: 'sdgs/view/:id',
                        templateUrl: 'tpl/sdgs/view.html',
                        resolve: load(['js/controllers/sdgs/view.js'])
                    })

                    //GR
                    .state('app.grdashboard', {
                        url: 'gr/dashboard',
                        templateUrl: 'tpl/gr/dashboard.html',
                        resolve: load(['moment', 'fullcalendar', 'ui.calendar', 'js/controllers/gr/dashboard.js'])
                    })


                    .state('app.viewgr', {
                        url: 'gr/view/:id',
                        templateUrl: 'tpl/gr/view.html',
                        resolve: load(['js/controllers/gr/view.js'])
                    })

                    .state('app.grcontacts', {
                        url: 'gr/contacts',
                        templateUrl: 'tpl/gr/contacts.html',
                        resolve: load(['js/controllers/gr/contacts.js'])
                    })

                    //Hydrogen
                    .state('app.hydrogen', {
                        url: 'hydrogen/list/:type?',
                        templateUrl: 'tpl/hydrogen/list.html',
                        resolve: load(['js/controllers/hydrogen/list.js'])
                    })

                    .state('app.viewhydrogen', {
                        url: 'hydrogen/view/:id',
                        templateUrl: 'tpl/hydrogen/view.html',
                        resolve: load(['js/controllers/hydrogen/view.js'])
                    })

                    //NewsRoom
                    .state('app.newsroom', {
                        url: 'newsroom',
                        templateUrl: 'tpl/newsroom/list.html',
                        resolve: load(['js/controllers/newsroom/list.js'])
                    })

                    .state('app.viewnews', {
                        url: 'news/view/:id',
                        templateUrl: 'tpl/newsroom/view.html',
                        resolve: load(['js/controllers/newsroom/view.js'])
                    })

                    .state('app.searchnews', {
                        url: 'news/search/:tag',
                        templateUrl: 'tpl/newsroom/search.html',
                        resolve: load(['js/controllers/newsroom/search.js'])
                    })

                    //Profile Settings
                    .state('app.profile', {
                        url: 'myprofile',
                        templateUrl: 'tpl/profile/myprofile.html',
                        resolve: load(['js/controllers/profile/myprofile.js'])
                    })

                    .state('app.changepassword', {
                        url: 'changepassword',
                        templateUrl: 'tpl/profile/changepassword.html',
                        resolve: load(['js/controllers/profile/changepassword.js'])
                    })

                    .state('app.notification', {
                        url: 'notifications',
                        templateUrl: 'tpl/profile/notification.html',
                        resolve: load(['js/controllers/profile/notification.js'])
                    })

                    .state('app.chats', {
                        url: 'chats',
                        templateUrl: 'tpl/profile/chats.html',
                        resolve: load(['js/controllers/profile/chats.js'])
                    })

                    .state('app.calendar', {
                        url: 'calendar',
                        templateUrl: 'tpl/calendar.html',
                        resolve: load(['moment', 'fullcalendar', 'ui.calendar', 'js/controllers/calendar.js'])
                    })

                    .state('app.contactus', {
                        url: 'support',
                        templateUrl: 'tpl/contactus.html',
                        resolve: load(['js/controllers/contactus.js'])
                    })

                    .state('app.orgdocs', {
                        url: 'mebit/organization/documents',
                        templateUrl: 'tpl/organizationdocs.html',
                        resolve: load(['js/controllers/contactus.js'])
                    })

                    .state('app.404', {
                        url: '404',
                        templateUrl: 'tpl/page_404.html'
                    })

                    //History

                    .state('app.folders', {
                        url: 'history/folders',
                        templateUrl: 'tpl/history/folder/list.html',
                        resolve: load(['js/controllers/history/folder/list.js'])
                    })

                    .state('app.subfolders', {
                        url: 'history/subfolders/:id',
                        templateUrl: 'tpl/history/subfolder/list.html',
                        resolve: load(['js/controllers/history/subfolder/list.js'])
                    })

                    // others
                    .state('access', {
                        url: '/',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('access.signin', {
                        url: 'signin',
                        templateUrl: 'tpl/auth/signin.html',
                        resolve: load(['js/controllers/auth/signin.js'])
                    })

                    .state('access.signup', {
                        url: 'signup',
                        templateUrl: 'tpl/auth/signup.html',
                        resolve: load(['js/controllers/auth/signup.js'])
                    })

                    .state('access.forgotpwd', {
                        url: 'forgotpwd',
                        templateUrl: 'tpl/auth/forgotpwd.html',
                        resolve: load(['js/controllers/auth/forgotpwd.js'])
                    })

                    .state('access.resetpwd', {
                        url: 'resetpwd/:token',
                        templateUrl: 'tpl/auth/resetpwd.html',
                        resolve: load(['js/controllers/auth/resetpwd.js'])
                    });


                function load(srcs, callback) {
                    return {
                        deps: ['$ocLazyLoad', '$q',
                            function ($ocLazyLoad, $q) {
                                var deferred = $q.defer();
                                var promise = false;
                                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                                if (!promise) {
                                    promise = deferred.promise;
                                }
                                angular.forEach(srcs, function (src) {
                                    promise = promise.then(function () {
                                        if (JQ_CONFIG[src]) {
                                            return $ocLazyLoad.load(JQ_CONFIG[src]);
                                        }
                                        angular.forEach(MODULE_CONFIG, function (module) {
                                            if (module.name == src) {
                                                name = module.name;
                                            } else {
                                                name = src;
                                            }
                                        });
                                        return $ocLazyLoad.load(name);
                                    });
                                });
                                deferred.resolve();
                                return callback ? promise.then(function () { return callback(); }) : promise;
                            }]
                    }
                }


            }
        ]
    );
