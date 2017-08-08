angular.module('quotagram').service('mainService', function ($http, $log) {

  this.randomQuote = function () {
    const baseUrl = "/api/quotes";
    return $http({
      method: 'GET',
      url: baseUrl,
    }).then(function (response) {
      console.log('Quote is back!', response);
      return (response);
    });
  };

  this.saveQuote = function (data) {
    const baseUrl = "/api/quotes/save";
    return $http({
      method: 'POST',
      url: baseUrl,
      data: data
    }).then(function (response) {
      return (response);
    });
  };

  this.randomBible = function () {
    const baseUrl = "/api/bibleQuotes";
    return $http({
      method: 'GET',
      url: baseUrl,
    }).then(function (response) {
      console.log('Quote is back!', response);
      return (response);
    });
  };

});