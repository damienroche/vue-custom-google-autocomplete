<template lang="pug">
  .custom-google-autocomplete
    .custom-google-autocomplete-input
      slot(name="beforeInput")
      input(
        type="search"
        v-model="input"
        v-bind="$attrs"
        @blur="onBlur"
        @focus="onFocus"
        @keyup.esc.prevent="escapePressed"
        :class="inputClass")
      slot(name="afterInput")
    slot(:results="results" :selectPrediction="selectPrediction" name="results")
      div(v-if="!canHideDropdown || isDropdownActive")
        div(v-for="prediction in results.entries")
          div(@click="selectPrediction(prediction)") {{ prediction.description }}
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { debounce } from 'lodash'
import uuid from 'uuid/v4'

import Api from '@/api/Api'
import mapData from '@/helpers'

interface Options {
  apiKey: string
  deepSearch: boolean
  dropdown: boolean
  params: any
  cors: boolean
  inputClass: string
}

interface Results {
  entries: any
  loading: boolean
  hasEntries: boolean
}

@Component
export default class CustomGoogleAutocomplete extends Vue {
  @Prop({ type: Object, default: (): Options => ({
    apiKey: '',
    deepSearch: true,
    dropdown: true,
    cors: false,
    params: {},
    inputClass: ''
  }) }) private options!: Options
  @Prop({ type: String }) private value!: string

  private api = new Api()
  private input: string = ''
  private inputSelected: boolean = false
  private debounceTime: number = 400
  private fetchingPredictions = false
  private predictions: any[] = []
  private sessionToken: string = uuid()
  private isDropdownActive: boolean = false
  private intervalSessionTokenID: number = -1

  // tslint:disable-next-line
  @Watch('input')
  updateSearch = debounce(this.triggerSearch, this.debounceTime)

  get results(): Results {
    return {
      entries: this.predictions,
      loading: this.fetchingPredictions,
      hasEntries: !!(this.predictions && this.predictions.length)
    }
  }

  get canHideDropdown(): boolean {
    return this.options.dropdown
  }

  get inputClass(): string {
    return this.options.inputClass
  }

  async triggerSearch(input: string): Promise<void> {
    if (!this.inputSelected) { return }
    this.isDropdownActive = true
    try {
      this.$emit('loading', true)
      this.fetchingPredictions = true
      const res = await this.api.fetchPredictions({
        key: this.options.apiKey,
        input,
        sessiontoken: this.sessionToken,
        ...this.options.params
      }, this.options.cors)
      this.predictions = mapData(res.data.predictions, true)
    } finally {
      this.$emit('loading', false)
      this.fetchingPredictions = false
    }
  }

  async selectPrediction(prediction: any): Promise<void> {
    this.input = prediction.description
    this.$emit('input', prediction.description)

    if (this.options.deepSearch) {
      const res = await this.api.fetchPlace({
        key: this.options.apiKey,
        placeid: prediction.placeId,
        sessiontoken: this.sessionToken,
        ...this.options.params
      }, this.options.cors)
      this.$emit('select', res.data && res.data.result ? mapData(res.data.result, true) : prediction)
    } else {
      this.$emit('select', prediction)
    }
  }

  resetSessionToken(): void {
    this.sessionToken = uuid()
  }

  onBlur(): void {
    this.inputSelected = false
  }

  onFocus(): void {
    this.inputSelected = true
  }

  escapePressed(): void {
    this.isDropdownActive = false
  }

  created(): void {
    this.input = this.value
  }

  mounted(): void {
    this.intervalSessionTokenID = window.setInterval(this.resetSessionToken, 180000)
  }

  beforeDestroy(): void {
    window.clearInterval(this.intervalSessionTokenID)
  }

}
</script>
