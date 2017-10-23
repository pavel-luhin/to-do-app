(function () {
	angular.module('todo').controller('loginCtrl', loginCtrl);

	/** @ngInject */
	function loginCtrl(loginService, $scope, $state) {
		$scope.registerUser = registerUser;
		$scope.authenticateUser = authenticateUser;
		$scope.emailAvailable = true;
		$scope.usernameAvailable = true;

		function registerUser(user, registerForm) {
			if (!registerForm.$valid) return;

			loginService.register(user).then(function(data) {

			}, function(error) {

			});
		}

		function authenticateUser(user, loginForm) {
			if (!loginForm.$valid) return;
			
			loginService.authenticate(user).then(function(data) {
				$state.go('dashboard');
			}, function(error) {
				console.log(error);
				alert(error.data);
			});
		}
	}
})();