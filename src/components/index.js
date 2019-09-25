import Vue from 'vue'
import CustomGoogleAutocomplete from './CustomGoogleAutocomplete.vue'

const plugin = {
  install(Vue, options) {
    Vue.component('custom-google-autocomplete', CustomGoogleAutocomplete)
  }
}

export default plugin
