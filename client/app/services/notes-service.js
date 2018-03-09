angular.module('jsTrain').factory('notesService', function ($http) {
    return {
      list: function () {
        return $http.get('api/notes');
      }
    }
});