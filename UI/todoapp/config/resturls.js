(function () {
	angular.module('todo').factory('RestURL', resturls);

	function resturls() {
		return {
			REGISTER_USER: '/api/user/register',
			AUTHENTICATE_USER: '/api/user/authenticate',
			TODOS: '/api/dashboard/todos',
			CHECK_AVAILABILITY: '/api/user/check-available'
		}
	}
})();