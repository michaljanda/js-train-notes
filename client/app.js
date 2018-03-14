let app = angular.module('notes', ['ui.router']);

app.config(($stateProvider, $urlRouterProvider) => {

  $stateProvider
    .state('notes', {
      url: '/notes',
      controller: 'NotesCtrl',
      templateUrl: 'app/controllers/notes/notes.html'
    })
    .state('notes.detail', {
      url: '/:id',
      templateUrl: 'app/controllers/notes/note-detail.html',
      controller: 'NoteDetailCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'app/controllers/about/about.html'
    });
 
  $urlRouterProvider.otherwise('/notes');
});
