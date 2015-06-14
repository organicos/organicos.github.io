angular.module('myApp').service('filesService', ['$modal', function ($modal) {
    
    var self = this;
    
    var callback = function(res){
        return res || '';
    };
    
    var uploadCallback = function(cbk){
        if(angular.isFunction(cbk)) callback = cbk;
    }

    self.showModal = function(cbk){
        uploadCallback(cbk);
        return $modal.open({
            backdrop: true,
            keyboard: true,
            modalFade: true,
            size: 'lg',
            templateUrl: '/partials/files/files_modal.html',
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
                    .success(function(s3SignRes) {
                        
                        uploadToS3(s3SignRes, file);
                        
                    }).error(function(err) {
                    
                        console.error('ERR', err);
                    
                    });
                    
    
                }
            }
        };
        
        var uploadToS3 = function(s3SignRes, file){
            
            $scope.uploading = true;
            
            var xhr = new XMLHttpRequest();
            xhr.open("PUT", s3SignRes.signed_request);
            xhr.setRequestHeader('x-amz-acl', 'public-read');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    $scope.uploading = false;
                    $scope.$apply();
                    persistImage(s3SignRes, file);
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
            
        }
        
        var persistImage = function(s3SignRes, file){
            
            console.log(file);
    
            $http.post(myConfig.apiUrl+'/file', {
                name: $scope.name
                , file_name: file.name
                , type: file.type
                , size: file.size
                , url: s3SignRes.url
            })
            .success(function(res) {
                
                callback(res);
                
            }).error(function(err) {
            
                console.error('ERR', err);
            
            });
            
        }
    
    }

}]);