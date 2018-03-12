let app = angular.module('notes', ['ui.router']);

app.config(($stateProvider, $urlRouterProvider) => {

  $stateProvider.state('list', {
    url: '/',
    controller: 'NotesCtrl',
    templateUrl: 'app/controllers/notes/notes.html'
  });

  $urlRouterProvider.otherwise('/');
});
