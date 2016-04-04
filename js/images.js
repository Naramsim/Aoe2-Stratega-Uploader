var App = angular.module('App', []);

App.controller('Images', function($scope, $http) {
  $http.get('http://naramsim.github.io/Aoe2-Stratega-Uploader/js/images.json#')
       .then(function(res){
          $scope.images = res.data;
        });
});