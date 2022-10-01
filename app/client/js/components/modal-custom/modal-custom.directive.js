import angular from 'angular';
import $ from 'jquery';

export default function ModalCustom($timeout) {
    'ngInject';
    return {
        restrict: 'C',
        link: function (scope, elem, attrs) {
            $timeout(function () {
                setHeight();
            });


            function setHeight() {
                var _modal = elem;
                var cachedWidth = $(window).width();
                if (!_modal) {
                    return;
                }
                ajustModal(_modal);
                $(window).resize(function () {
                    $timeout(function () {
                        var newWidth = $(window).width();
                        if (newWidth !== cachedWidth) {
                            cachedWidth = newWidth;
                            ajustModal(_modal);
                        }
                    }, 300);
                });
            }
            function ajustModal(_modal) {
                var modalHeaderHeight = _modal.find('.box-header').outerHeight();
                var modalFooterHeight = _modal.find('.box-footer').outerHeight();
                var altura = $(window).height() - (modalHeaderHeight + modalFooterHeight + 60);
                _modal.find('.box-body').css({ 'max-height': altura, 'overflow': 'auto' });
            }
        }
    };
}