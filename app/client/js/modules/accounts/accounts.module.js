import angular from 'angular';

import routes from './accounts.route';
import AccountsCtrl from './list/accounts.controller';
import AccountCtrl from './show/account.controller';
import AccountEditorCtrl from './editor/account-editor.controller';

export default angular.module('app.account', [])
    .config(routes)
    .controller('AccountsCtrl', AccountsCtrl)
    .controller('AccountCtrl', AccountCtrl)
    .controller('AccountEditorCtrl', AccountEditorCtrl)
    .name;
