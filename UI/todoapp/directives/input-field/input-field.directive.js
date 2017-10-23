(function () {
	angular.module('todo').directive('inputField', inputField);

	/** @ngInject */
	function inputField(loginService) {
		return {
			restrict: 'E',
			controllerAs: 'input',
			replace: true,
			require: ['^form'],
			link: link,
			controller: InputFieldController,
			bindToController: true,
			templateUrl: 'directives/input-field/input-field.tmpl.html',
			scope: {
				ngModel: '=',
				label: '@',
				type: '@',
				name: '@',
				ngRequired: '@',
				placeholder: '@',
				checkAvailable: '@',
				matchWith: '@'
			}
		};

		function link(scope, elem, attrs, ctrls) {
			var input = elem.find('input');
			scope.form = ctrls[0];
			var field = scope.form[attrs.name];

			if (scope.input.checkAvailable) {
				scope.$watch(function () {
					return field.$viewValue;
				}, function(value) {
					if (!angular.isDefined(value)) return;

					loginService.checkAvailable(attrs.checkAvailable, value).then(function(data) {
						field.$setValidity('available', data.data);
					});
				});
			}

			if (scope.input.matchWith) {
				scope.$watchGroup(['input.ngModel', 'input.matchWith'], function (newValues, oldValues) {
					if (newValues[0] || newValues[1]) {
						var status = newValues[0] === newValues[1];
						scope.form[scope.input.name].$setValidity('password-match', status)
					}
				});
			}
		}
	}

	function InputFieldController() {
		var vm = this;

		vm.hasErrors = function (input) {
			return ((input.$dirty && input.$invalid && input.$touched) || vm.submitted) && !angular.equals(input.$error, {});

		}
	}
})();