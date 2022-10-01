import navBarHtml from './navbar.html';
import angular from 'angular';

export default function NavBar() {
    return {
        restrict: 'AE',
        templateUrl: navBarHtml,
        link: function (scope, elem, attrs) {
            const $body = angular.element('body');
            const $window = angular.element(window);
            const smallScreenSize = 768;

            elem.find('.sidebar-toggle').on('click', () => {
                if ($window.width() > smallScreenSize - 1) {
                    $body.toggleClass('sidebar-collapse');
                } else {
                    $body.toggleClass('sidebar-open');
                }
            });
        }
    };
}