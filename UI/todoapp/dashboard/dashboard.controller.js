(function () {
	angular.module('todo').controller('dashboardCtrl', dashboardController);

	/** @ngInject */
	function dashboardController(dashboardService, $scope) {
		$scope.userTodos = [];
		$scope.saveTodo = saveTodo;

		function activate() {
			retrieveUserTodos();
		}

		activate();

		function retrieveUserTodos() {
			dashboardService.retrieveForCurrentUser().then(function (data) {
				console.log(data);
				$scope.userTodos = data.data;
			}, function (error) {
				alert(error.data);
			});
		}

		function saveTodo(form, todo) {
			if (!form.$valid) return;

			dashboardService.saveForUser(todo).then(function (data) {

			}, function(error) {

			});
		}
	}
})();