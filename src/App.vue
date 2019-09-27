<template lang="pug">
  #app(style="padding: 30px;")
    component(:is="activeExample" :key="activeExampleKey")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BootstrapDropdown from '@/components/examples/BootstrapDropdown.vue'
import BulmaDropdown from '@/components/examples/BulmaDropdown.vue'

interface Example {
  key: string,
  component: any
}

@Component({
  components: {
    BootstrapDropdown,
    BulmaDropdown
  }
})
export default class App extends Vue {
  activeExampleKey: string = 'bulma'
  examples: Example[] = [
    {
      key: 'bulma',
      component: BulmaDropdown
    },
    {
      key: 'bootstrap',
      component: BootstrapDropdown
    }
  ]

  get activeExample() {
    const example = this.examples.find((ex) => ex.key === this.activeExampleKey)
    return example ? example.component : this.examples[0].component
  }
}
</script>
