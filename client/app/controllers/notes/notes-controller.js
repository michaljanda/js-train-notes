angular.module('notes').controller('NotesCtrl', ($scope, notesService) => {

  notesService.list().then(res => {
    $scope.notes = res.data;
  });
  
});
