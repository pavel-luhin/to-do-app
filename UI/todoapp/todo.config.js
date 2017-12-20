(function() {

	angular.module('todo').config(config);

	/** @ngInject */
	function config($httpProvider) {
		$httpProvider.interceptors.push(response401ErrorInterceptor);
	}

	/** @ngInject */
	function response401ErrorInterceptor($q, $location, toastr) {
		return {
            'responseError': function (rejection) {

                if (rejection.status === 401) {
                	toastr.error('To view this page you have to log in', 'Error');
                    $location.path('/login');
                }

                return $q.reject(rejection);
            }
        };
	}
})();