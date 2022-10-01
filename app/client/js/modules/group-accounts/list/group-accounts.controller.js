export default function GroupsCtrl(NgTableParams, groupService, $translate,
    Notification, modalConfirmService) {
    'ngInject';

    const vm = this;
    vm.isLoading = false;

    vm.$onInit = function () {
        init();
    };

    vm.deleteGroup = function (groupId) {
        var title = $translate.instant('CONFIRM.DELETE_GROUP_ACCOUNT_CONFIRM_TITLE');
        var mes = $translate.instant('CONFIRM.DELETE_GROUP_ACCOUNT_CONFIRM_MES');
        var confirm = {
            message: mes,
            title: title
        };
        var editor = modalConfirmService.openModelConfirm(confirm);
        editor.result.then((res) => {
            if (res) {
                groupService.deleteGroup(groupId).then((res) => {
                    Notification.success($translate.instant('NOTIFICATION.DELETE_GROUP_ACCOUNT_SUCCESS'));
                    getGroups();
                }, function () {
                    Notification.error($translate.instant('NOTIFICATION.DELETE_GROUP_ACCOUNT_ERROR'));
                });
            }
        });

    };

    function init() {
        getGroups();
    }

    function getGroups(options) {
        vm.isLoading = true;
        if (!options) {
            options = {};
        }

        groupService.getGroups(options).then((res) => {
            vm.tableParams = new NgTableParams({
            },
                {
                    dataset: res,
                    counts: []
                });
            vm.isLoading = false;
        });

    }

    vm.openEditor = function (groupId) {
        const editor = groupService.openEditor(groupId);
        editor.result.then((res) => {
            getGroups();
        });
    };
}