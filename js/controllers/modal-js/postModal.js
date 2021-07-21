app.controller('PostModalController', ['$timeout', '$state', '$stateParams', 'webServices', 'utility', '$rootScope', '$filter', function ($timeout, $state, $stateParams, webServices, utility, $rootScope, $filter) {
    if (!$rootScope.isEdititem) {
        $rootScope.formData = {};
        $rootScope.formData.documents = [];
    } else {
        $rootScope.formData.deleted_documents  = [];
    }

    $rootScope.errorData = {};

    $rootScope.seterrorMsg = function () {
        $rootScope.errorData.content_errorMsg = 'Enter Post Content';
        $rootScope.errorData.document_errorMsg = 'Please upload Documents';
    }

    $rootScope.setservererrorMsg = function (errors) {
        $rootScope.errorData = {};
        angular.forEach(errors, function (error, no) {
            $rootScope.errorData[no.replace('new', '') + '_errorMsg'] = error[0];
            $rootScope.errorData[no.replace('new', '') + '_error'] = true;
        });
    }

    $rootScope.addData = function (form) {
        $rootScope.seterrorMsg();
        if (form.$valid) {
            $rootScope.loading = true;
            if($rootScope.isEdititem){
                webServices.upload('post/'+$rootScope.formData.id, $rootScope.formData).then(function (getData) {
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
                webServices.upload('post', $rootScope.formData).then(function (getData) {
                    $rootScope.loading = false;
                    if (getData.status == 200) {
                        $rootScope.closeModalPopup();
                        $rootScope.getSGAData();
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
            if (!form.content.$valid) {
                $rootScope.errorData.content_error = true;
            } if (!form.documents.$valid) {
                $rootScope.errorData.document_error = true;
            }
            $rootScope.$emit("showErrors", $rootScope.errors);
        }
    }

    $rootScope.removeDocuments = function (key, data) {
        if (!data.isfile) {
            $rootScope.formData.deleted_documents.push(data);
        }
        $rootScope.formData.documents.splice(key, 1);
    }

    $rootScope.addDocuments = function (files) {
        $rootScope.errors = [];
        if ($rootScope.formData.documents.length < $rootScope.maxUploadFiles) {
            if (files && files.length) {
                if (($rootScope.maxUploadFiles - $rootScope.formData.documents.length) >= files.length) {
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
    }

    $rootScope.inputchange = function () {
        $rootScope.errorData = {};
        $rootScope.seterrorMsg();
    }

}]);