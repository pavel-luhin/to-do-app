(function () {
	angular.module('todo').config(routeConfig);


	/** @ngInject */
	function routeConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'login/login.tmpl.html',
			controller: 'loginCtrl',
			controllerAs: 'ctrl',
		});

		$urlRouterProvider.otherwise(function($injector) {
			var $state = $injector.get('$state');
			$state.go('login');
		});
	}
})();