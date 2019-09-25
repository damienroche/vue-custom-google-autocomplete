<template lang="pug">
  #app
    pre {{ selectedPlace }}
    custom-google-place-autocomplete(v-model="query" :options="options" @select="selectedPlace = $event")
      template(v-slot:default="results")
        div(v-for="prediction in results.entries")
          div(@click="selectPrediction(prediction)") {{ prediction.description }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CustomGooglePlaceAutocomplete from '@/components/CustomGooglePlaceAutocomplete.vue'

@Component({
  components: {
    CustomGooglePlaceAutocomplete
  }
})
export default class App extends Vue {
  selectedPlace: any = null
  query = 'Valence'
  options = {
    apiKey: process.env.VUE_APP_PLACE_API_KEY,
    alwaysOpen: true,
    deepSearch: true
  }

  mounted() {
    console.log(process.env.VUE_APP_PLACE_API_KEY)
  }
}
</script>
