'use strict';

/* Controllers */

angular.module('app')
.controller('AppCtrl', ['$scope', '$window', '$timeout', '$rootScope', 'authServices', '$sessionStorage', '$state', 'toaster', 'webServices', '$location', 'isMobile', '$sce', 'Lightbox', '$modal', '$filter',
    function($scope, $window, $timeout, $rootScope, authServices, $sessionStorage, $state, toaster, webServices, $location, isMobile, $sce, Lightbox, $modal, $filter, $modalInstance) {

            // config
            $scope.app = {
                name: 'Toyota Distributor',
                version: '1.0',
                // for chart colors
                color: {
                    primary: '#7266ba',
                    info: '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger: '#f05050',
                    light: '#e8eff0',
                    dark: '#3a3f51',
                    black: '#000000'
                },
                settings: {
                    themeID: 1,
                    navbarHeaderColor: 'bg-warning',
                    navbarCollapseColor: 'bg-white-only',
                    asideColor: 'bg-warning',
                    headerFixed: true,
                    asideFixed: true,
                    asideFolded: true,
                    asideDock: false,
                    container: false
                }
            }

            $rootScope.pickerdateOptions = {
                formatYear: 'yyyy',
                startingDay: 0,
                class: 'datepicker',
                showWeeks: false,
                minMode: 'day'
            };

            $rootScope.validvideo = function(url) {
                var status = false;
                if (url.includes('youtu')) {
                    status = true;
                } else if (url.includes('vimeo')) {
                    status = true;
                }
                return status;
            }

            $rootScope.validURL = function(url) {
                var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

                return !!pattern.test(url);
            }

            $rootScope.showCover = function(file){
                $rootScope.images = [];
                var obj = {};
                obj.isVideo = 0;
                obj.url = $rootScope.IMGURL + file;
                $rootScope.images.push(obj);
                $rootScope.openLightbox($rootScope.images,0);
            }

            $rootScope.openFiles = function(key,files) {
                $rootScope.images = [];
                
                angular.forEach( files, function(file, no) {
                    var obj = {};
                    obj.type = file.filetype;
                    obj.url = $rootScope.IMGURL + file.file;
                    if(file.filetype == 'image'){
                        $rootScope.images.push(obj);
                    }
                });

                $rootScope.openLightbox($rootScope.images,key);
            };

            $rootScope.opendemoVideo = function(url) {
                var files = [];
                var obj = {};
                obj.type = 'video';
                obj.url = url;
                console.log(obj)
                files.push(obj);
                $rootScope.openLightbox(files,0);
            };

            $rootScope.openLightbox = function(files,key){
                Lightbox.openModal(files, key);
            }

            $rootScope.openPDF = function (link) {
                $rootScope.doclink = $sce.trustAsResourceUrl(link);
                $('#PDFModal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }

            $rootScope.snowfalling = false;
            $rootScope.initialsnowfalling = false;
            $rootScope.height_to_reduce = 100;
            $rootScope.loadingMsg = 'Loading please Wait....';
            $rootScope.year = new Date().getFullYear();
            $rootScope.IMGURL = angular.copy(app.imageurl);
            $rootScope.imgextensions = angular.copy(app.imgextensions);
            $rootScope.pagelimits = angular.copy(app.pagelimits);
            $rootScope.noauthroutes = angular.copy(app.noauthroutes);
            $rootScope.isMobile = isMobile.phone;
            $rootScope.latlong = angular.copy(app.constantlatlong);
            $rootScope.maxUploadsize = angular.copy(app.maxUploadsize);
            $rootScope.validextensions = angular.copy(app.validextensions);
            $rootScope.maxUploadFiles = angular.copy(app.maxUploadFiles);
            $rootScope.validfileextensions = angular.copy(app.validfileextensions);
            $rootScope.tbptypes = angular.copy(app.tbptypes);
            $rootScope.kaizentypes = angular.copy(app.kaizentypes);
            $rootScope.maastypes = angular.copy(app.maastypes);
            $rootScope.hydrogentypes = angular.copy(app.hydrogentypes);
            $rootScope.sdgstypes = angular.copy(app.sdgstypes);
            $rootScope.tbp_upload_types = angular.copy(app.tbp_upload_types);
            $rootScope.pdca_upload_types = angular.copy(app.pdca_upload_types);
            $rootScope.organizationdocs = angular.copy(app.organizationdocs);
            $rootScope.eventtypes = angular.copy(app.eventtypes);
            $rootScope.newstags = angular.copy(app.newstags);
            $rootScope.newscategories = angular.copy(app.newscategories);
            $rootScope.newsvideotypes = angular.copy(app.newsvideotypes);
            $rootScope.dummyarray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            $rootScope.mentor_experience_years = angular.copy(app.mentor_experience_years);
            $rootScope.mentor_batch_medals = angular.copy(app.mentor_batch_medals);
            $rootScope.mentor_countries = angular.copy(app.mentor_countries);
            $rootScope.organizationList = angular.copy(app.organizationList);
            $rootScope.ismodalopen = false;
            $rootScope.isEdititem = false;
            $rootScope.snowItems = [
                {img:'img/single/Icon1.png' ,isMain: 1},
                {img:'img/single/Icon2.png' ,isMain: 1},
                {img:'img/single/Icon3.png' ,isMain: 1},
                {img:'img/single/Icon4.png' ,isMain: 1},
                {img:'img/single/Icon5.png' ,isMain: 1},
                {img:'img/single/Icon6.png' ,isMain: 1},
                // {img:'img/single/Icon7.png' ,isMain: 1},
                // {img:'img/single/Icon8.png' ,isMain: 1},
                // {img:'img/single/Icon9.png' ,isMain: 1},
                // {img:'img/single/Icon10.png' ,isMain: 1},
                // {img:'img/single/Icon11.png' ,isMain: 1},
                // {img:'img/single/Icon12.png' ,isMain: 1},
                {img:'img/single/Blue1.png' ,isMain: 0},
                {img:'img/single/Blue2.png' ,isMain: 0},
                // {img:'img/single/Blue3.png' ,isMain: 0},
                // {img:'img/single/Green1.png' ,isMain: 0},
                {img:'img/single/Green2.png' ,isMain: 0},
                {img:'img/single/Green3.png' ,isMain: 0},
                {img:'img/single/Red1.png' ,isMain: 0},
                {img:'img/single/Red2.png' ,isMain: 0},
                // {img:'img/single/Red3.png' ,isMain: 0}
            ];

            $rootScope.scrollconfig = {
                autoHideScrollbar: true,
                theme: 'dark',
                advanced: {
                    updateOnContentResize: true
                },
                setHeight: 500,
                scrollInertia: 400
            }

            $rootScope.screenHeight = window.innerHeight;

            $rootScope.getMonthFromString = function(mon) {
                return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
            }

            $rootScope.fixHelper = function(e, ui) {
                ui.children().each(function() {
                    $(this).width($(this).width());
                });
                return ui;
            };

            $rootScope.getfileCounts = function(files, type) {
                return files.filter((obj) => obj.filetype === type).length;
            }

            $rootScope.closeLikeModal = function (module){
                $('#ModuleLikeMembersModal').modal('hide');
            }

            $rootScope.closePDFModal = function (module){
                $('#PDFModal').modal('hide');
            }

            $rootScope.showLikedMembers = function(members){
                $rootScope.likers = [];
                $rootScope.likers = members;
                $('#ModuleLikeMembersModal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }

            $rootScope.openDoc = function(URL){
                var base = window.location.origin + '/';
                window.open(base + URL, '_blank');
            }

            $rootScope.splitFiles = function(files) {
                var splittedfiles = {};
                splittedfiles.images = [];
                splittedfiles.videos = [];
                angular.forEach(files, function(file, no) {
                    if(file.filetype == 'image'){
                        splittedfiles.images.push(file);
                    }else if(file.filetype == 'video'){
                        splittedfiles.videos.push(file);
                    }
                });

                return splittedfiles;
                return files.filter((obj) => obj.filetype === type).length;
            }

            $rootScope.ModalOpen = function(modalname, controllername) {
                $rootScope.ismodalopen = true;
                $rootScope.openModalPopup(modalname, controllername);
            }

            $rootScope.openModalPopup = function(modalfile, modalcontroller) {
                $rootScope.ismodalopen = true;
                var dialogInst = $modal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: 'tpl/modals/' + modalfile + '.html',
                    controller: modalcontroller,
                    controllerAs: '$ctrl',
                    size: 'lg',
                    windowClass: modalfile + ' CommonModal',
                });
            }

            
            $rootScope.closeModalPopup = function() {
                $rootScope.formData = {};
                $rootScope.ismodalopen = false;
                $rootScope.isEdititem = false;
                $('.modal-content > .ng-scope').each(function() {
                    $(this).scope().$dismiss();
                });
            }

            $rootScope.getVideoUrl = function(url) {
                return $sce.trustAsResourceUrl($rootScope.IMGURL + url);
            };

            $scope.pop = function() {
                toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
            };

            $rootScope.clock = "loading clock...";
            $rootScope.tickInterval = 1000;

            var tick = function() {
                $rootScope.clock = Date.now()
                $timeout(tick, $rootScope.tickInterval);
            }

            $rootScope.convertDate = function(date) {
                return new Date(moment(date));
                //return Date.parse(date);
            }

            $timeout(tick, $scope.tickInterval);

            $rootScope.logout = function() {
                authServices.logout();
            }

            $rootScope.getUserInfo = function() {
                webServices.get('getauthenticateduser').then(function(getData) {
                    if (getData.status == 200) {
                        $rootScope.user = $sessionStorage.user = getData.data;
                        localStorage.user = JSON.stringify($sessionStorage.user);
                        $state.go('app.dashboard');
                    } else {
                        $rootScope.logout();
                    }
                });
            }

            $rootScope.goback = function() {
                history.back();
            }

            $rootScope.viewModuleItem = function(module,item){
                var obj = {};
                obj.module = module;
                obj.item = item;
                webServices.post('view',obj).then(function(getData) {
                    if (getData.status == 200) {
                    } else {
                        $rootScope.$emit("showISError",getData);
                    }
                });
            }

            $rootScope.moveTop = function() {
                $('html, body').animate({
                    scrollTop: 10
                }, 'slow', function() {});
            }

            $rootScope.setSlides = function() {
                /*if (!isMobile.phone) {
                    if (($rootScope.screenWidth >= 960) && ($rootScope.screenWidth < 1368)) {
                        $rootScope.scrollslides = 3;
                        $rootScope.slidecount = 3;
                    } else if (($rootScope.screenWidth >= 1370) && ($rootScope.screenWidth < 1602)) {
                        $rootScope.scrollslides = 4;
                        $rootScope.slidecount = 4;
                    } else if (($rootScope.screenWidth >= 1603) && ($rootScope.screenWidth < 1924)) {
                        $rootScope.scrollslides = 5;
                        $rootScope.slidecount = 5;
                    } else if (($rootScope.screenWidth >= 1925) && ($rootScope.screenWidth < 3000)) {
                        $rootScope.scrollslides = 6;
                        $rootScope.slidecount = 6;
                    } else {
                        $rootScope.scrollslides = 3;
                        $rootScope.slidecount = 3;
                    }
                } else {
                    $rootScope.slidecount = 1;
                    $rootScope.scrollslides = 1;
                }*/
                $rootScope.slidecount = 1;
                $rootScope.scrollslides = 1;
            }

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                $rootScope.hideSnowfall();
                $rootScope.loading = true;
                $rootScope.currentState = toState.name;
                console.log($rootScope.currentState)
                $rootScope.previousState = fromState.name;
                $rootScope.screenWidth = window.innerWidth * window.devicePixelRatio;
                $rootScope.screenHeight = window.innerHeight;
                $rootScope.setSlides();
                if ($rootScope.noauthroutes.includes($rootScope.currentState)) {
                    if (authServices.isLoggedIn()) {
                        $rootScope.getUserInfo();
                        $timeout(function() {
                            $state.go('app.home');
                        }, 500);
                    }
                } else {
                    $rootScope.getUserInfo();
                    if (!authServices.isLoggedIn()) {
                        $timeout(function() {
                            $state.go('access.signin');
                        }, 500);
                    }
                }

            });

            $rootScope.$on("showErrors", function(event, errors) {
                angular.forEach(errors, function(data, no) {
                    $scope.toaster = {
                        type: 'error',
                        title: 'Oops',
                        text: data
                    };
                    $scope.pop();
                });
            });

            $rootScope.$on("showSuccessMsg", function(event, msg) {
                $scope.toaster = {
                    type: 'success',
                    title: 'Success',
                    text: msg
                };
                $scope.pop();
            });

            $rootScope.$on("showErrorMsg", function(event, msg) {
                $scope.toaster = {
                    type: 'error',
                    title: 'Oops',
                    text: msg
                };
                $scope.pop();
            });

            $rootScope.setUserInfo = function() {
                if (authServices.isLoggedIn()) {
                    $rootScope.getUserInfo();
                } else {
                    authServices.logout();
                }
            }

            $rootScope.$on("setSliderConfig", function(event) {

                $rootScope.slickConfig = {
                    enabled: true,
                    autoplay: true,
                    draggable: true,
                    slidesToShow: $rootScope.slidecount,
                    slidesToScroll: $rootScope.scrollslides,
                    arrows: true,
                    prevArrow: "<img class='slick-prev slick-arrow' src='img/sliderL.png'>",
                    nextArrow: "<img class='slick-next slick-arrow' src='img/sliderR.png'>",
                    method: {},
                    dots: false,
                    infinite: true
                };
            });

            $rootScope.getUserInfo = function() {
                $rootScope.errors = [];
                webServices.get('getauthenticateduser').then(function(getData) {
                    if (getData.status == 200) {
                        $rootScope.updateView();
                        $rootScope.user = $sessionStorage.user = getData.data;
                        localStorage.user = JSON.stringify($sessionStorage.user);
                    } else if (getData.status == 401) {
                        $rootScope.errors.push(getData.data.message);
                        $rootScope.$emit("showerrors", $rootScope.errors);
                        $rootScope.logout();
                    } else {
                        $rootScope.logout();
                    }
                });
            }

            $rootScope.updateView = function(){
                var obj = {};
                obj.date = $filter('date')(new Date(), 'yyyy-MM-dd');
                webServices.post('viewer/info/update',obj).then(function(getData) {
                    console.log(getData)
                    if (getData.status == 200) {
                    }
                });
            }

            $rootScope.$on("showISError", function(event, errors) {
                $scope.toaster = {
                    type: 'error',
                    title: 'Oops',
                    text: 'Some internal server error.. Please check...'
                };
                $scope.pop();
            });

            $rootScope.checkPermission = function() {
                if ($rootScope.user.role == 2) {
                    if (!$rootScope.subuserviews.includes($rootScope.stateurl)) {
                        $state.go('app.404');
                    }
                }
            }

            
            $rootScope.showSnowfall = function(){
                angular.forEach( $rootScope.snowItems, function(item, no) {
                    if(!item.isMain){
                        var minSize = 5;
                        var maxSize = 10;
                    }else{
                        var minSize = 10;
                        var maxSize = 48;
                    }
                    $(document).snowfall({image :item.img, minSize: minSize, maxSize:maxSize,flakeCount: 6, minSpeed : 1, maxSpeed: 3});  
                });
                
            }

            $rootScope.hideSnowfall = function(){
                $(document).snowfall('clear');
            }

            $rootScope.$watch("snowfalling", function() {
                console.log($rootScope.snowfalling)
                console.log("**** reference checkers snow falling ****")
                if($rootScope.snowfalling){
                    $timeout(function() {
                        $rootScope.snowfalling = false;
                        $rootScope.hideSnowfall();
                    }, 10000);
                }
              });

              $rootScope.showhidesnow = function(){
                if(!$rootScope.snowfalling){
                    $rootScope.snowfalling = true;
                    $rootScope.showSnowfall();
                }else{
                    $rootScope.snowfalling = false;
                    $rootScope.hideSnowfall();
                }
                
              }  
        }
]);