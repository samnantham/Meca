app.controller('OnlyDayModalController', [ '$timeout', '$state', '$stateParams', 'webServices', 'utility', '$rootScope', '$filter', function($timeout, $state, $stateParams, webServices, utility, $rootScope, $filter) {
    
    if(!$rootScope.isEdititem){
        $rootScope.formData = {};
        $rootScope.formData.item_files = [];
        $rootScope.formData.video_links = [];
        $rootScope.formData.item_documents = [];
        $rootScope.formData.document_links = [];
    }else{
        $rootScope.formData.deleted_item_files = [];
        $rootScope.formData.deleted_item_documents = [];
    }
    $rootScope.errorData = {};
    $rootScope.videoData = {};
    $rootScope.documentData = {};

    $rootScope.inputchange = function() {
        $rootScope.errorData = {};
        $rootScope.seterrorMsg();
    }

    $rootScope.seterrorMsg = function(){
        $rootScope.errorData.title_errorMsg = 'Enter Title';
        $rootScope.errorData.content_errorMsg = 'Please enter content';
    }

    $rootScope.setservererrorMsg = function(errors){
        $rootScope.errorData = {};
        angular.forEach(errors, function(error, no) {
            $rootScope.errorData[no.replace('new','')+'_errorMsg'] = error[0];
            $rootScope.errorData[no.replace('new','')+'_error'] = true;
        });
    }

    $rootScope.addDocuments = function(files) {
        $rootScope.errors = [];
        if ($rootScope.formData.item_documents.length < $rootScope.maxUploadFiles) {
            if (files && files.length) {
                if (($rootScope.maxUploadFiles - $rootScope.formData.item_documents.length) >= files.length) {
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
                                $rootScope.formData.item_documents.push(newobj);
                            } else {
                                $rootScope.errors.push(files[i].name + ' size exceeds 2MB.')
                            }
                        } else {
                            $rootScope.errors.push(files[i].name + ' format unsupported.');
                        }
                    }
                } else {
                    $rootScope.errors.push('You can now upload only ' + ($rootScope.maxUploadFiles - $rootScope.formData.item_documents.length) + ' files');
                }
            }
        } else {
            $rootScope.errors.push('You can add only maximum of ' + $rootScope.maxUploadFiles + ' files only');
        }
        if ($rootScope.errors.length > 0) {
            $rootScope.$emit("showErrors", $rootScope.errors);
        }
    }
    
    $rootScope.additemFiles = function(files) {
        $rootScope.errors = [];
        if ($rootScope.formData.item_files.length < $rootScope.maxUploadFiles) {
            if (files && files.length) {
                if (($rootScope.maxUploadFiles - $rootScope.formData.item_files.length) >= files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var extn = files[i].name.split(".").pop();
                        if ($rootScope.validextensions.includes(extn.toLowerCase())) {
                            if (files[i].size <= $rootScope.maxUploadsize) {
                                var newobj = {};
                                newobj.file = files[i];
                                newobj.filename = files[i].name;
                                newobj.filetype = files[i].type.split("/")[0];
                                newobj.isfile = 1;
                                $rootScope.formData.item_files.push(newobj);
                            } else {
                                $rootScope.errors.push(files[i].name + ' size exceeds 2MB.')
                            }
                        } else {
                            $rootScope.errors.push(files[i].name + ' format unsupported.');
                        }
                    }
                } else {
                    $rootScope.errors.push('You can now upload only ' + ($rootScope.maxUploadFiles - $rootScope.formData.item_files.length) + ' files');
                }
            }
        } else {
            $rootScope.errors.push('You can add only maximum of ' + $rootScope.maxUploadFiles + ' files only');
        }
        if ($rootScope.errors.length > 0) {
            $rootScope.$emit("showErrors", $rootScope.errors);
        }
    }
    
    $rootScope.removeVideoLink = function(key){
        $rootScope.formData.video_links.splice(key,1);
    }
    
    $rootScope.removeDocuments = function(key,data){
        $rootScope.formData.item_documents.splice(key,1);
    }
    
    $rootScope.removeDocumentLink = function(key){
        $rootScope.formData.document_links.splice(key,1);
    }
    
    $rootScope.uploadvideo = function() {
        if (($rootScope.validURL($rootScope.videoData.link))&&($rootScope.validvideo($rootScope.videoData.link))) {
    
            if($rootScope.formData.video_links.some(videolink => videolink.link === $rootScope.videoData.link)){
                $rootScope.$emit("showErrorMsg", 'Video already added');
            } else{
                var newobj = {};
                newobj.link = $rootScope.videoData.link;
                newobj.title = 'video link' + ($rootScope.formData.video_links.length + 1);
                newobj.info = '';
                $rootScope.formData.video_links.push(newobj);
                $rootScope.videoData = {};
            }
        }else{
            $rootScope.$emit("showErrorMsg", 'Please upload valid video url.');
            $rootScope.videoData.link = '';
        }  
    }
    
    $rootScope.uploaddocumentlink = function() {
        if ($rootScope.validURL($rootScope.documentData.link)) {
    
            if($rootScope.formData.document_links.some(documentlink => documentlink.link === $rootScope.documentData.link)){
                $rootScope.$emit("showErrorMsg", 'Document already added');
            } else{
                var newobj = {};
                newobj.link = $rootScope.documentData.link;
                newobj.name = 'External link' + ($rootScope.formData.document_links.length + 1);
                newobj.info = '';
                $rootScope.formData.document_links.push(newobj);
                $rootScope.documentData = {};
            }
        }else{
            $rootScope.$emit("showErrorMsg", 'Please enter a valid document link.');
            $rootScope.documentData.link = '';
        }  
    }
    
    $rootScope.removeFile = function(key,data){
        if(!data.isfile){
            $rootScope.formData.deleted_item_files.push(data);
        }
        $rootScope.formData.item_files.splice(key,1);
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
                webServices.upload('oneandonlyday/'+$rootScope.formData.id, $rootScope.formData).then(function(getData) {
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
                webServices.upload('oneandonlyday', $rootScope.formData).then(function(getData) {
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
            }
            $rootScope.$emit("showErrors", $rootScope.errors);
        }
    }
    
}]);