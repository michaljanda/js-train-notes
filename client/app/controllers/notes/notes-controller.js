angular.module('notes').controller('NotesCtrl', ($scope, notesService, $state, $transitions, $location) => {

  let queryParams = ['label', 'text'];
  $scope.query = {};
  updateQueryFromUrl();

  function load() {
    console.log('loading');
    notesService.list($scope.query).then(data => {
      $scope.notes = data;
      if ($state.params.id) {
        selectDetail();
      }
    });
  }

  load();

  let debouncedLoad = _.debounce(() => {
    $location.search($scope.query);
    $scope.$apply();
  }, 300);

  $scope.$watchCollection('query', debouncedLoad);


  $scope.goToDetail = (note) => {
    $state.go('notes.detail', { id: note.id });
  };

  let unregisterOnChangeEvent = $transitions.onSuccess({}, (t) => {
    updateQueryFromUrl();
    if (!_.isEqual($scope.query, _.pick(t.params('from'), queryParams))) {
      load();
    }
    if (+$state.params.id !== _.get($scope, 'selecte.id')) {
      selectDetail();
    }
  });

  $scope.$on('$destroy', () => {
    unregisterOnChangeEvent();
  });

  function updateQueryFromUrl() {
    $scope.query = _.pick($state.params, queryParams);
  }

  function selectDetail() {
    $scope.selected = _.find($scope.notes, { id: +$state.params.id });
    $scope.edited = _.cloneDeep($scope.selected);
  }

});
