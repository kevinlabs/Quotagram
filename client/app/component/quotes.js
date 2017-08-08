angular.module('quotagram').component('quotes', {
  controller: 'mainCtrl',
  bindings: {
    quote: '<'
  },
  templateUrl: 'views/quotes.html'
  });
