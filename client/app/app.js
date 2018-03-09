angular.module('jsTrain', []);
angular.module('jsTrain').controller('notesCtrl', ($scope, notesService) => {
  $scope.notes = [];

  notesService.list().then((res) => {
    $scope.notes = res.data;
  });

});