import Vue from 'vue'
import CutomGoogleAutocomplete from './CutomGoogleAutocomplete.vue'

const plugin = {
  install(Vue, options) {
    Vue.component('cutom-google-autocomplete', CutomGoogleAutocomplete)
  }
}

export default plugin
