import angular from 'angular';

import NavBar from './navbar/navbar.directive';
import SideBar from './sidebar/sidebar.directive';
import Footer from './footer/footer.directive';
import WidgetCustom from './widget-custom/widget-custom.directive';
import ContentWrapper from './content-wrapper/content-wrapper.directive';
import Spinner from './spinner/spinner.directive';
import ModalCustom from './modal-custom/modal-custom.directive';
import translation from '../translate';
import modalConfirmController from './modal-confirm/modal-confirm.controller';

export default angular.module('app.components', [])
    .directive('navBar', NavBar)
    .directive('sideBar', SideBar)
    .directive('realEstateFooter', Footer)
    .directive('widgetCustom', WidgetCustom)
    .directive('contentWrapper', ContentWrapper)
    .directive('spinner', Spinner)
    .directive('modalCustom', ModalCustom)
    .controller('modalConfirmController', modalConfirmController)
    .config(translation)
    .name;