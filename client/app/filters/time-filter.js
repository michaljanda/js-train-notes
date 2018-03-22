angular.module('notes').filter('time', function () {
  let funcMap = {
    time: function (timestamp) {
      return new Date(timestamp).toLocaleTimeString();
    },
    whole: function (timestamp) {
      return new Date(timestamp).toLocaleString();
    }
  };

  return function (timestamp, format = 'whole') {
    return funcMap[format](timestamp);
  };


});