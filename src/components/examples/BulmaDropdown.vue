<template lang="pug">
  #app(style="padding: 30px;")
    custom-google-autocomplete.dropdown(
      :value="query"
      :options="options"
      placeholder="Please, enter an address"
      :class="{'is-active': dropdownActive }"
      @select="selectedPlace = $event"
      @focus="dropdownActive = true"
      @blur="dropdownActive = false")
      template(slot="results" slot-scope="props")
        .dropdown-menu(v-if="props.query")
          .dropdown-content
            .dropdown-item(v-if="hasNoResults(props)")
              span(style="font-size: 12px; color: #919191")
                span No results found for&nbsp;
                strong "{{props.query}}"
            .dropdown-item(v-if="hasResults(props)")
              span(style="font-size: 12px; color: #919191")
                span {{ props.results.length }} results found for&nbsp;
                strong "{{props.query}}"
            .dropdown-item(v-if="props.loading")
              span(style="font-size: 12px; color: #919191")
                strong Loading...
            hr.dropdown-divider(v-if="props.query && !hasNoResults(props) && !props.loading")
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
// import 'bulma'

@Component({
  components: {
    CustomGoogleAutocomplete
  }
})
export default class Bulma extends Vue {
  selectedPlace: any = null
  dropdownActive = false

  query: string = ''
  options: any = {
    apiKey: process.env.VUE_APP_PLACE_API_KEY,
    deepSearch: true,
    cors: true,
    focus: false,
    inputClass: 'input',
    inputWrapperClass: 'dropdown-trigger',
    params: {
      location: '45.52345,-122.67621',
      radius: 1000,
      language: 'en'
    }
  }

  hasNoResults(props: any) {
    return !props.results.length && !props.loading && props.firstFetch && props.query
  }

  hasResults(props: any) {
    return props.results.length > 0 && !props.loading && props.firstFetch && props.query
  }
}
</script>
