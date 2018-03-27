angular.module('notes').controller('NoteAddCtrl', ($scope, notesService) => {

  reset();

  $scope.add = function () {
    notesService.add($scope.edited).then((added) => {
      $scope.notes.push(added);
      reset();
    });
  };

  function reset() {
    $scope.edited = {};
  }

});