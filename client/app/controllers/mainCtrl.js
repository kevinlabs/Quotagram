angular.module('quotagram').controller('mainCtrl', function ($scope, mainService) {
  $scope.quotes = [];

  // test
  //debugger;

  $scope.saveQuote = (data) => {
    console.log('Save quote from controller! working')
    mainService.saveQuote(data).then(function (response) {
    });
  };

  var getQuote = () => {
    mainService.randomQuote().then(function (response) {
      let tempQuote = response.data;
      console.log('Showing the quotes: ', tempQuote);
      //debugger;
      let tempData = {
        quote: tempQuote.quoteText,
        author: tempQuote.quoteAuthor
      };

      //saveQuote(tempData);
      $scope.quotes.push(tempData);

      console.log('Showing array: ', $scope.quotes);
    });
  };



  var closure = function (num) {
    return function () {
      getQuote();
    };
  };

  var timeOutCounter = function () {
    for (var i = 0; i <= 5; i++) {
      setTimeout(closure(i), i * 2000);
    }
  };

  timeOutCounter();
});