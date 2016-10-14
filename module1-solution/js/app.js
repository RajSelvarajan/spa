(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchMenu = "";
  $scope.lunchMessage = "";
  $scope.lunchMessageStyle = ""; //OPTIONAL WORK
  $scope.lunchMenuStyle = "";//OPTIONAL WORK

  $scope.displayMessage = function () {
    var separator =",";
    var lunchMenuCount = calculateLunchMenuCount($scope.lunchMenu,separator);
    if (lunchMenuCount==0) {
      $scope.lunchMessage ="Please enter data first.";
      $scope.lunchMessageStyle = "color: red;";
      $scope.lunchMenuStyle = "border:1px solid red;";
    }
    else if (lunchMenuCount>3) {
      $scope.lunchMessage ="Too much!";
      $scope.lunchMessageStyle = "color: green;";
      $scope.lunchMenuStyle = "border:1px solid green;";
    }
    else {
      $scope.lunchMessage ="Enjoy!";
      $scope.lunchMessageStyle = "color: green;";
      $scope.lunchMenuStyle = "border:1px solid green;";
    }
  };

  //  *** Please note that empty items are not considered towards the count ***
  function calculateLunchMenuCount(string, separator) {
    var lunchMenuArray = string.split(separator);
    var count = 0;
    for (var i = 0; i < lunchMenuArray.length; i++) {
      if (lunchMenuArray[i].trim().length>0) {
        count++
      }
    }
    return count;
  }
}

})();
