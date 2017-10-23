(function () {
	angular.module('todo').factory('loginService', loginService);

	/** @ngInject */
	function loginService(RestURL, $http) {
		
		return {
			authenticate: authenticate,
			register: register,
			checkAvailable: checkAvailable,
		}

		function authenticate(user) {
			return $http.post(RestURL.AUTHENTICATE_USER, user);
		}

		function register(user) {
			return $http.post(RestURL.REGISTER_USER, user);
		}

		function checkAvailable(name, value) {
			return $http.get(RestURL.CHECK_AVAILABILITY + '?' + name + '=' + value);
		}
	}
})();