angular.module('notes').factory('modalService', function ($uibModal) {


  return {
    confirm: (opts) => {
      return showModal(_.merge({
        header: 'Confirmation',
        msg: 'Do you really want to proceed this action?'
      }, opts))
    }
  };

  function showModal(opts) {
    return $uibModal.open({
      templateUrl: 'app/services/modal-service.html',
      controller: ($scope, $uibModalInstance) => {
        $scope.instance = $uibModalInstance;
        $scope.opts = opts;
      }
    }).result;
  }


});