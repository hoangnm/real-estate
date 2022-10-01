import footerHtml from './footer.html';

export default function Footer() {
    return {
        restrict: 'AE',
        templateUrl: footerHtml,
        link: function (scope, elem, attrs) {

        }
    };
}