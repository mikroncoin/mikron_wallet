import Component from '@ember/component';
import { get } from '@ember/object';

import { computed } from 'ember-decorators/object';

import Table from 'ember-light-table';

import PagedMixin from '../../mixins/paged';
import formatAmount from '../../utils/format-amount';

export default Component.extend(PagedMixin, {
  contentKey: 'history',

  wallet: null,
  account: null,
  history: null,

  @computed
  get columns() {
    return [
      {
        label: 'Type',
        valuePath: 'type',
        width: '10%',
      },
      {
        label: 'Account',
        valuePath: 'account',
        width: '60%',
        cellClassNames: 'text-truncate',
        cellComponent: 'account-link',
      },
      {
        label: 'Amount',
        valuePath: 'amount',
        cellClassNames: 'text-truncate',
        format(rawValue) {
          return formatAmount(rawValue);
        },
      },
    ];
  },

  @computed('columns', 'pagedContent.@each')
  get table() {
    return new Table(get(this, 'columns'), get(this, 'pagedContent'));
  },
});
