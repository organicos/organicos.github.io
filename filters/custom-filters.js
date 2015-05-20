var customFilters = angular.module('myApp.custom-filters', ['ngRoute']);

customFilters.filter('groupIntoRowsBy', function() {
    return function(input, count) {
      var rows = [];
      for (var i = 0; i < input.length; i++) {
        if ( i % count == 0) rows.push([]);
         rows[rows.length-1].push(input[i]);
      }
      return rows;
    }
});