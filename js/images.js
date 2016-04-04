var App = angular.module('App', []);

App.controller('Images', function($scope, $http) {
  $http.get('js/images.json')
       .then(function(res){
          $scope.images = res.data;
        });
});