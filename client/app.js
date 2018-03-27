let app = angular.module('notes', ['ui.router', 'ui.bootstrap', 'ngAnimate']);

app.config(($stateProvider, $urlRouterProvider) => {

  $stateProvider
    .state('notes', {
      url: '/notes?label&text',
      controller: 'NotesCtrl',
      templateUrl: 'app/controllers/notes/notes.html',
      reloadOnSearch: false
    })
    .state('notes.detail', {
      url: '/:id',
      templateUrl: 'app/controllers/notes/note-edit.html',
      controller: 'NoteEditCtrl'
    })
    .state('notes.add', {
      url: '/add',
      templateUrl: 'app/controllers/notes/note-add.html',
      controller: 'NoteAddCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'app/controllers/about/about.html'
    });
 
  $urlRouterProvider.otherwise('/notes');
});
