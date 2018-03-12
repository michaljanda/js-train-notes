let app = angular.module('notes', []);

app.controller('NotesList', ($scope, $http) => {
    $http.get('/api/notes').then((res) => {
        $scope.notes = res.data;
    });
});


