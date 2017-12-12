(function () {
	angular.module('todo').factory('dashboardService', dashboardService);

	/** @ngInject */
	function dashboardService(RestURL, $http) {
		return {
			retrieveForCurrentUser: retrieveForCurrentUser,
			saveForUser: saveForUser
		}

		function retrieveForCurrentUser() {
			return $http.get(RestURL.TODOS);
		}

		function saveForUser(todo) {
			return $http.post(RestURL.TODOS, todo);
		}
	}
	
})();