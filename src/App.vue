<template lang="pug">
  #app(style="padding: 30px;")
    custom-google-autocomplete.dropdown.show(
      :value="query"
      :options="options"
      placeholder="Please, enter an address"
      :class="{'show': dropdownActive }"
      @select="selectedPlace = $event"
      @focus="dropdownActive = true"
      @blur="dropdownActive = false")
      template(slot="results" slot-scope="props")
        .dropdown-menu(:class="{'show': dropdownActive && props.query }" style="top: calc(100% + 5px)")
          .dropdown-item-text(v-if="hasNoResults(props)")
            span(style="font-size: 12px; color: #919191")
              span No results found for&nbsp;
              strong "{{props.query}}"
          .dropdown-item-text(v-if="hasResults(props)")
            span(style="font-size: 12px; color: #919191")
              span {{ props.results.length }} results found for&nbsp;
              strong "{{props.query}}"
          .dropdown-item(v-if="props.loading")
            span(style="font-size: 12px; color: #919191")
              strong Loading...
          .dropdown-divider(v-if="props.query && !hasNoResults(props) && !props.loading")
          .dropdown-item(
            v-if="props.results.length && !props.loading"
            v-for="(prediction, index) in props.results"
            :key="index"
            style="font-size: 13px;"
            @click.stop="props.selectPrediction(prediction)")
            span {{ prediction.description }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CustomGoogleAutocomplete from '@/components/CustomGoogleAutocomplete.vue'

@Component({
  components: {
    CustomGoogleAutocomplete
  }
})
export default class App extends Vue {
  selectedPlace: any = null
  dropdownActive = false

  query: string = ''
  options: any = {
    apiKey: process.env.VUE_APP_PLACE_API_KEY,
    deepSearch: true,
    cors: true,
    focus: false,
    inputClass: 'form-control',
    inputWrapperClass: 'dropdown-trigger',
    params: {
      location: '45.52345,-122.67621',
      radius: 1000,
      language: 'en'
    }
  }

  hasNoResults(props) {
    return !props.results.length && !props.loading && props.firstFetch && props.query
  }

  hasResults(props) {
    return props.results.length > 0 && !props.loading && props.firstFetch && props.query
  }
}
</script>
