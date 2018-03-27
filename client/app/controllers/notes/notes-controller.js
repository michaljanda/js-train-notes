angular.module('notes').controller('NotesCtrl', ($scope, notesService, $state, $transitions, $location, modalService) => {

  $scope.isAddState = function () {
    return $state.is('notes.add');
  };

  let queryParams = ['label', 'text'];
  $scope.query = {};
  updateQueryFromUrl();

  function load() {
    console.log('loading');
    notesService.list($scope.query).then(data => {
      $scope.notes = data;
      if (getUrlId() > -1) {
        selectDetail();
      }
    });
  }

  $scope.removeNote = function (id) {
    notesService.remove(id).then(() => {
        _.remove($scope.notes, {id: id});
        if (id === getUrlId()) {
          $state.go('notes');
        }
    });
  };

  $scope.toggleCheck = function () {
    let newState = $scope.notes.length !== $scope.numberOfSelected();
    // _.map($scope.notes, function (n) {
    //   n.$$selected = newState;
    // });
    
    // event way
    $scope.$broadcast('note-panel:updateCheck', newState);
    
  };

  $scope.removeSelected = function () {
    modalService.confirm({msg: `Do you really want to remove ${$scope.numberOfSelected()} selected notes?`}).then(() => {
      let ids = _.map(getSelectedNotes(), 'id');
      notesService.removeList(ids).then(() => {
        _.remove($scope.notes, function (n) {
          return _.includes(ids, n.id);
        });
      });
    });
  };

  $scope.numberOfSelected = function () {
    return getSelectedNotes().length;
  };

  function getSelectedNotes() {
    return _.filter($scope.notes, {$$selected: true});
  }

  load();

  let debouncedLoad = _.debounce(() => {
    $location.search($scope.query);
    $scope.$apply();
  }, 300);

  $scope.$watchCollection('query', debouncedLoad);

  let unregisterOnChangeEvent = $transitions.onSuccess({}, (t) => {
    updateQueryFromUrl();
    if (!_.isEqual($scope.query, _.pick(t.params('from'), queryParams))) {
      load();
    }
    if (getUrlId() !== _.get($scope, 'selected.id')) {
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

  function getUrlId() {
    return +$state.params.id;
  }

});
