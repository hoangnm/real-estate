import modalConfirmHtml from './modal-confirm.html';
export default function modalConfirmController(confirm, $translate, $uibModalInstance) {
    'ngInject';

    var vm = this;

    vm.close = close;
    vm.save = save;
    vm.message = confirm.message || $translate.instant('CONFIRM.DELETE_CONFIRM_MES');
    vm.confirmTitle = confirm.title;
    function close() {
        $uibModalInstance.close(false);
    }

    function save() {
        $uibModalInstance.close(true);
    }
}