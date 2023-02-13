(function(){
  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems);

  function FoundItems() {
    var ddo = {
      templateUrl: 'loader/itemsloaderindicator.template.html',
      scope:{
        found:'<',
        onRemove: '&'
      }
    };
    console.log(ddo);
    return ddo;
  }
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var list = this;



    list.searchTerm;
    list.found = [];
    list.getMatchedMenuItems= function(searchTerm){
    list.ElementFound = 0;
    var promise = MenuSearchService.getMatchedMenuItems();
      promise.then(function (response) {
        const charso = searchTerm.split(" ");
        for(var i = 0; i<response.data.A.menu_items.length ; i++){
          const chars = response.data.A.menu_items[i].description.split(" ");
          for(var ii = 0;ii<chars.length;ii++ ){

            for(var iii = 0;iii<charso.length;iii++){
            if(chars[ii] == charso[iii]) {
              var item = {
                description:response.data.A.menu_items[i].description,
                name:response.data.A.menu_items[i].name
              };
            list.found.push(item);
          }
        }

          }
        }
        if(list.found.length == 0){
          list.ElementFound = 1;
        }
        console.log(list.found);
      });
    }

    list.removeItem = function(itemIndex){
      list.found.splice(itemIndex, 1);
      console.log(list.found[itemIndex]);
    };
    list.removeItem = function(){
      list.found = [];
    };

  }

MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http){
    var MenuS = this;
    MenuS.getMatchedMenuItems = function(){
     return $http({
        method: "GET",
        url:("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json")
      }) };


    };
})();
