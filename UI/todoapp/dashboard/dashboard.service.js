(function () {
	angular.module('todo').factory('dashboardService', dashboardService);

	/** @ngInject */
	function dashboardService(RestURL, $http) {
		return {
			retrieveForUser: retrieveForUser,
			saveForUser: saveForUser
		}

		function retrieveForUser(user) {
			return $http.get(RestURL.TODOS);
		}

		function saveForUser(todo) {
			return $http.post(RestURL.TODOS, todo);
		}
	}
	
})();