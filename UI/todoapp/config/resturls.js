(function () {
	angular.module('todo').factory('RestURL', resturls);

	function resturls() {
		return {
			REGISTER_USER: '/api/user/register',
			AUTHENTICATE_USER: '/api/authenticate'
		}
	}
})();