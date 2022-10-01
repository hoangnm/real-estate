import angular from 'angular';
export default function GroupEditorCtrl(groupService, groupId, $uibModalInstance, $translate, Notification) {
    'ngInject';

    const vm = this;

    vm.groupId = groupId;
    vm.isLoading = false;

    vm.$onInit = function () {
        init();
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss();
    };

    vm.save = function () {
        vm.isLoading = true;
        groupService.saveGroup(vm.group_account).then((res) => {
            if (vm.groupId > 0) {
                Notification.success($translate.instant('NOTIFICATION.UPDATE_GROUP_ACCOUNT_SUCCESS'));
            } else {
                Notification.success($translate.instant('NOTIFICATION.CREATE_GROUP_ACCOUNT_SUCCESS'));
            }
        }).catch((error) => {
            if (vm.groupId > 0) {
                Notification.error($translate.instant('NOTIFICATION.UPDATE_GROUP_ACCOUNT_ERROR'));
            } else {
                Notification.error($translate.instant('NOTIFICATION.CREATE_GROUP_ACCOUNT_ERROR'));
            }
        }).finally(() => {
            vm.isLoading = false;
            $uibModalInstance.close(true);
        });


    };

    function init() {
        getGroup();
    }

    function getGroup() {
        if (!groupId) {
            return;
        }
        vm.isLoading = true;
        groupService.getGroup(groupId).then((res) => {
            vm.group_account = res;
        }).finally(function () {
            vm.isLoading = false;
        });
    }
}