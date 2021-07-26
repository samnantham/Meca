'use strict';
app.controller('DashboardCtrl', ['$scope', '$state', 'webServices', '$rootScope', 'authServices', '$timeout', '$sessionStorage', 'NgMap', '$http', '$filter', '$sce', '$window', '$ngConfirm',
    function ($scope, $state, webServices, $rootScope, authServices, $timeout, $sessionStorage, NgMap, $http, $filter, $sce, $window, $ngConfirm) {

        $rootScope.$emit("setSliderConfig", {});
        $scope.firstloadingdone = false;
        $scope.doclink = '';
        $scope.commentData = {};
        $scope.feeds = [];

        $scope.clickTMC = function (data) {
            if (data.type == 1) {
                $window.open(data.doc_link, '_blank');
            } else if (data.type == 2) {
                $rootScope.openPDF(data.doc_link);
            } else if (data.type == 3) {
                $scope.images = [{type: 'video' ,url : data.doc_link }];
                $rootScope.openLightbox($scope.images,0);
            }
        }

        $scope.uiConfig = {
            calendar: {
                height: 'auto',
                editable: true,
                fixedWeekCount: false,
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month basicWeek basicDay listDay listWeek listMonth,'
                },
                dayClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventMouseover: $scope.alertOnMouseOver,
                eventClick: function (event) {
                    $rootScope.formData = event;
                    $scope.activeDate = event.start._d;
                    $scope.calenderevents = [];
                    $scope.getCalenderEvents(event.start._d.getTime());
                }, viewRender: function (view, element) {
                    var monthyear = view.title.split(' ');
                    var month = $rootScope.getMonthFromString(view.title.split(' ')[0]);
                    var year = parseInt(monthyear[1]);
                    if ($scope.firstloadingdone) {
                        $scope.getMonthevents(month, year);
                    }
                }
            }
        };

        $scope.getCalenderEvents = function (date) {
            webServices.get('calendar/daily/events/' + date).then(function (getData) {
                if (getData.status == 200) {
                    $scope.calenderevents = getData.data;
                    $rootScope.openModal();
                } else {
                    $rootScope.$emit("showISError", getData);
                }
            });
        }

        $scope.addComment = function(key,feed){
            if(!$scope.commentData.is_reply){
                if(feed.comment){
                    $scope.commentData.is_reply = 0;
                    $scope.commentData.feed = feed.id;
                    $scope.commentData.isfile = 0;
                    $scope.commentData.comment = feed.comment;
                    $scope.sendComment(key,$scope.commentData);
                }
            }else{
                if(feed.comment){
                    $scope.commentData.comment = feed.comment;
                    $scope.sendComment(key,$scope.commentData);
                }
            }
            
        }

        $scope.cancelReply = function(key){
            $scope.feeds[key].showReply = 0;
            $scope.commentData.is_reply = 0;
            $scope.commentData.ownerprofile = {};
        }
    
        $scope.sendComment = function(key,comment){
             webServices.upload('feed/new/comment',comment).then(function(getData) {
                $rootScope.loading = false;
                if (getData.status == 200) {
                    $scope.commentData = {};
                    $scope.feeds[key].comment = '';
                    $scope.feeds[key].comments = getData.data.data;
                } else {
                    $rootScope.$emit("showISError",getData);
                }
            });
        }

        $scope.gotoItem = function (type, item) {
            $scope.closeModal();
            if (type == 'kaizen') {
                $state.go('app.viewkaizen', { 'id': item });
            } else if (type == 'tbp') {
                $state.go('app.viewtbp', { 'id': item });
            } else if (type == 'event') {
                $state.go('app.viewevent', { 'id': item });
            } else if (type == 'gr') {
                $state.go('app.viewgr', { 'id': item });
            } else if (type == 'hydrogen') {
                $state.go('app.viewhydrogen', { 'id': item });
            } else if (type == 'maas') {
                $state.go('app.viewmaas', { 'id': item });
            } else if (type == 'sdgs') {
                $state.go('app.viewsdgs', { 'id': item });
            }
        }

        $scope.viewEvent = function () {
            if ($rootScope.formData.type < 4) {
                if ($rootScope.formData.type == 1) {
                    $state.go('app.viewevent', {
                        id: $rootScope.formData.caleventInfo.item
                    });
                } else if ($rootScope.formData.type == 2) {
                    $state.go('app.viewtbp', {
                        id: $rootScope.formData.caleventInfo.item
                    });
                } else if ($rootScope.formData.type == 3) {
                    $state.go('app.viewkaizen', {
                        id: $rootScope.formData.caleventInfo.item
                    });
                }
            }
        }

        $scope.viewItem = function (item) {
            if (item.whatsnew_type == 2) {
                $state.go('app.viewevent', {
                    id: item.id
                });

            } else if (item.whatsnew_type == 3) {
                $state.go('app.viewkaizen', {
                    id: item.id
                });
            } else if (item.whatsnew_type == 4) {
                if(!item.viewinfo){
                    $rootScope.viewModuleItem(13,item.id);
                    item.viewinfo = 1;
                }
                $scope.clickTMC(item);
            } else if (item.whatsnew_type == 6) {
                $state.go('app.viewoneandonly', {
                    id: item.id
                });
            } else if (item.whatsnew_type == 7) {
                $state.go('app.trainerinfo', {
                    id: item.id
                });
            } else if (item.whatsnew_type == 8) {
                $state.go('app.viewgr', {
                    id: item.id
                });
            }
        }

        $scope.updateReminder = function (reminder) {
            var obj = {};
            obj.item = reminder.item;
            obj.module = reminder.module;
            webServices.post('reminder/update', obj).then(function (getData) {
                console.log(getData)
            });
        }

        $scope.openVideo = function(){
            $scope.images = [{type: 'video' ,url : 'https://mecacampus.com/media/video/Award-Ceremony.mp4'}];
            $rootScope.openLightbox($scope.images,0);
        }

        $scope.editFeed = function(key,feed){
            $rootScope.isEdititem = true;
            $rootScope.formData = feed;
            $rootScope.ModalOpen('feedModal','FeedModalController');
        }

        $scope.replyComment = function(key, comment){
            $scope.feeds[key].showReply = 1;
            $scope.commentData.is_reply = 1;
            $scope.commentData.parent = comment.id;
            $scope.commentData.isfile = 0;
            $scope.commentData.feed = comment.feed;
            $scope.commentData.is_reply = 1;
            $scope.commentData.ownerprofile = comment.ownerprofile;
        }

        $scope.getMonthevents = function (month, year) {
            var type = '';
            if($rootScope.currentState == 'app.mebitdashboard'){
                type = '/event';
            }
            webServices.get('calendar/info/' + month + '/' + year + type).then(function (getData) {
                if (getData.status == 200) {
                    $rootScope.loading = false;
                    $scope.calendarevents = getData.data;
                    angular.forEach($scope.calendarevents, function (data, no) {
                        data.start = new Date(data.start);
                    });
                    $scope.eventSources.splice(0, 1);
                    $scope.eventSources.push($scope.calendarevents);
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.showHideComments = function(key, feed){
            feed.showComment = !feed.showComment;
        }

        $scope.changeFeedLike = function(key, feed, like_type){
            var obj = {};
            obj.feed = feed.id;
            obj.user = $rootScope.user.id;
            obj.is_admin = 0;
            if(!feed.isLiked){
                feed.likes ++;
                feed.isLiked = 1;
            }else{
                feed.likes --;
                feed.isLiked = 0;
            }
            obj.status = feed.isLiked;
            obj.like_type = like_type;
            $scope.updateLike(obj);
        }

        $scope.showlikeInfo = function(likemembers){
            $rootScope.showLikedMembers(likemembers);
        }

        $scope.deleteComment = function(key, commentkey, comment){
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
                            $scope.removeComment(key, commentkey, comment.id);
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

        $scope.removeComment = function(key, commentkey, comment) {
            webServices.delete('feed/comment/delete/' + comment).then(function(getData) {
                if (getData.status == 200) {
                    $scope.feeds[key].comments.splice(commentkey,1);
                } else {
                    $rootScope.$emit("showISError",getData);
                }
            });
        }

        $rootScope.getFeeds = function(){
            webServices.get('feed/list/all').then(function (getData) {
                if (getData.status == 200) {
                    $scope.feeds = getData.data;
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.deleteFeed = function(key, feed){
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
                            $scope.removeFeed(key, feed);
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

        $scope.removeFeed = function(key, id) {
            webServices.delete('feed/' + id).then(function(getData) {
                if (getData.status == 200) {
                    $scope.feeds.splice(key,1);
                } else {
                    $rootScope.$emit("showISError",getData);
                }
            });
        }

        $scope.changeCommentLike = function(key, comment, like_type){
            var obj = {};
            obj.feed = comment.id;
            obj.user = $rootScope.user.id;
            obj.is_admin = 0;
            if(!comment.isLiked){
                comment.likes ++;
                comment.isLiked = 1;
            }else{
                comment.likes --;
                comment.isLiked = 0;
            }
            obj.status = comment.isLiked;
            obj.like_type = like_type;
            $scope.updateLike(obj);
            console.log(key, comment, like_type)
        }

        $scope.updateLike = function(obj){
            webServices.post('feed/like/update', obj).then(function (getData) {
                console.log(getData)
                
            });
        }

        $scope.getData = function () {
            var obj = {};
            obj.title = 'We set up the "Regional Awards of Toyota Dream Car Art Contest" from 2021';
            obj.cover_image = 'public/upload/fromTMC/60596a1a68321.png';
            obj.doc_link = 'https://mecacampus.com/awards';
            obj.type = 'link';
            webServices.get('home/info').then(function (getData) {
                $rootScope.loading = false;
                $scope.firstloadingdone = true;
                if (getData.status == 200) {
                    $scope.homeData = getData.data;
                    $scope.feeds = getData.data.feeds;
                    $scope.calendarevents = getData.data.caldata;
                    angular.forEach($scope.calendarevents, function (data, no) {
                        data.start = new Date(data.start);
                    });
                    angular.forEach($scope.homeData.whatsnew, function (data, no) {
                        if (data.whatsnew_type == 3) {
                            data.typeData = $rootScope.kaizentypes.filter(function (kaizen) {
                                return kaizen.id == data.type;
                            })[0];
                        }else if (data.whatsnew_type == 8) {
                            data.typeData = $rootScope.kaizentypes.filter(function (kaizen) {
                                return kaizen.id == data.type;
                            })[0];
                        }
                    });
                    $scope.eventSources = [$scope.calendarevents];
                    console.log($scope.homeData)
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }



        $rootScope.openModal = function () {
            $('#PopupModal').modal({
                backdrop: 'static',
                keyboard: false
            });
        }

        $rootScope.openeventModal = function () {
            $('#EventInfoModal').modal({
                backdrop: 'static',
                keyboard: false
            });
        }

        $rootScope.closeModal = function () {
            $rootScope.formData = {};
            $('#PopupModal').modal('hide');
            $('#EventInfoModal').modal('hide');
            $('#PDFModal').modal('hide');
        }

        $scope.getData();

    }
]);