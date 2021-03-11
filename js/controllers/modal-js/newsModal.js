app.controller('NewsModalController', [ '$timeout', '$state', '$stateParams', 'webServices', 'utility', '$rootScope', '$filter', function($timeout, $state, $stateParams, webServices, utility, $rootScope, $filter) {
    
    if(!$rootScope.isEdititem)
    {
        $rootScope.formData = {};
        $rootScope.formData.tags = [];
    }else{
        $rootScope.formData.category = '';
        $rootScope.subcategories = [];
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
        $rootScope.errorData.title_errorMsg = 'Enter News Title';
        $rootScope.errorData.content_errorMsg = 'Please enter News content';
        $rootScope.errorData.tags_errorMsg = 'Please select News tags';
        $rootScope.errorData.cover_errorMsg = 'Please select News cover image';
        $rootScope.errorData.category_errorMsg = 'Please select News Category';
        $rootScope.errorData.subcategory_errorMsg = 'Please select Sub Category';
    }

    $rootScope.Changecategory = function(category){
        $rootScope.inputchange();
        $rootScope.subcategories = [];
        $rootScope.formData.category = category.category;
        $rootScope.subcategories = category.subcategories;
    }

    $rootScope.uploadDoc = function(files) {
        $rootScope.formData.newdocument = files[0];
        console.log($rootScope.formData.newdocument)
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
                webServices.putupload('news/'+$rootScope.formData.id, $rootScope.formData).then(function(getData) {
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
                webServices.upload('news', $rootScope.formData).then(function(getData) {
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
            }if (!form.category.$valid) {
                $rootScope.errorData.category_error = true;
            }if($rootScope.subcategories.length > 0){
                if (!form.subcategory.$valid) {
                    $rootScope.errorData.subcategory_error = true;
                }
            }
            $rootScope.$emit("showErrors", $rootScope.errors);
        }
    }
    
}]);