'use strict';

angular.module('quotagram', []).config(function () {});
'use strict';

angular.module('quotagram').component('mainApp', {
  controller: 'mainCtrl',
  templateUrl: 'views/mainview.html'

});
'use strict';

angular.module('quotagram').component('navbar', {
  controller: 'mainCtrl',
  templateUrl: 'views/navbar.html'

});
'use strict';

angular.module('quotagram').component('quotes', {
  controller: 'mainCtrl',
  bindings: {
    quote: '<'
  },
  templateUrl: 'views/quotes.html'
});
'use strict';

angular.module('quotagram').service('mainService', ["$http", "$log", function ($http, $log) {

  this.randomQuote = function () {
    var baseUrl = "/api/quotes";
    return $http({
      method: 'GET',
      url: baseUrl
    }).then(function (response) {
      console.log('Quote is back!', response);
      return response;
    });
  };

  this.saveQuote = function (data) {
    var baseUrl = "/api/quotes/save";
    return $http({
      method: 'POST',
      url: baseUrl,
      data: data
    }).then(function (response) {
      return response;
    });
  };

  this.randomBible = function () {
    var baseUrl = "/api/bibleQuotes";
    return $http({
      method: 'GET',
      url: baseUrl
    }).then(function (response) {
      console.log('Quote is back!', response);
      return response;
    });
  };
}]);
'use strict';

angular.module('quotagram').controller('mainCtrl', ["$scope", "mainService", function ($scope, mainService) {
  $scope.quotes = [];

  // test
  //debugger;

  $scope.saveQuote = function (data) {
    console.log('Save quote from controller! working');
    mainService.saveQuote(data).then(function (response) {});
  };

  var getQuote = function getQuote() {
    mainService.randomQuote().then(function (response) {
      var tempQuote = response.data;
      console.log('Showing the quotes: ', tempQuote);
      //debugger;
      var tempData = {
        quote: tempQuote.quoteText,
        author: tempQuote.quoteAuthor
      };

      //saveQuote(tempData);
      $scope.quotes.push(tempData);

      console.log('Showing array: ', $scope.quotes);
    });
  };

  var closure = function closure(num) {
    return function () {
      getQuote();
    };
  };

  var timeOutCounter = function timeOutCounter() {
    for (var i = 0; i <= 5; i++) {
      setTimeout(closure(i), i * 2000);
    }
  };

  timeOutCounter();
}]);
//# sourceMappingURL=bundle.js.map
