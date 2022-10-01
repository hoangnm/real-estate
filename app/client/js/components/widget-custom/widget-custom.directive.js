import angular from 'angular';

export default function widgetCustom() {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.find('.btn-collapse-wd').on('click', () => {
                if (!elem.hasClass("collapsed-box")) {
                    elem.find('.box-body').slideUp(500, function () {
                        elem.addClass("collapsed-box");
                    });

                    elem.find('.fa-widget-custom').removeClass("fa-minus").addClass("fa-plus");
                } else {
                    elem.find('.box-body').slideDown(500, function () {
                        elem.removeClass("collapsed-box");
                    });
                    elem.find('.fa-widget-custom').removeClass("fa-plus").addClass("fa-minus");
                }

            });
        }
    };
}