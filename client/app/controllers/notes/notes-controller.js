angular.module('notes').controller('NotesCtrl', ($scope, notesService, $state) => {

  notesService.list().then(res => {
    $scope.notes = res.data;
    if ($state.params.id) {
      selectDetail();
    }
  });

  function selectDetail() {
    $scope.selected = _.find($scope.notes, {id: +$state.params.id});
  }
  
});
