(function () {
	angular.module('todo').controller('applicationCtrl', applicationCtrl);


	/** @ngInject */
	function applicationCtrl($scope) {
		$scope.test = "testtttt";
	}
})();