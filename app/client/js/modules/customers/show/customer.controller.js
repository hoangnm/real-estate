export default function CustomerCtrl(customersService, $stateParams) {
    'ngInject';

    const vm = this;
    const customerId = $stateParams.id;

    vm.isLoading = true;
    vm.customer = {};

    vm.$onInit = function () {
        init();
    };

    function init() {
        getCustomer();
    }

    function getCustomer() {
        vm.isLoading = true;
        customersService.getCustomer(customerId).then((res) => {
            vm.customer = res;
        }).finally(function () {
            vm.isLoading = false;
        });
    }
}