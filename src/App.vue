<template lang="pug">
  #app(style="padding: 30px;")
    bootstrap-dropdown(:options="options" @select="selected = $event" placeholder="Search a place")
    //- bulma-dropdown(:options="options" @select="selected = $event")
    //-   pre {{ selected }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import BootstrapDropdown from '@/components/bootstrap/BootstrapDropdown.vue'
import BulmaDropdown from '@/components/bulma/BulmaDropdown.vue'

@Component({
  components: {
    BootstrapDropdown,
    BulmaDropdown
  }
})
export default class App extends Vue {
  selected: any = null
  options: any = {
    apiKey: process.env.VUE_APP_PLACE_API_KEY,
    cors: true,
    params: {
      location: '45.52345,-122.67621',
      radius: 1000,
      language: 'en'
    }
  }
}
</script>
