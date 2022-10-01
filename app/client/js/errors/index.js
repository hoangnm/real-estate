import angular from 'angular';
import ApiError from './api-error';

export default angular.module('app.error', [])
    .value('ApiError', ApiError)
    .name;