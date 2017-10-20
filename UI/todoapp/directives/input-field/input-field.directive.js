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
			bindToController: true,
			templateUrl: 'directives/input-field/input-field.tmpl.html',
			scope: {
				ngModel: '=',
				label: '@',
				type: '@',
				name: '@',
				ngRequired: '@',
				placeholder: '@'
			}
		};

		function link(scope, elem, attrs, ctrls) {
			var input = elem.find('input');
		}

		/** @ngInject */
		function controller() {
		}
	}
}
)();