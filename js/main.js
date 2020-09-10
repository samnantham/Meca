'use strict';

/* Controllers */

angular.module('app')
.controller('AppCtrl', ['$scope', '$window', '$timeout', '$rootScope', 'authServices', '$sessionStorage', '$state', 'toaster', 'webServices', '$location', 'isMobile', '$sce', 'Lightbox',
    function($scope, $window, $timeout, $rootScope, authServices, $sessionStorage, $state, toaster, webServices, $location, isMobile, $sce, Lightbox) {

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

            $rootScope.openLightbox = function(files,key){
                Lightbox.openModal(files, key);
            }

            console.log(window.location.href.split('#'))

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
            $rootScope.tbp_upload_types = angular.copy(app.tbp_upload_types);
            $rootScope.pdca_upload_types = angular.copy(app.pdca_upload_types);
            $rootScope.organizationdocs = angular.copy(app.organizationdocs);
            $rootScope.eventtypes = angular.copy(app.eventtypes);
            $rootScope.dummyarray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

            $rootScope.openDoc = function(URL){
                var base = window.location.href.split('#');
                window.open(base[0] + URL, '_blank');
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

            $rootScope.openheaderaddModal = function(){
                $scope.inputchange();
                $scope.formData = {};
                $scope.documentData = {};
                $scope.formData.type = 1;
                $scope.formData.kaizen_files = [];
                $scope.formData.video_links = [];
                $scope.formData.kaizen_documents = [];
                $scope.formData.document_links = [];
                $('#HeaderModal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }

            $scope.inputchange = function() {
                $scope.errorData = {};
                $scope.seterrorMsg();
            }

            $scope.seterrorMsg = function(){
                $scope.errorData.title_errorMsg = 'Enter Title';
                $scope.errorData.description_errorMsg = 'Please add kaizen Study';
            }

            $scope.removeVideoLink = function(key){
                $scope.formData.video_links.splice(key,1);
            }

            $scope.uploadvideo = function() {
                if (($rootScope.validURL($scope.videoData.link))&&($rootScope.validvideo($scope.videoData.link))) {

                    if($scope.formData.video_links.some(videolink => videolink.link === $scope.videoData.link)){
                        $rootScope.$emit("showErrorMsg", 'Video already added');
                    } else{
                        var newobj = {};
                        newobj.link = $scope.videoData.link;
                        newobj.title = 'video link' + ($scope.formData.video_links.length + 1);
                        newobj.info = '';
                        $scope.formData.video_links.push(newobj);
                        $scope.videoData = {};
                    }
                }else{
                    $rootScope.$emit("showErrorMsg", 'Please upload valid video url.');
                    $scope.videoData.link = '';
                }  
            }

            $scope.removeDocumentLink = function(key){
                $scope.formData.document_links.splice(key,1);
            }

            $scope.uploaddocumentlink = function() {
                if ($rootScope.validURL($scope.documentData.link)) {
                    if($scope.formData.document_links.some(documentlink => documentlink.link === $scope.documentData.link)){
                        $rootScope.$emit("showErrorMsg", 'Document already added');
                    } else{
                        var newobj = {};
                        newobj.link = $scope.documentData.link;
                        newobj.name = 'External link' + ($scope.formData.document_links.length + 1);
                        newobj.info = '';
                        $scope.formData.document_links.push(newobj);
                        $scope.documentData = {};
                    }
                }else{
                    $rootScope.$emit("showErrorMsg", 'Please enter a valid document link.');
                    $scope.documentData.link = '';
                }  
            }

            $scope.setservererrorMsg = function(errors){
                $scope.errorData = {};
                angular.forEach(errors, function(error, no) {
                    $scope.errorData[no.replace('new','')+'_errorMsg'] = error[0];
                    $scope.errorData[no.replace('new','')+'_error'] = true;
                });
            }

            $scope.uploadCover = function(files) {
                $scope.errors = [];
                if (files && files.length) {
                    var extn = files[0].name.split(".").pop();
                    if ($rootScope.imgextensions.includes(extn.toLowerCase())) {
                        if (files[0].size <= $rootScope.maxUploadsize) {
                            $scope.formData.newcover = files[0];
                        } else {
                            $scope.errors.push(files[0].name + ' size exceeds 2MB.')
                        }
                    } else {
                        $scope.errors.push(files[0].name + ' format unsupported.');
                    }
                }
                if ($scope.errors.length > 0) {
                    $rootScope.$emit("showErrors", $scope.errors);
                }
            }

            $scope.addData = function(form) {
                $scope.seterrorMsg();
                if (form.$valid) {
                    $rootScope.loading = true;
                    webServices.upload('kaizen', $scope.formData).then(function(getData) {
                        $rootScope.loading = false;
                        if (getData.status == 200) {
                            $scope.closeModal();
                            $rootScope.$emit("showSuccessMsg", getData.data.message);
                        } else if (getData.status == 401) {
                            $scope.setservererrorMsg(getData.data.message);
                            $rootScope.loading = false;
                        } else {
                            $rootScope.$emit("showISError", getData);
                        }
                    });
                } else {
                    if (!form.title.$valid) {
                        $scope.errorData.title_error = true;
                    }if (!form.description.$valid) {
                        $scope.errorData.description_error = true;
                    }
                    $rootScope.$emit("showErrors", $scope.errors);
                }
            }

            $scope.addkaizenfiles = function(files) {
                $scope.errors = [];
                if ($scope.formData.kaizen_files.length < $rootScope.maxUploadFiles) {
                    if (files && files.length) {
                        if (($rootScope.maxUploadFiles - $scope.formData.kaizen_files.length) >= files.length) {
                            for (var i = 0; i < files.length; i++) {
                                var extn = files[i].name.split(".").pop();
                                if ($rootScope.validextensions.includes(extn.toLowerCase())) {
                                    if (files[i].size <= $rootScope.maxUploadsize) {
                                        var newobj = {};
                                        newobj.file = files[i];
                                        newobj.filename = files[i].name;
                                        newobj.filetype = files[i].type.split("/")[0];
                                        newobj.isfile = 1;
                                        $scope.formData.kaizen_files.push(newobj);
                                    } else {
                                        $scope.errors.push(files[i].name + ' size exceeds 2MB.')
                                    }
                                } else {
                                    $scope.errors.push(files[i].name + ' format unsupported.');
                                }
                            }
                        } else {
                            $scope.errors.push('You can now upload only ' + ($rootScope.maxUploadFiles - $scope.formData.kaizen_files.length) + ' files');
                        }
                    }
                } else {
                    $scope.errors.push('You can add only maximum of ' + $rootScope.maxUploadFiles + ' files only');
                }
                if ($scope.errors.length > 0) {
                    $rootScope.$emit("showErrors", $scope.errors);
                }
            }

            $scope.addkaizenDocuments = function(files) {
                $scope.errors = [];
                if ($scope.formData.kaizen_documents.length < $rootScope.maxUploadFiles) {
                    if (files && files.length) {
                        if (($rootScope.maxUploadFiles - $scope.formData.kaizen_documents.length) >= files.length) {
                            for (var i = 0; i < files.length; i++) {
                                var extn = files[i].name.split(".").pop();
                                if ($rootScope.validfileextensions.includes(extn.toLowerCase())) {
                                    if (files[i].size <= $rootScope.maxUploadsize) {
                                        var newobj = {};
                                        newobj.file = files[i];
                                        newobj.name = files[i].name.split(".")[0];
                                        newobj.info = '';
                                        newobj.filetype = files[i].type.split("/")[0];
                                        newobj.isfile = 1;
                                        $scope.formData.kaizen_documents.push(newobj);
                                    } else {
                                        $scope.errors.push(files[i].name + ' size exceeds 2MB.')
                                    }
                                } else {
                                    $scope.errors.push(files[i].name + ' format unsupported.');
                                }
                            }
                        } else {
                            $scope.errors.push('You can now upload only ' + ($rootScope.maxUploadFiles - $scope.formData.kaizen_documents.length) + ' files');
                        }
                    }
                } else {
                    $scope.errors.push('You can add only maximum of ' + $rootScope.maxUploadFiles + ' files only');
                }
                if ($scope.errors.length > 0) {
                    $rootScope.$emit("showErrors", $scope.errors);
                }
            }

            $scope.closeModal = function() {
                $scope.formData = {};
                $scope.isedit = false;
                $('#HeaderModal').modal('hide');
                $('#PopupModal').modal('hide');
                $('#EventInfoModal').modal('hide');
                $rootScope.modalerrors = [];
            }

            $scope.removeFile = function(key,data){
                $scope.formData.kaizen_files.splice(key,1);
            }

            $scope.removeDocuments = function(key,data){
                $scope.formData.kaizen_documents.splice(key,1);
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
                return Date.parse(date);
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
                $rootScope.loading = true;
                $rootScope.currentState = toState.name;
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
                    autoplay: false,
                    draggable: true,
                    slidesToShow: $rootScope.slidecount,
                    slidesToScroll: $rootScope.scrollslides,
                    arrows: true,
                    prevArrow: "<img class='slick-prev slick-arrow' src='img/sliderL.png'>",
                    nextArrow: "<img class='slick-next slick-arrow' src='img/sliderR.png'>",
                    method: {},
                    infinite: false
                };
            });

            $rootScope.getUserInfo = function() {
                $rootScope.errors = [];
                webServices.get('getauthenticateduser').then(function(getData) {
                    if (getData.status == 200) {
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

        }
        ]);