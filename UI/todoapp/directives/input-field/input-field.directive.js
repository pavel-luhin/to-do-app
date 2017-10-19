(function () {
	angular.module('todo').directive('inputField', inputField);

	/** @ngInject */
	function inputField() {
		return {
			restrict: 'E',
			controllerAs: 'input',
			replace: true,
			link: link,
			controller: controller,
			templateUrl: 'directives/input-field/input-field.tmpl.html',
			scope: {
				ngModel: '=',
				label: '@',
				type: '@',
				name: '@'
			}
		};

		function link(scope, elem, attrs, ctrls) {

		}

		function controller() {

		}
	}
})();