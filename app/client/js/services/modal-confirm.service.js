import angular from 'angular';
import modalConfirmHtml from '../components/modal-confirm/modal-confirm.html';
export default function modalConfirmService($uibModal) {
    'ngInject';

    return {
        openModelConfirm: openModelConfirm
    };

    function openModelConfirm(confirm) {
        var editor = $uibModal.open({
            templateUrl: modalConfirmHtml,
            size: 'md',
            keyboard: true,
            resolve: {
                confirm: function () {
                    return confirm;
                }
            },
            controller: 'modalConfirmController',
            controllerAs: 'vm'
        });

        return editor;
    }
}