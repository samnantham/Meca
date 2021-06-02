app.controller('SDGsModalController', ['$timeout', '$state', '$stateParams', 'webServices', 'utility', '$rootScope', '$filter', function ($timeout, $state, $stateParams, webServices, utility, $rootScope, $filter) {
    $rootScope.videoData = {};
    $rootScope.documentData = {};
    if (!$rootScope.isEdititem) {
        $rootScope.formData = {};
        $rootScope.formData.type = '1';
        $rootScope.formData.sdgs_files = [];
        $rootScope.formData.video_links = [];
        $rootScope.formData.sdgs_documents = [];
        $rootScope.formData.document_links = [];
    } else {
        $rootScope.formData.type = $rootScope.formData.type.toString();
        $rootScope.formData.deleted_sdgs_files = [];
        $rootScope.formData.deleted_sdgs_documents = [];
        $rootScope.formData.gr_start_date = new Date($rootScope.formData.start_date);
        if($rootScope.formData.end_date){
            $rootScope.formData.gr_end_date = new Date($rootScope.formData.end_date);
        }
    }

    $rootScope.errorData = {};

    $rootScope.seterrorMsg = function () {
        $rootScope.errorData.title_errorMsg = 'Enter Title';
        $rootScope.errorData.description_errorMsg = 'Please add sdgs Study';
        $rootScope.errorData.start_date_errorMsg = 'Select Date';
    }

    $rootScope.removeVideoLink = function (key) {
        $rootScope.formData.video_links.splice(key, 1);
    }

    $rootScope.uploadvideo = function () {
        if (($rootScope.validURL($rootScope.videoData.link)) && ($rootScope.validvideo($rootScope.videoData.link))) {

            if ($rootScope.formData.video_links.some(videolink => videolink.link === $rootScope.videoData.link)) {
                $rootScope.$emit("showErrorMsg", 'Video already added');
            } else {
                var newobj = {};
                newobj.link = $rootScope.videoData.link;
                newobj.title = 'video link' + ($rootScope.formData.video_links.length + 1);
                newobj.info = '';
                $rootScope.formData.video_links.push(newobj);
                $rootScope.videoData = {};
            }
        } else {
            $rootScope.$emit("showErrorMsg", 'Please upload valid video url.');
            $rootScope.videoData.link = '';
        }
    }

    $rootScope.removeDocumentLink = function (key) {
        $rootScope.formData.document_links.splice(key, 1);
    }

    $rootScope.uploaddocumentlink = function () {
        if ($rootScope.validURL($rootScope.documentData.link)) {

            if ($rootScope.formData.document_links.some(documentlink => documentlink.link === $rootScope.documentData.link)) {
                $rootScope.$emit("showErrorMsg", 'Document already added');
            } else {
                var newobj = {};
                newobj.link = $rootScope.documentData.link;
                newobj.name = 'External link' + ($rootScope.formData.document_links.length + 1);
                newobj.info = '';
                $rootScope.formData.document_links.push(newobj);
                $rootScope.documentData = {};
            }
        } else {
            $rootScope.$emit("showErrorMsg", 'Please enter a valid document link.');
            $rootScope.documentData.link = '';
        }
    }

    $rootScope.setservererrorMsg = function (errors) {
        $rootScope.errorData = {};
        angular.forEach(errors, function (error, no) {
            $rootScope.errorData[no.replace('new', '') + '_errorMsg'] = error[0];
            $rootScope.errorData[no.replace('new', '') + '_error'] = true;
        });
    }

    $rootScope.uploadCover = function (files) {
        $rootScope.errors = [];
        if (files && files.length) {
            var extn = files[0].name.split(".").pop();
            if ($rootScope.imgextensions.includes(extn.toLowerCase())) {
                if (files[0].size <= $rootScope.maxUploadsize) {
                    $rootScope.formData.newcover = files[0];
                } else {
                    $rootScope.errors.push(files[0].name + ' size exceeds 2MB.')
                }
            } else {
                $rootScope.errors.push(files[0].name + ' format unsupported.');
            }
        }
        if ($rootScope.errors.length > 0) {
            $rootScope.$emit("showErrors", $rootScope.errors);
        }
    }

    $rootScope.addData = function (form) {
        $rootScope.seterrorMsg();
        if (form.$valid) {
            $rootScope.loading = true;
            $rootScope.formData.start_date = $filter('date')($rootScope.formData.gr_start_date, 'yyyy-MM-dd');
            if($rootScope.formData.gr_end_date){
                $rootScope.formData.end_date = $filter('date')($rootScope.formData.gr_end_date, 'yyyy-MM-dd');
            }
            if($rootScope.isEdititem){
                webServices.upload('sdgs/'+$rootScope.formData.id, $rootScope.formData).then(function (getData) {
                    $rootScope.loading = false;
                    if (getData.status == 200) {
                        $rootScope.closeModalPopup();
                        $rootScope.$emit("showSuccessMsg", getData.data.message);
                        $state.reload();
                    } else if (getData.status == 401) {
                        $rootScope.setservererrorMsg(getData.data.message);
                        $rootScope.loading = false;
                    } else {
                        $rootScope.$emit("showISError", getData);
                    }
                });
            }else{
                webServices.upload('sdgs', $rootScope.formData).then(function (getData) {
                    $rootScope.loading = false;
                    if (getData.status == 200) {
                        $rootScope.closeModalPopup();
                        $rootScope.$emit("showSuccessMsg", getData.data.message);
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
            } if (!form.description.$valid) {
                $rootScope.errorData.description_error = true;
            } if (!form.start_date.$valid) {
                $rootScope.errorData.start_date_error = true;
            }
            $rootScope.$emit("showErrors", $rootScope.errors);
        }
    }

    $rootScope.addsdgsfiles = function (files) {
        $rootScope.errors = [];
        if ($rootScope.formData.sdgs_files.length < $rootScope.maxUploadFiles) {
            if (files && files.length) {
                if (($rootScope.maxUploadFiles - $rootScope.formData.sdgs_files.length) >= files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var extn = files[i].name.split(".").pop();
                        if ($rootScope.validextensions.includes(extn.toLowerCase())) {
                            if (files[i].size <= $rootScope.maxUploadsize) {
                                var newobj = {};
                                newobj.file = files[i];
                                newobj.filename = files[i].name;
                                newobj.filetype = files[i].type.split("/")[0];
                                newobj.isfile = 1;
                                $rootScope.formData.sdgs_files.push(newobj);
                            } else {
                                $rootScope.errors.push(files[i].name + ' size exceeds 2MB.')
                            }
                        } else {
                            $rootScope.errors.push(files[i].name + ' format unsupported.');
                        }
                    }
                } else {
                    $rootScope.errors.push('You can now upload only ' + ($rootScope.maxUploadFiles - $rootScope.formData.sdgs_files.length) + ' files');
                }
            }
        } else {
            $rootScope.errors.push('You can add only maximum of ' + $rootScope.maxUploadFiles + ' files only');
        }
        if ($rootScope.errors.length > 0) {
            $rootScope.$emit("showErrors", $rootScope.errors);
        }
    }

    $rootScope.addsdgsDocuments = function (files) {
        $rootScope.errors = [];
        if ($rootScope.formData.sdgs_documents.length < $rootScope.maxUploadFiles) {
            if (files && files.length) {
                if (($rootScope.maxUploadFiles - $rootScope.formData.sdgs_documents.length) >= files.length) {
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
                                $rootScope.formData.sdgs_documents.push(newobj);
                            } else {
                                $rootScope.errors.push(files[i].name + ' size exceeds 2MB.')
                            }
                        } else {
                            $rootScope.errors.push(files[i].name + ' format unsupported.');
                        }
                    }
                } else {
                    $rootScope.errors.push('You can now upload only ' + ($rootScope.maxUploadFiles - $rootScope.formData.sdgs_documents.length) + ' files');
                }
            }
        } else {
            $rootScope.errors.push('You can add only maximum of ' + $rootScope.maxUploadFiles + ' files only');
        }
        if ($rootScope.errors.length > 0) {
            $rootScope.$emit("showErrors", $rootScope.errors);
        }
    }

    $rootScope.removeFile = function (key, data) {
        if (!data.isfile) {
            $rootScope.formData.deleted_sdgs_files.push(data);
        }
        $rootScope.formData.sdgs_files.splice(key, 1);
    }

    $rootScope.removeDocuments = function (key, data) {
        if (!data.isfile) {
            $rootScope.formData.deleted_sdgs_documents.push(data);
        }
        $rootScope.formData.sdgs_documents.splice(key, 1);
    }

    $rootScope.inputchange = function () {
        $rootScope.errorData = {};
        $rootScope.seterrorMsg();
    }

}]);