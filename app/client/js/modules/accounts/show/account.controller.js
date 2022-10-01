export default function AccountCtrl(accountsService, $stateParams) {
    'ngInject';

    var vm = this;
    vm.isLoading = true;
    var accountId = $stateParams.id;
    vm.$onInit = function () {
        init();
    };

    function init() {
        getAccount();
    }

    function getAccount() {
        vm.isLoading = true;
        accountsService.getAccount(accountId).then((res) => {
            vm.account = res;
        }).finally(function () {
            vm.isLoading = false;
        });
    }
}