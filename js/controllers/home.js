'use strict';
app.controller('DashboardCtrl', ['$scope', '$state', 'webServices', '$rootScope', 'authServices', '$timeout', '$sessionStorage', 'NgMap', '$http', '$filter', '$sce', '$window', '$ngConfirm',
    function ($scope, $state, webServices, $rootScope, authServices, $timeout, $sessionStorage, NgMap, $http, $filter, $sce, $window, $ngConfirm) {

        $rootScope.$emit("setSliderConfig", {});
        $scope.firstloadingdone = false;
        $scope.activeCalendar = 'mebit';
        $rootScope.loading = true;
        $scope.doclink = '';
        $scope.commentData = {};
        $scope.feeds = [];
        $scope.promotionContent = "This is Kanno, from TMC Middle East and Central Asia Div.<br>I may already have met many of you through Teams but again, Very Nice to e-Meet you !(^^)!<br>Thank you very much for your active participation during Tokyo Olympic and Paralympic. We had our NEW families here in Tokyo who were the serious athletes from MECA regionand all over the world. Especially at Paralympic games, we witnessed a lot of Super Human. They successfully went over the impossible and performed something which we ordinarypeople can't do. We learned so many things, which may result in one of our Umbrella phrase,Start your Impossible. Never admit who you are with what you have under what you are told. Go and challenge for it. We Toyota tend to choose what made us successful in the past over what requires effortsbecause it looks safe and efficient. However, rules, competitors, technologies and so on keepchanging every moment, we can't say Status Quo is ok. We all Toyota members are the challengersforever. <br>Our predecessors in MECA took a risk and decided to import unknown Toyota over couplesof thousand kilo meters across the ocean in 30-40-50-60 years ago. And following generations andsupporting team kept kaizen on themselves to seek for better - better for the brand and customers. That's where we are. There is a difference between Sports and Automotive but Olympic andParalympic gave me a great opportunity to think that again in myself. And this thought 'Start your Impossible' is reminded repeatedly by our Leader Akio Toyoda sanwho has been at president role from 2009. During his time up until now, Toyota company didovercome variety of challenges never experienced before. Of course, those success has been madebecause of your support and participation. <br>We can't enough say thank you to all.But how about Akio san ? what did he think? How did he react ?Because you are Team Toyota, I know you are very much interested in Akio san himself and his story.And now, it becomes finally available for you, our valued distributors.Would you please open the PDF attched on this ?<br>( if any difficulties, please contact to us and we are happy to support you )<br>And we want to hear your comment. Please kindly post when you are ready.<br>Thank you very much<br>And please make sure to stay safe and healthy under COVID pandemic<br>Best regards,<br><b>Kanno</b><br><br>";

        $scope.clickTMC = function (data) {
            if (data.type == 1) {
                $window.open(data.doc_link, '_blank');
            } else if (data.type == 2) {
                $rootScope.openPDF(data.doc_link);
            } else if (data.type == 3) {
                $scope.images = [{ type: 'video', url: data.doc_link }];
                $rootScope.openLightbox($scope.images, 0);
            }
        }

        $scope.toggleactiveCalendar = function(calendar){
            if($scope.activeCalendar != calendar){
                $rootScope.loading = true;
                $scope.activeCalendar = calendar;
                $scope.getCalenderData();
            }
        }

        $scope.uiConfig = {
            calendar: {
                height: 'auto',
                editable: true,
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month basicWeek basicDay listDay listWeek listMonth,'
                },
                dayClick: $scope.alertOnEventClick,
                fixedWeekCount: true,
                weekMode: 'liquid',
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventMouseover: $scope.alertOnMouseOver,
                eventClick: function (event) {
                    if(event.from_google){
                        $window.open( $rootScope.calendarURL, '_blank' );
                    }else{
                        $rootScope.formData = event;
                        $scope.activeDate = event.start._d;
                        $scope.calenderevents = [];
                        $scope.getCalenderEvents(event.start._d.getTime());
                    }
                },
                viewRender: function (view, element) {
                    var monthyear = view.title.split(' ');
                    var month = $rootScope.getMonthFromString(view.title.split(' ')[0]);
                    var year = parseInt(monthyear[1]);
                    if($scope.activeCalendar == 'mebit'){
                        $scope.getMonthevents(month, year)
                    }else if($scope.activeCalendar == 'imecad'){
                        $scope.getGoogleCalHolidays(month, year);
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

        $scope.getMonthevents = function (month, year) {
            webServices.get('calendar/info/' + month + '/' + year+'/event').then(function (getData) {
                $rootScope.loading = false;
                if (getData.status == 200) {
                    angular.forEach(getData.data, function (data, no) {
                        data.start = new Date(data.start);
                        $scope.calendarevents.push(data)
                    });
                    if (!$scope.firstloadingdone) {
                        $scope.eventSources = [$scope.calendarevents];
                        $scope.firstloadingdone = true;
                    } else {
                        $scope.eventSources.splice(0, 1);
                        $scope.eventSources.push($scope.calendarevents);
                    }
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.addComment = function (key, feed) {
            if (!$scope.commentData.is_reply) {
                if (feed.comment) {
                    $scope.commentData.is_reply = 0;
                    $scope.commentData.feed = feed.id;
                    $scope.commentData.isfile = 0;
                    $scope.commentData.comment = feed.comment;
                    $scope.sendComment(key, $scope.commentData);
                }
            } else {
                if (feed.comment) {
                    $scope.commentData.comment = feed.comment;
                    $scope.sendComment(key, $scope.commentData);
                }
            }

        }

        $scope.cancelReply = function (key) {
            $scope.feeds[key].showReply = 0;
            $scope.commentData.is_reply = 0;
            $scope.commentData.ownerprofile = {};
        }

        $scope.sendComment = function (key, comment) {
            webServices.upload('feed/new/comment', comment).then(function (getData) {
                $rootScope.loading = false;
                if (getData.status == 200) {
                    $scope.commentData = {};
                    $scope.feeds[key].comment = '';
                    $scope.feeds[key].comments = getData.data.data;
                } else {
                    $rootScope.$emit("showISError", getData);
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
                if (!item.viewinfo) {
                    $rootScope.viewModuleItem(13, item.id);
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
            } else if (item.whatsnew_type == 9) {
                $state.go('app.viewmaas', {
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

        $scope.openVideo = function () {
            $scope.images = [{ type: 'video', url: 'https://mecacampus.com/media/video/Award-Ceremony.mp4' }];
            $rootScope.openLightbox($scope.images, 0);
        }

        $scope.editFeed = function (key, feed) {
            $rootScope.isEdititem = true;
            $rootScope.formData = feed;
            $rootScope.ModalOpen('feedModal', 'FeedModalController');
        }

        $scope.replyComment = function (key, comment) {
            $scope.feeds[key].showReply = 1;
            $scope.commentData.is_reply = 1;
            $scope.commentData.parent = comment.id;
            $scope.commentData.isfile = 0;
            $scope.commentData.feed = comment.feed;
            $scope.commentData.is_reply = 1;
            $scope.commentData.ownerprofile = comment.ownerprofile;
        }

        $scope.showHideComments = function (key, feed) {
            feed.showComment = !feed.showComment;
        }

        $scope.changeFeedLike = function (key, feed, like_type) {
            var obj = {};
            obj.feed = feed.id;
            obj.user = $rootScope.user.id;
            obj.is_admin = 0;
            if (!feed.isLiked) {
                feed.likes++;
                feed.isLiked = 1;
            } else {
                feed.likes--;
                feed.isLiked = 0;
            }
            obj.status = feed.isLiked;
            obj.like_type = like_type;
            $scope.updateLike(obj);
        }

        $scope.showlikeInfo = function (likemembers) {
            $rootScope.showLikedMembers(likemembers);
        }

        $scope.deleteComment = function (key, commentkey, comment) {
            $ngConfirm({
                title: 'Are you sure want to remove?',
                content: '',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    tryAgain: {
                        text: 'Yes',
                        btnClass: 'btn-red',
                        action: function () {
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

        $scope.removeComment = function (key, commentkey, comment) {
            webServices.delete('feed/comment/delete/' + comment).then(function (getData) {
                if (getData.status == 200) {
                    $scope.feeds[key].comments.splice(commentkey, 1);
                } else {
                    $rootScope.$emit("showISError", getData);
                }
            });
        }

        $rootScope.getFeeds = function () {
            webServices.get('feed/list/all').then(function (getData) {
                if (getData.status == 200) {
                    $scope.feeds = getData.data;
                } else {
                    $rootScope.$emit("showerror", getData);
                }
            });
        }

        $scope.deleteFeed = function (key, feed) {
            $ngConfirm({
                title: 'Are you sure want to remove?',
                content: '',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    tryAgain: {
                        text: 'Yes',
                        btnClass: 'btn-red',
                        action: function () {
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

        $scope.removeFeed = function (key, id) {
            webServices.delete('feed/' + id).then(function (getData) {
                if (getData.status == 200) {
                    $scope.feeds.splice(key, 1);
                } else {
                    $rootScope.$emit("showISError", getData);
                }
            });
        }

        $scope.changeCommentLike = function (key, comment, like_type) {
            var obj = {};
            obj.feed = comment.id;
            obj.user = $rootScope.user.id;
            obj.is_admin = 0;
            if (!comment.isLiked) {
                comment.likes++;
                comment.isLiked = 1;
            } else {
                comment.likes--;
                comment.isLiked = 0;
            }
            obj.status = comment.isLiked;
            obj.like_type = like_type;
            $scope.updateLike(obj);
            console.log(key, comment, like_type)
        }

        $scope.updateLike = function (obj) {
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
                $scope.getCalenderData();
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
                        } else if (data.whatsnew_type == 8) {
                            data.typeData = $rootScope.kaizentypes.filter(function (kaizen) {
                                return kaizen.id == data.type;
                            })[0];
                        } else if (data.whatsnew_type == 9) {
                            data.typeData = $rootScope.maastypes.filter(function (kaizen) {
                                return kaizen.id == data.type;
                            })[0];
                        }
                    });
                    // if (!$rootScope.initialsnowfalling) {
                    //     $timeout(function () {
                    //         $rootScope.initialsnowfalling = true;
                    //         $rootScope.snowfalling = true;
                    //         $rootScope.showSnowfall();
                    //     }, 500);
                    // }

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

        $scope.getGoogleCalEvents = function (month,year) {
            $http({
                method: 'GET',
                url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + $rootScope.CalendarID + '/events?key=' + $rootScope.Calendarkey),
                cache: false,
                dataType: 'json',
            }).then(function (response) {
                $rootScope.loading = false;
                angular.forEach(response.data.items, function (item, no) {
                    var obj = {};
                    obj.title = item.summary;
                    obj.className = ['bg-info-cal'];
                    obj.start = new Date(item.start.date);
                    obj.from_google = 1;
                    $scope.calendarevents.push(obj)
                });
                $scope.eventSources.push($scope.calendarevents);
                //$scope.getMonthevents(month,year);
            }, function (response) {
                console.log(response)
            });

        }
        

        $scope.getGoogleCalHolidays = function (month,year) {
            $scope.eventSources = [];
            $scope.calendarevents = [];
            $http({
                method: 'GET',
                url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/japanese@holiday.calendar.google.com/events?key=' + $rootScope.Calendarkey),
                cache: false,
                dataType: 'json',
            }).then(function (response) {
                console.log(response)
                angular.forEach(response.data.items, function (item, no) {
                    var obj = {};
                    obj.title = item.summary;
                    obj.className = ['bg-info-cal'];
                    obj.start = new Date(item.start.date);
                    obj.from_google = 1;
                    $scope.calendarevents.push(obj)
                });
                $scope.getGoogleCalEvents(month,year);
            }, function (response) {
                console.log(response)
            });

        }

        $scope.getCalenderData = function(){
            var d = new Date();
            $scope.calendarevents = [];
            $scope.eventSources = [];
            if($scope.activeCalendar == 'mebit'){
                $scope.getMonthevents(d.getMonth(), d.getYear());
            }else if($scope.activeCalendar == 'imecad'){
                $scope.getGoogleCalHolidays(d.getMonth(), d.getYear());
            }
        }

        $scope.getData();
        
    }
]);