(function() {
  "use strict";

  var app = angular.module("app", []);

  app.controller("productsCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get("https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js").then(function(response){
        $scope.productData = response.data;
        $scope.allProducts = $scope.productData.products;
        $scope.visibleProducts = $scope.allProducts;
        $scope.pageSettings = {cols: 3};
        $scope.setupProducts();
        $scope.setupPage();

      },
      function(error){
        console.log(error.data);
      })
    }

    $scope.setupPage = function() {
      $('head>title').text($scope.productData.pageTitle);
      $('.navbar-fixed-top p.navbar-brand').text($scope.productData.pageTitle);
      $('body>footer .navbar-brand').text($scope.productData.extraInfo);
    }

    $scope.setupProducts = function() {
      $scope.numProducts = $scope.allProducts.length;
      $scope.numVisProducts = $scope.visibleProducts.length;
      //set up products data to be used with 3 column list
      $scope.products = []
      var row=0, col=0, productIndex=0;
      while (productIndex < $scope.numVisProducts){
        $scope.products[row]=[];
        while (col<$scope.pageSettings.cols){
          if (productIndex >= $scope.numVisProducts){
            break;
          }
          var product = $scope.visibleProducts[productIndex];
          $scope.products[row].push({name:product.name, 
           image:'http:'+product.mainImage.ref,
           price:$scope.priceString(product.msrpInCents)});
          col++, productIndex++;
        }
        row++;
        col=0;
      }
    }

    $scope.priceString = function(cents){
      return '$'+cents/100;
    }

    $scope.filterUnderAmount = function(amount){
      $scope.visibleProducts=[];
      var state = $('input[name="filter-checkbox"]').bootstrapSwitch('state')
      if(state){

        var productIndex=0;
        while (productIndex < $scope.numProducts){
          var product = $scope.allProducts[productIndex];
          var price = product.msrpInCents/100;
          if (price<=amount){
            $scope.visibleProducts.push(product);
          }
          productIndex++;
        }
      }
      else{
        $scope.visibleProducts=$scope.allProducts;
      }

      $scope.setupProducts();//must setup products again after filter applied
    }

    $scope.sortBy = function(criteria){
      $scope.compareProp = criteria;
      
      //initialize or toggle sign for ascending/descending sort
      if($scope.compareProp!=$scope.PrevCompareProp){
        $scope.compareSign = 1;
        $scope.PrevCompareProp=$scope.compareProp;
      }
      else{
        $scope.compareSign = -$scope.compareSign;
      }

      $scope.visibleProducts.sort($scope.compare);
      $scope.setupProducts();//must setup products again after sort applied
    }

    $scope.compare = function compare(a,b) {
      if (a[$scope.compareProp] < b[$scope.compareProp])
        return -$scope.compareSign;
      if (a[$scope.compareProp] > b[$scope.compareProp])
        return $scope.compareSign;
      return 0;
    }

    window.$scope = $scope;
});


}());
