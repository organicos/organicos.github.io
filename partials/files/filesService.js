angular.module('myApp').service('filesService', ['$modal', function ($modal) {
    
    var self = this;
    
    var uploadCallback = '';

    self.showModal = function(callback){
        uploadCallback = callback;
        return $modal.open({
            backdrop: true,
            keyboard: true,
            modalFade: true,
            size: 'md',
            templateUrl: '/partials/files/upload_file_modal.html',
            controller: filesUploadFileModalCtrl
        }).result;
    };
    
    var filesUploadFileModalCtrl = function (Upload, $scope, $http, $modalInstance, myConfig) {
        
        $scope.progress = 4;
        $scope.uploading = false;
    
        $scope.setFiles = function(files){
            $scope.files = files;
        }
    
        $scope.modalOptions = {
            ok: function (result) {
                $modalInstance.dismiss('order_review');
            },
            close: function (result) {
                $modalInstance.dismiss('cancel');
            }
        };
        
        $scope.upload = function (files) {
            
            if (files && files.length) {
                
                for (var i = 0; i < files.length; i++) {
    
                    var file = files[i];
                    
                    $http.get(myConfig.apiUrl+'/s3/sign/', { params: {
                        file_name: file.name
                        , file_type: file.type
                    }})
                    .success(function(res) {
                        
                        $scope.uploading = true;
                        
                        var xhr = new XMLHttpRequest();
                        xhr.open("PUT", res.signed_request);
                        xhr.setRequestHeader('x-amz-acl', 'public-read');
                        xhr.onload = function() {
                            if (xhr.status === 200) {
                                $scope.uploading = false;
                                varToUpdate = res.url;
                                $scope.$apply();
                            }
                        };
                        xhr.upload.onprogress = function(evt){
                            $scope.progress = ((100 / evt.total) * evt.loaded).toFixed(0);
                            $scope.$apply();
                        };
    
                        xhr.onerror = function() {
                            $scope.uploading = false;
                            alert("Could not upload file.");
                        };
                        xhr.send(file);
                        
                    }).error(function(err) {
                    
                        console.error('ERR', err);
                    
                    });
                    
    
                }
            }
        };
    }

}]);