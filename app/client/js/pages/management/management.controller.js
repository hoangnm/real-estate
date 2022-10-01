import angular from 'angular';
export default function ManagementCtrl($state) {
    'ngInject';
    $state.go('management.products');
}