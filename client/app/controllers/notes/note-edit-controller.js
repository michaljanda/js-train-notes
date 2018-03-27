angular.module('notes').controller('NoteEditCtrl', ($scope, notesService, $state, $uibModal) => {
  $scope.update = () => {
    notesService.update($scope.edited).then((updated) => {
      _.merge($scope.selected, updated);
    });
  };

  $scope.remove = () => {
    let note = $scope.edited;
    $uibModal.open({
      templateUrl: 'app/controllers/notes/note-remove-modal.html',
      controller: ($scope, $uibModalInstance) => {
          $scope.note = note;
          $scope.instance = $uibModalInstance;
      }
    }).result.then(() => {
      notesService.remove($scope.edited.id).then(() => {
        _.remove($scope.notes, {id: $scope.edited.id});
        $state.go('notes');
      });
    });

  };

});