import sideBarHtml from './sidebar.html';

export default function SideBar() {
    return {
        restrict: 'AE',
        templateUrl: sideBarHtml,
        link: function (scope, elem, attrs) {

        }
    };
}