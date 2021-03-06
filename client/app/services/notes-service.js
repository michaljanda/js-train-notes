angular.module('notes').factory('notesService', ($http) => {

  const baseUrl = '/api/notes';

  return {
    list: (query) => {
      return $http.get(baseUrl, {params: query}).then((res) => {
        return res.data;
      });
    },
    update: (n) => {
      return $http.put(baseUrl, n).then((res) => {
        return res.data;
      });
    },
    remove: (id) => {
      return $http.delete(baseUrl, {params: {id: id}}).then((res) => {
        return res.data;
      });
    },
    removeList: (ids) => {
      return $http.post(baseUrl + '/batch-delete', ids).then((res) => {
        return res.data;
      });
    },
    add: (n) => {
      return $http.post(baseUrl, n).then((res) => {
        return res.data;
      });
    }
  };
});