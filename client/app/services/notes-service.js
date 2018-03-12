angular.module('notes').factory('notesService', ($http) => {
  return {
    list: () => {
      return $http.get('/api/notes', (res) => {
        return res.data;
      });
    }
  };
});