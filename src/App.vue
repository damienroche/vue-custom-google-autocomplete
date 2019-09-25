<template lang="pug">
  #app
    pre {{ selectedPlace }}
    custom-google-autocomplete(v-model="query" :options="options" @select="selectedPlace = $event")
      template(v-slot:results="{results}")
        div(v-if="results.loading") Loading
        div(v-else)
          div(v-for="prediction in results.entries")
            div(@click="selectPrediction(prediction)")
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
    deepSearch: true
  }
}
</script>
