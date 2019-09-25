<template lang="pug">
  #app
    pre {{ selectedPlace }}
    custom-google-autocomplete(v-model="query" :options="options" @select="selectedPlace = $event")
      //- div(slot="results")
      //- template(slot="beforeInput") before input
      //- template(slot="afterInput") after input
      //- template(slot="results" scope="props")
        div(v-if="props.results.loading") Loading
        div(v-else)
          div(v-for="prediction in props.results.entries")
            div(@click="props.selectPrediction(prediction)")
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
  query = 'Valence'
  options = {
    apiKey: process.env.VUE_APP_PLACE_API_KEY,
    alwaysOpen: true,
    deepSearch: true,
    cors: true
  }
}
</script>
