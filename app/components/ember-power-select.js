import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class EmberPowerSelectComponent extends Component {
    @service i18n
    searchEnabled = false
    allowClear = true
  
    // You can even use computed properties to do other stuff, like apply i18n, that wouldn't be
    // possible with static configuration.
    @computed('i18n.locale')
    get loadingMessage() {
      return this.i18n.t('selects.loading');
    }
}
