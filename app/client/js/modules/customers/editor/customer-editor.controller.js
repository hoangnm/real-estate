import angular from 'angular';
export default function CustomerEditorCtrl(customersService, customerId, $uibModalInstance, $translate, Notification, accountsService) {
    'ngInject';

    const vm = this;

    vm.status = [];
    vm.customerId = customerId;
    vm.isLoading = false;
    vm.customer = {
        assignees: []
    };

    vm.staffs = [];

    vm.$onInit = function () {
        init();
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss();
    };

    vm.save = function () {
        vm.isLoading = true;
        var customer = angular.copy(vm.customer);
        if (customer.assignees && customer.assignees.length > 0) {
            customer.assignees = customer.assignees.map((obj) => {
                const rObj = {};
                rObj.id = obj;
                return rObj;
            });
        }

        customersService.saveCustomer(customer).then((res) => {
            if (vm.customerId > 0) {
                Notification.success($translate.instant('NOTIFICATION.UPDATE_CUSTOMER_SUCCESS'));
            } else {
                Notification.success($translate.instant('NOTIFICATION.CREATE_CUSTOMER_SUCCESS'));
            }
        }).catch((error) => {
            if (vm.customerId > 0) {
                Notification.error($translate.instant('NOTIFICATION.UPDATE_CUSTOMER_ERROR'));
            } else {
                Notification.error($translate.instant('NOTIFICATION.CREATE_CUSTOMER_ERROR'));
            }
        }).finally(() => {
            vm.isLoading = false;
            $uibModalInstance.close(true);
        });


    };

    function init() {
        getCustomer();
        getAllStaff();
        getCustomerStatus();
    }

    function getCustomer() {
        if (!customerId) {
            return;
        }
        vm.isLoading = true;
        customersService.getCustomer(customerId).then((res) => {
            vm.customer = res;
        }).finally(function () {
            vm.isLoading = false;
        });
    }

    function getAllStaff() {
        accountsService.getAccounts().then((res) => {
            vm.staffs = res;
        });
    }
    function getCustomerStatus() {
        customersService.getCustomerStatus().then((res) => {
            vm.status = res;
        });
    }
}