import angular from 'angular';
import $ from 'jquery';

export default function ContentWrapper() {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            const neg = 50;
            const windowHeight = $(window).height();
            $(".content-wrapper, .right-side").css('min-height', windowHeight - neg);
        }
    };
}