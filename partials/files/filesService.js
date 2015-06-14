angular.module('myApp').service('filesService', ['$modal', function ($modal) {
    
    var self = this;
    var multiple = false;
    
    var setMultiple = function(mtpl){
        multiple = mtpl || false;
    }
    
    var getMultiple = function(){
        return multiple;
    }
    
    var callback = function(res){
        return res || '';
    };
    
    var uploadCallback = function(cbk){
        if(angular.isFunction(cbk)) callback = cbk;
    }

    self.manageFiles = function(cbk, multiple){

        setMultiple(multiple);

        uploadCallback(cbk);
        
        return $modal.open({
            backdrop: true,
            keyboard: true,
            modalFade: true,
            size: 'lg',
            templateUrl: '/partials/files/files_modal.html',
            controller: filesModalCtrl
        }).result;
    };

    self.selectFile = function(cbk, multiple){

        setMultiple(multiple);

        uploadCallback(cbk);
        
        return $modal.open({
            backdrop: true,
            keyboard: true,
            modalFade: true,
            size: 'lg',
            templateUrl: '/partials/files/files_modal.html',
            controller: selectFilesModalCtrl
        }).result;
    };
    
    var selectFilesModalCtrl = function (Upload, $scope, $http, $modalInstance, myConfig, $filter) {
        
        $scope.progress = 4;
        $scope.uploading = false;
        $scope.audios = [];
        $scope.videos = [];
        $scope.images = [];
        $scope.file = {};
        $scope.selectedItems = [];

        $scope.prepareModalContent = function(fileType){
            
            if(['images', 'videos', 'audios'].indexOf(fileType) > -1){
                
                if($scope[fileType].length == 0){
                    
                    $http.get(myConfig.apiUrl+'/files/'+fileType)
                    .success(function(res) {
                        
                        $scope[fileType] = res;
                        
                    }).error(function(err) {
                    
                        console.error('ERR', err);
                    
                    });
                    
                }
                
            }
            
        }

        $scope.modalOptions = {
            ok: function (result) {
                var items = getMultiple() ? $scope.selectedItems : $scope.selectedItems[0];
                callback(items);
                $scope.selectedItems
                $modalInstance.dismiss('files_selected');
            },
            close: function (result) {
                $modalInstance.dismiss('cancel');
            }
        };
        
        $scope.selectFile = function(file, finishSelection){
            
            if(getMultiple()){
                $scope.selectedItems.push(file);
            } else {
                $scope.selectedItems = [file];
                if(finishSelection){
                    $scope.modalOptions.ok();
                }
            }
        }
        
        $scope.isSelectedFile = function(file){
            var elementPos = $scope.selectedItems.map(function(x) {return x._id; }).indexOf(file._id);
            return elementPos > -1 ? true : false;
        }
        
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
            
            $http.post(myConfig.apiUrl+'/file', {
                name: $scope.name
                , file_name: file.name
                , type: file.type
                , size: file.size
                , url: s3SignRes.url
            })
            .success(function(res) {
                
                $modalInstance.dismiss('files_selected');
                
                callback(res);
                
            }).error(function(err) {
            
                console.error('ERR', err);
            
            });
            
        }
    
    }

    var filesModalCtrl = function (Upload, $scope, $http, $modalInstance, myConfig, $filter) {

        $scope.progress = 4;
        $scope.uploading = false;
        $scope.audios = [];
        $scope.videos = [];
        $scope.images = [];
        $scope.file = {};
        $scope.selectedItems = [];

        $scope.prepareModalContent = function(fileType){
            
            if(['images', 'videos', 'audios'].indexOf(fileType) > -1){
                
                if($scope[fileType].length == 0){
                    
                    $http.get(myConfig.apiUrl+'/files/'+fileType)
                    .success(function(res) {
                        
                        $scope[fileType] = res;
                        
                    }).error(function(err) {
                    
                        console.error('ERR', err);
                    
                    });
                    
                }
                
            }
            
        }

        $scope.modalOptions = {
            ok: function (result) {
                var items = getMultiple() ? $scope.selectedItems : $scope.selectedItems[0];
                callback(items);
                $scope.selectedItems
                $modalInstance.dismiss('files_selected');
            },
            close: function (result) {
                $modalInstance.dismiss('cancel');
            }
        };
        
        $scope.selectFile = function(file, finishSelection){
            
            if(getMultiple()){
                $scope.selectedItems.push(file);
            } else {
                $scope.selectedItems = [file];
                if(finishSelection){
                    $scope.modalOptions.ok();
                }
            }
        }
        
        $scope.isSelectedFile = function(file){
            var elementPos = $scope.selectedItems.map(function(x) {return x._id; }).indexOf(file._id);
            return elementPos > -1 ? true : false;
        }
        
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
            
            $http.post(myConfig.apiUrl+'/file', {
                name: $scope.name
                , file_name: file.name
                , type: file.type
                , size: file.size
                , url: s3SignRes.url
            })
            .success(function(res) {
                
                $modalInstance.dismiss('files_selected');
                
                callback(res);
                
            }).error(function(err) {
            
                console.error('ERR', err);
            
            });
            
        }
    
    }
    
}]);