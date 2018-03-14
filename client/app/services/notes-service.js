angular.module('notes').factory('notesService', ($http) => {
  return {
    list: () => {
      return $http.get('/api/notes').then((res) => {
        return res.data;
      });
    },
    update: (n) => {
      return $http.put('/api/notes', n).then((res) => {
        return res.data;
      });
    }
  };
});