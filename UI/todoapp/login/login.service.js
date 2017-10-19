(function () {
	angular.module('todo').factory('loginService', loginService);

	/** @ngInject */
	function loginService(RestURL, $http) {
		
		return {
			authenticate: authenticate,
			register: register
		}

		function authenticate(user) {
			return $http.post(RestURL.AUTHENTICATE_USER, user);
		}

		function register(user) {
			return $http.post(RestURL.REGISTER_USER, user);
		}
	}
})();