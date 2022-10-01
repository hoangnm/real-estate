import angular from 'angular';

import routes from './group-accounts.route';
import GroupsCtrl from './list/group-accounts.controller';
import GroupCtrl from './show/group-account.controller';
import GroupEditorCtrl from './editor/group-account-editor.controller';

export default angular.module('app.group-account', [])
    .config(routes)
    .controller('GroupsCtrl', GroupsCtrl)
    .controller('GroupCtrl', GroupCtrl)
    .controller('GroupEditorCtrl', GroupEditorCtrl)
    .name;