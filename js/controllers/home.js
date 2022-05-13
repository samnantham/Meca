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
        $scope.promotionContent = "With the support we received from TMC to eliminate the Grey market, and while acknowledging the authenticity of our authorized dealers in Iraq, we have together launched Invest4Next campaign. Spend today, think next. Because you want to make a safe choice for what is next. Next for your children, Next for your friends and family, Next for the next generation. So go straight to where that choice is. Make key decisions with a trusted dealer. Invest 4 Next.";
        $scope.isCurrent = 0;
        $scope.showPopup = false;
        $scope.feedTotal = 0;
        $scope.promotions = [{ title:'Toyota Dream Car Art Contest', content:'Artworks Gallery for Middle East & Central Asia. Online Museum that collects from children in the Middle East and Central Asia.', type : 1, src:'https://mecacampus.com/API/public/upload/fromTMC/617f9d1682822.JPG'}];

        // $scope.promotions = [{ content: 'With the support we received from TMC to eliminate the Grey market, and while acknowledging the authenticity of our authorized dealers in Iraq, we have together launched Invest4Next campaign. Spend today, think next. Because you want to make a safe choice for what is next. Next for your children, Next for your friends and family, Next for the next generation. So go straight to where that choice is. Make key decisions with a trusted dealer. Invest 4 Next.', type: 3, title: 'Invest 4 Next', src: $sce.trustAsResourceUrl('https://www.youtube.com/embed/02QUnL6sNks?autoplay=1&mute=1&loop=1&playlist=02QUnL6sNks') }, { content: ' <span> <b>Message from Okada san, Technical Service Div. Service Innovation Dept.</b>We have created comics to teach you about 5S(a part of Quick Kaizen) in a fun way! Does everyone know about 5S? Each S comes from the first letter of the words SIFTING, SORTING, SHINING, STANDARDIZING and SUSTAINING, and is one of the fundamental building blocks of Quick Kaizen. We have created some comics so you can learn about 5S in detail while having fun!</span><br><span>5S Comics Download available from below link:</span><a class="color_2" target="_blank" href="http://oasis.mx.toyota.co.jp/sites/Contents/200101/SitePages/5s-comic.aspx">http://oasis.mx.toyota.co.jp/sites/Contents/200101/SitePages/5s-comic.aspx</a></span>', type: 1, title: 'New 5S Comic (Kaizen Toolbox new contents) has been created!!', src: 'img/promo-thumb.jpg' }];

        $scope.TMCslickConfig = {
            enabled: true,
            autoplay: true,
            draggable: true,
            autoplaySpeed: 5000,
            slidesToShow: $rootScope.slidecount,
            slidesToScroll: $rootScope.scrollslides,
            arrows: true,
            prevArrow: "<img class='slick-prev slick-arrow' src='img/sliderL.png'>",
            nextArrow: "<img class='slick-next slick-arrow' src='img/sliderR.png'>",
            method: {},
            dots: false,
            infinite: true,
            event: {
                beforeChange: function (event, slick, currentSlide, nextSlide) {
                    $scope.isCurrent = $scope.homeData.tmcs[currentSlide].pinky;
                },
                afterChange: function (event, slick, currentSlide, nextSlide) {
                    $scope.isCurrent = $scope.homeData.tmcs[currentSlide].pinky;
                }
            }
        };

        $scope.PromoslickConfig = {
            enabled: true,
            autoplay: true,
            draggable: true,
            autoplaySpeed: 4000,
            slidesToShow: $rootScope.slidecount,
            slidesToScroll: $rootScope.scrollslides,
            arrows: true,
            prevArrow: "<img class='slick-prev slick-arrow' src='img/sliderL.png'>",
            nextArrow: "<img class='slick-next slick-arrow' src='img/sliderR.png'>",
            method: {},
            dots: false,
            infinite: true
        };

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

        $scope.toggleactiveCalendar = function (calendar) {
            if ($scope.activeCalendar != calendar) {
                $rootScope.loading = true;
                $scope.activeCalendar = calendar;
                $scope.getCalenderData();
            }
        }

        $(document).on({
            mouseenter: function () {
                var feeditem = $(this).parent().context.offsetParent.id.replace("feed", "");
                $scope.feeds[feeditem].showPopup = true;
                $timeout(function () {
                    $scope.feeds[feeditem].showPopup = false;
                }, 10000);
            },
            mouseleave: function () {
                // $timeout(function () {
                //     if($(this).parent().context.offsetParent.id){
                //         $scope.feeds[$(this).parent().context.offsetParent.id.replace("feed", "")].showPopup = false;
                //     }
                // }, 10000);
            }
        }, "#hoverable-Text");


        $scope.showPopover = function (feed) {
            feed.showPopup = true;
        }
        $scope.hidePopover = function (feed) {
            $timeout(function () {
                feed.showPopup = false;
            }, 10000);
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
                    if (event.from_google) {
                        $window.open($rootScope.calendarURL, '_blank');
                    } else {
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
                    if ($scope.activeCalendar == 'mebit') {
                        $scope.getMonthevents(month, year)
                    } else if ($scope.activeCalendar == 'imecad') {
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
            webServices.get('calendar/info/' + month + '/' + year + '/event').then(function (getData) {
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
            } else if (item.whatsnew_type == 14) {
                $state.go('app.dakarinfo', {
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
            $scope.images = [{ type: 'video', url: 'https://mecacampus.com/media/video/Toyota_Dream_Car_Art_Contest_MECA_Regional_Award.mp4' }];
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
                        action: function () { }
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

        $rootScope.getFeeds = function (offset) {
            webServices.get('feed/list/all/' + offset).then(function (getData) {
                if (getData.status == 200) {
                    $scope.feedTotal = getData.data['total'];
                    Array.prototype.push.apply($scope.feeds, getData.data['data']);
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
                        action: function () { }
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

        $scope.chatscrollconfig = {
            autoHideScrollbar: true,
            theme: 'dark',
            advanced: {
                updateOnContentResize: true
            },
            setHeight: 1000,
            scrollInertia: 400,
            callbacks: {
                onTotalScroll: function () {
                    $rootScope.getFeeds($scope.feeds.length);
                }
            }
        }

        $scope.getData = function () {
            var obj = {};
            obj.title = 'We set up the "Regional Awards of Toyota Dream Car Art Contest" from 2021';
            obj.cover_image = 'public/upload/fromTMC/60596a1a68321.png';
            obj.doc_link = 'https://mecacampus.com/awards';
            obj.type = 'link';
            $rootScope.getFeeds($scope.feeds.length);
            webServices.get('home/info').then(function (getData) {
                //$scope.getCalenderData();
                $rootScope.loading = false;
                $scope.firstloadingdone = true;
                var obj = { page_name: '', page_component: '' };
                if ($rootScope.currentState == 'app.mebitdashboard') {
                    obj.page_component = 'mebit';
                    obj.page_name = 'mebit_section';
                } else if ($rootScope.currentState == 'app.home') {
                    obj.page_component = 'home';
                    obj.page_name = 'home';
                } else if ($rootScope.currentState == 'app.awards') {
                    obj.page_component = 'common';
                    obj.page_name = 'awards';
                }
                $rootScope.viewPage(obj);
                if (getData.status == 200) {
                    $scope.homeData = getData.data;
                    angular.forEach($scope.homeData.whatsnew, function (data, no) {
                        if (data.whatsnew_type == 3) {
                            data.typeData = $rootScope.kaizentypes.filter(function (kaizen) {
                                return kaizen.id == data.type;
                            })[0];
                        }
                        // else if (data.whatsnew_type == 8) {
                        //     data.typeData = $rootScope.kaizentypes.filter(function (kaizen) {
                        //         return kaizen.id == data.type;
                        //     })[0];
                        // } 
                        else if (data.whatsnew_type == 9) {
                            data.typeData = $rootScope.maastypes.filter(function (kaizen) {
                                return kaizen.id == data.type;
                            })[0];
                        }
                    });
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