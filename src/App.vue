<template lang="pug">
  #app(style="padding: 30px;")
    //- custom-google-autocomplete.panel(
      v-model="query"
      :options="bulmaPanelOptions"
      @select="selectedPlace = $event"
      @focus="dropdownActive = true"
      @blur="dropdownActive = false")
      template(slot="results" slot-scope="props")
          //- .panel-block(style="font-size: 12px;") Please enter an address
          //- div(v-if="props.firstFetch")
          .panel-block(v-if="props.loading")
            span Loading
          .panel-block(
            v-if="props.results.length && !props.loading"
            v-for="(prediction, index) in props.results"
            :key="index"
            @click.stop="props.selectPrediction(prediction)")
            span {{ prediction.description }}
    custom-google-autocomplete.dropdown(
      v-model="query"
      :options="bulmaDropdownOptions"
      :class="{'is-active': dropdownActive }"
      @select="selectedPlace = $event"
      @focus="dropdownActive = true"
      @blur="dropdownActive = false"
      style="display: flex;")
      template(slot="results" slot-scope="props")
        .dropdown-menu
          .dropdown-content
            .dropdown-item(style="font-size: 12px;") Please enter an address
            hr.dropdown-divider(v-if="props.firstFetch")
            .dropdown-item(v-if="props.loading")
              span Loading
            a.dropdown-item(
              v-if="props.results.length && !props.loading"
              v-for="(prediction, index) in props.results"
              :key="index"
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
  bulmaDropdownOptions: any = {
    apiKey: process.env.VUE_APP_PLACE_API_KEY,
    deepSearch: true,
    cors: true,
    focus: false,
    inputClass: 'input',
    inputWrapperClass: 'dropdown-trigger',
    params: {
      location: '43.3,5.4',
      radius: 1000,
      language: 'fr'
    }
  }

  bulmaPanelOptions: any = {
    apiKey: process.env.VUE_APP_PLACE_API_KEY,
    deepSearch: true,
    cors: true,
    focus: false,
    inputClass: 'input',
    inputWrapperClass: 'panel-block',
    params: {
      location: '45.75,4.85',
      radius: 1000,
      language: 'fr'
    }
  }
}
</script>
