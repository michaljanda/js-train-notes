angular.module('notes').controller('NotesCtrl', ($scope, notesService, $state, $transitions) => {

  notesService.list().then(data => {
    $scope.notes = data;
    if ($state.params.id) {
      selectDetail();
    }
  });

  $scope.goToDetail = (note) => { 
    $state.go('notes.detail', {id: note.id});
  };

  let unregisterOnChangeEvent = $transitions.onSuccess({}, () => {
     selectDetail();
  });

  $scope.$on('$destroy', () => {
      unregisterOnChangeEvent();
  });

  function selectDetail() {
    $scope.selected = _.find($scope.notes, {id: +$state.params.id});
    $scope.edited = _.cloneDeep($scope.selected);
  }
  
});
