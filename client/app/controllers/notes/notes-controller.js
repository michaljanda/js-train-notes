angular.module('notes').controller('NotesCtrl', ($scope, notesService) => {
  console.log('jj');
  notesService.list().then(res => {
    $scope.notes = res.data;
  });
});
