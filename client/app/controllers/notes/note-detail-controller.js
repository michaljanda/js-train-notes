angular.module('notes').controller('NoteDetailCtrl', ($scope, notesService) => {

  $scope.update = () => {
    notesService.update($scope.edited).then((updated) => {
      _.merge($scope.selected, updated);
    });
  };

});