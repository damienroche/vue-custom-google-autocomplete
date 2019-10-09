import Vue from 'vue'
import CustomGoogleAutocomplete from './CustomGoogleAutocomplete'
import BootstrapDropdown from './bootstrap/BootstrapDropdown.vue'
import BulmaDropdown from './bulma/BulmaDropdown.vue'

const plugin = {
  install(Vue, options) {
    Vue.component('custom-google-autocomplete', CustomGoogleAutocomplete)
  }
}

export default plugin
export {
  BootstrapDropdown,
  BulmaDropdown
}
