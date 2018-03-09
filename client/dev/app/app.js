'use strict';

angular.module('jsTrain', []);
angular.module('jsTrain').controller('notesCtrl', function ($scope, notesService) {
  $scope.notes = [];

  notesService.list().then(function (res) {
    $scope.notes = res.data;
  });
});
//# sourceMappingURL=app.js.map
