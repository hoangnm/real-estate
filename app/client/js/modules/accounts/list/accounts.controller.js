export default function AccountsCtrl(NgTableParams, accountsService, $translate,
    Notification, modalConfirmService, groupService) {
    'ngInject';

    const vm = this;

    vm.isLoading = false;
    vm.groups = [];
    vm.$onInit = function () {
        init();
    };

    vm.deleteAccount = function (accountId) {
        var title = $translate.instant('CONFIRM.DELETE_ACCOUNT_CONFIRM_TITLE');
        var mes = $translate.instant('CONFIRM.DELETE_ACCOUNT_CONFIRM_MES');
        var confirm = {
            message: mes,
            title: title
        };
        var editor = modalConfirmService.openModelConfirm(confirm);
        editor.result.then((res) => {
            if (res) {
                accountsService.deleteAccount(accountId).then((res) => {
                    Notification.success($translate.instant('NOTIFICATION.DELETE_ACCOUNT_SUCCESS'));
                    getAccounts();
                }, function () {
                    Notification.error($translate.instant('NOTIFICATION.DELETE_ACCOUNT_ERROR'));
                });
            }
        });

    };

    function init() {
        getAccounts();
        getGroupAccount();
    }

    function getAccounts(options) {
        vm.isLoading = true;
        if (!options) {
            options = {};
        }
        accountsService.getAccounts(options).then((res) => {
            vm.tableParams = new NgTableParams({

            },
                {
                    dataset: res,
                    counts: []
                });

            vm.isLoading = false;
        });
    }

    vm.openEditor = function (accountId) {
        const editor = accountsService.openEditor(accountId);
        editor.result.then((res) => {
            getAccounts();
        });
    };

    function getGroupAccount() {
        groupService.getGroups().then((res) => {
            vm.groups = res;
        });
    }
}