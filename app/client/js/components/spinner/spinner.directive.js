import spinnerHtml from './spinner.html';
export default function spinner() {
    return {
        restrict: 'AE',
        templateUrl: spinnerHtml,
        scope: {
            show: '='
        },
        link: function (scope, elem, attrs) {
        },
        replace: true
    };

}