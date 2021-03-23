app.controller('CrisisModalController', [ '$timeout', '$state', '$stateParams', 'webServices', 'utility', '$rootScope', '$filter', function($timeout, $state, $stateParams, webServices, utility, $rootScope, $filter) {
    
    if(!$rootScope.isEdititem)
    {
        $rootScope.formData = {};
        $rootScope.formData.tags = [];
        $rootScope.formData.documents = [];
    }else{
        $rootScope.formData.date_posted = new Date($rootScope.formData.created_at);
    }
    $rootScope.errorData = {};
    
    $rootScope.addremovetags = function(tag){
        var index = $rootScope.formData.tags.indexOf(tag);
        if (index > -1) {
            $rootScope.formData.tags.splice(index, 1);
        }else{
            $rootScope.formData.tags.push(tag);
        }
    }

    $rootScope.inputchange = function() {
        $rootScope.errorData = {};
        $rootScope.seterrorMsg();
    }

    $rootScope.seterrorMsg = function(){
        $rootScope.errorData.title_errorMsg = 'Enter Crisis Title';
        $rootScope.errorData.content_errorMsg = 'Please enter Crisis content';
        $rootScope.errorData.tags_errorMsg = 'Please select Crisis tags';
        $rootScope.errorData.cover_errorMsg = 'Please select Crisis cover image';
    }

    $rootScope.addDocuments = function (files) {
        $rootScope.errors = [];
        if ($rootScope.formData.documents.length < $rootScope.maxUploadFiles) {
            if (files && files.length) {
                if (($rootScope.maxUploadFiles - $rootScope.formData.documents.length) >= files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var extn = files[i].name.split(".").pop();
                        console.log(extn)
                        if ($rootScope.validfileextensions.includes(extn.toLowerCase())) {
                            if (files[i].size <= $rootScope.maxUploadsize) {
                                var newobj = {};
                                newobj.file = files[i];
                                newobj.name = files[i].name.split(".")[0];
                                newobj.info = '';
                                newobj.filetype = files[i].type.split("/")[0];
                                newobj.isfile = 1;
                                $rootScope.formData.documents.push(newobj);
                            } else {
                                $rootScope.errors.push(files[i].name + ' size exceeds 2MB.')
                            }
                        } else {
                            $rootScope.errors.push(files[i].name + ' format unsupported.');
                        }
                    }
                } else {
                    $rootScope.errors.push('You can now upload only ' + ($rootScope.maxUploadFiles - $rootScope.formData.documents.length) + ' files');
                }
            }
        } else {
            $rootScope.errors.push('You can add only maximum of ' + $rootScope.maxUploadFiles + ' files only');
        }
        if ($rootScope.errors.length > 0) {
            $rootScope.$emit("showErrors", $rootScope.errors);
        }
        console.log($rootScope.formData.documents)
    }

    $rootScope.removeDocuments = function (key, data) {
        $rootScope.formData.documents.splice(key, 1);
    }

    $rootScope.setservererrorMsg = function(errors){
        $rootScope.errorData = {};
        angular.forEach(errors, function(error, no) {
            $rootScope.errorData[no.replace('new','')+'_errorMsg'] = error[0];
            $rootScope.errorData[no.replace('new','')+'_error'] = true;
        });
    }

    $rootScope.uploadCover = function(files) {
        $rootScope.errors = [];
        if (files && files.length) {
            var extn = files[0].name.split(".").pop();
            if ($rootScope.imgextensions.includes(extn.toLowerCase())) {
                if (files[0].size <= $rootScope.maxUploadsize) {
                    $rootScope.formData.newcover = files[0];
                } else {
                    $rootScope.errors.push(files[0].name + ' size exceeds.')
                }
            } else {
                $rootScope.errors.push(files[0].name + ' format unsupported.');
            }
        }
        if ($rootScope.errors.length > 0) {
            $rootScope.$emit("showErrors", $rootScope.errors);
        }
    }

    $rootScope.addData = function(form) {
        $rootScope.seterrorMsg();
        if (form.$valid) {
            $rootScope.loading = true;
            if($rootScope.isEdititem){
                webServices.putupload('news/crisis/'+$rootScope.formData.id, $rootScope.formData).then(function(getData) {
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
                webServices.upload('news/crisis', $rootScope.formData).then(function(getData) {
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
            }if (!form.tags.$valid) {
                $rootScope.errorData.tags_error = true;
            }
            $rootScope.$emit("showErrors", $rootScope.errors);
        }
    }
    
}]);