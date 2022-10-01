import angular from 'angular';
export default function AccountEditorCtrl(accountsService, accountId, $uibModalInstance, $translate, Notification, groupService) {
    'ngInject';

    const vm = this;

    vm.accountId = accountId;
    vm.isLoading = false;
    vm.groups = [];
    vm.$onInit = function () {
        init();
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss();
    };

    vm.save = function () {
        vm.isLoading = true;
        accountsService.saveAccount(vm.account).then((res) => {
            if (vm.accountId > 0) {
                Notification.success($translate.instant('NOTIFICATION.UPDATE_ACCOUNT_SUCCESS'));
            } else {
                Notification.success($translate.instant('NOTIFICATION.CREATE_ACCOUNT_SUCCESS'));
            }
        }).catch((error) => {
            if (vm.accountId > 0) {
                Notification.error($translate.instant('NOTIFICATION.UPDATE_ACCOUNT_ERROR'));
            } else {
                Notification.error($translate.instant('NOTIFICATION.CREATE_ACCOUNT_ERROR'));
            }
        }).finally(() => {
            vm.isLoading = false;
            $uibModalInstance.close(true);
        });
    };

    function init() {
        getAccount();
        getGroupAccount();
    }

    function getAccount() {
        if (!accountId) {
            return;
        }
        vm.isLoading = true;
        accountsService.getAccount(accountId).then((res) => {
            vm.account = res;
        }).finally(function () {
            vm.isLoading = false;
        });
    }

    function getGroupAccount() {
        groupService.getGroups().then((res) => {
            vm.groups = res;
        });
    }
}