app.controller('VideoModalController', [ '$timeout', '$state', '$stateParams', 'webServices', 'utility', '$rootScope', '$filter', function($timeout, $state, $stateParams, webServices, utility, $rootScope, $filter) {
    
    if(!$rootScope.isEdititem){
        $rootScope.formData = {};
    }else{
        $rootScope.formData.category = '';
        $rootScope.formData.date_posted = new Date($rootScope.formData.created_at);
    }
    $rootScope.errorData = {};

    $rootScope.inputchange = function() {
        $rootScope.errorData = {};
        $rootScope.seterrorMsg();
    }

    $rootScope.seterrorMsg = function(){
        $rootScope.errorData.title_errorMsg = 'Enter Video Title';
        $rootScope.errorData.content_errorMsg = 'Please enter Video content';
        $rootScope.errorData.category_errorMsg = 'Please select Video Category';
        $rootScope.errorData.video_link_errorMsg = 'Please enter video link';
    }

    $rootScope.setservererrorMsg = function(errors){
        $rootScope.errorData = {};
        angular.forEach(errors, function(error, no) {
            $rootScope.errorData[no.replace('new','')+'_errorMsg'] = error[0];
            $rootScope.errorData[no.replace('new','')+'_error'] = true;
        });
    }

    $rootScope.addData = function(form) {
        $rootScope.seterrorMsg();
        if (form.$valid) {
            $rootScope.loading = true;
            if($rootScope.isEdititem){
                webServices.putupload('news/video/'+$rootScope.formData.id, $rootScope.formData).then(function(getData) {
                    $rootScope.loading = false;
                    if (getData.status == 200) {
                        $rootScope.$emit("showSuccessMsg", getData.data.message);
                        $rootScope.closeModalPopup();
                        $state.reload();
                    } else if (getData.status == 401) {
                        $rootScope.setservererrorMsg(getData.data.message);
                        $rootScope.loading = false;
                    } else {
                        $rootScope.$emit("showISError", getData);
                    }
                });
            }else{
                if($rootScope.formData.date_posted){
                    $rootScope.formData.posted_date = $filter('date')($rootScope.formData.date_posted, 'yyyy-MM-dd hh:mm:ss');
                }
                webServices.upload('news/video', $rootScope.formData).then(function(getData) {
                    $rootScope.loading = false;
                    if (getData.status == 200) {
                        $rootScope.$emit("showSuccessMsg", getData.data.message);
                        $rootScope.closeModalPopup();
                        $state.reload();
                    } else if (getData.status == 401) {
                        $rootScope.setservererrorMsg(getData.data.message);
                        $rootScope.loading = false;
                    } else {
                        $rootScope.$emit("showISError", getData);
                    }
                });
            }
        } else {
            if (!form.title.$valid) {
                $rootScope.errorData.title_error = true;
            }if (!form.content.$valid) {
                $rootScope.errorData.content_error = true;
            }if (!form.category.$valid) {
                $rootScope.errorData.category_error = true;
            } if (!form.video_link.$valid) {
                $scope.errorData.video_link_error = true;
            }
            $rootScope.$emit("showErrors", $rootScope.errors);
        }
    }
    
}]);