angular.module('Cerveja.Portfolio')
	.controller('PortfolioCtrl', 
		function(BeersModel, $scope,  $uibModal, $log) {


			var beersCtrl = this;
			$scope.items = ['item1', 'item2', 'item3', 'item4'];
			beersCtrl.selectedBeer;

			  $scope.animationsEnabled = true;

			  beersCtrl.greetings = 'xuxa';

			 beersCtrl.getAllBeers = function() {

				BeersModel.all()
					.then(function(result) {
						beersCtrl.beers = result;
						console.log("all beers: " + beersCtrl.beers);
					}, function(reason) {
						console.log('REASON:'+ reason);	
					});
					
			};

			  $scope.open = function (size, beer) {

			  	beersCtrl.selectedBeer = beer;
			  
			    var modalInstance = $uibModal.open({
			      animation: $scope.animationsEnabled,
			      templateUrl: 'myModalContent.html',
			      controller: 'ModalInstanceCtrl',
			      size: size,
			      resolve: {
			      	selectedBeer : function() {
			      		return beersCtrl.selectedBeer;
			      	}
			      	,
			      	items: function () {
			          return $scope.items;
			        }
			      }
			    });

			    modalInstance.result.then(function (selectedItem) {
			      $scope.selected = selectedItem;
			    }, function () {
			      $log.info('Modal dismissed at: ' + new Date());
			     
			    });
			  };

			  $scope.toggleAnimation = function () {
			    $scope.animationsEnabled = !$scope.animationsEnabled;
			  };

			  
			  beersCtrl.getAllBeers();	

	});


angular.module('Cerveja.Portfolio')
	.controller('ModalInstanceCtrl',
		function ($scope, $uibModalInstance, items, selectedBeer) {

	  $scope.items = items;
	  $scope.selected = {
	    item: $scope.items[0]
	  };

	  $scope.selectedBeer = selectedBeer;

	  $scope.ok = function () {
	    alert('now');
	    $uibModalInstance.close($scope.selected.item);
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
});	