angular.module('notes').controller('NoteDetailCtrl', ($scope, notesService, $state) => {

  $scope.update = () => {
    notesService.update($scope.edited).then((updated) => {
      _.merge($scope.selected, updated);
    });
  };

  $scope.remove = () => {
    notesService.remove($scope.edited.id).then(() => {
      _.remove($scope.notes, {id: $scope.edited.id});
      $state.go('notes');
    });
  };

});