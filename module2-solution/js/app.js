(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;
  
  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtList = this;

  alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // Pre-defined List of shopping items to buy
  var toBuyItems = [
  { name: "cookies", quantity: 10 },
  { name: "chips", quantity: 4 },
  { name: "apples", quantity: 10 },
  { name: "oranges", quantity: 5 },
  { name: "milk", quantity: 2 },
  { name: "orange juice", quantity: 2 },
  { name: "pretzels", quantity: 4 }
  ];

// List of shopping items already bought, initially zero
  var alreadyBoughtItems = [];

  function addToBoughtList(itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    alreadyBoughtItems.push(item);
  };

  function removeFromToBuyList(itemIndex) {
    toBuyItems.splice(itemIndex, 1);
  };

  service.buyItem = function (itemIndex) {
    addToBoughtList(toBuyItems[itemIndex].name,toBuyItems[itemIndex].quantity);
    removeFromToBuyList(itemIndex);
  }

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };

}

})();
