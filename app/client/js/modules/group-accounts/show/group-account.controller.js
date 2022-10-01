export default function GroupCtrl(groupService, $stateParams) {
    'ngInject';

    var vm = this;
    const groupId = $stateParams.id;

    vm.isLoading = true;
    vm.$onInit = function () {
        init();
    };

    function init() {
        getGroup();
    }

    function getGroup() {
        vm.isLoading = true;
        groupService.getGroup(groupId).then((res) => {
            vm.group_account = res;
            getAppResources();
        }).finally(function () {
            vm.isLoading = false;
        });
    }

    function getAppResources() {
        groupService.getAppResources().then((res) => {
            vm.app_resources = res;
            vm.app_resources.forEach((resource) => {
                for (var key in vm.group_account.permissions) {
                    if (resource.resource_name === key) {
                        vm.group_account.permissions[key].forEach((v) => {
                            resource[v] = true;
                        });
                    }
                }
            });
        });
    }

    vm.savePermission = function (resource, action) {
        const data = {};
        data.resource_id = resource.id;
        data.action = action;
        if (resource[action]) {
            groupService.savePermission(groupId, data);
        } else {
            groupService.removePermission(groupId, data);
        }
    };
}