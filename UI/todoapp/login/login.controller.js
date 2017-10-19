(function () {
	angular.module('todo').controller('loginCtrl', loginCtrl);

	/** @ngInject */
	function loginCtrl(loginService, $scope) {
		$scope.registerUser = registerUser;
		$scope.authenticateUser = authenticateUser;

		function registerUser(user) {
			
		}

		function authenticateUser(user) {

		}
	}
})();