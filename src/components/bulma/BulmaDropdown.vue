<template lang="pug">
  custom-google-autocomplete(:options="options" @select="$emit('select', $event)")
    .dropdown(
      :class="{'is-active': dropdownActive && query && query.length > 2 }"
      slot-scope="{ inputAttrs, inputEvents, loading, results, query, selectPrediction, hasResults }"
      style="position: relative;")
      input.input.dropdown-trigger(type="search" v-bind="[inputAttrs, $attrs]" v-on="inputEvents" ref="autocomplete" @blur="onBlur" @focus="dropdownActive = true")
      .dropdown-menu(v-if="dropdownActive")
        .dropdown-content
          .dropdown-item(v-if="loading")
            slot(name="loading")
              span(style="font-size: 12px; color: #919191")
                strong Loading...
          .dropdown-item(v-if="!hasResults && !loading")
            slot(name="empty")
              span(style="font-size: 12px; color: #919191")
                | No results found for &nbsp;
                strong {{ query }}
          a.dropdown-item(
            href="#!"
            v-if="hasResults && !loading"
            v-for="(prediction, index) in results"
            :key="'prediction-' + index"
            style="font-size: 13px;"
            @click.stop.prevent="selectPrediction(prediction)")
            span {{ prediction.description }}
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import CustomGoogleAutocomplete from '@/components/CustomGoogleAutocomplete'

import { Options } from '@/interfaces'

@Component({
  components: { CustomGoogleAutocomplete }
})
export default class BulmaDropdown extends Vue {
  private dropdownActive: boolean = false

  @Prop({ type: Object, default: (): Options => ({
    apiKey: '',
    deepSearch: true,
    cors: false,
    debounceTime: 400,
    params: {},
    focus: false
  }) }) private options!: Options

  onBlur() {
    setTimeout(() => {
      this.dropdownActive = false
    }, 100)
  }

  get focus() {
    return this.options.focus || false
  }

  mounted() {
    if (this.focus) {
      (this.$refs.autocomplete as HTMLElement).focus()
    }
  }
}
</script>
