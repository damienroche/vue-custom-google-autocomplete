<template lang="pug">
  .custom-google-autocomplete(:class="mainWrapperClass")
    .custom-google-autocomplete-input(:class="inputWrapperClass")
      slot(name="beforeInput")
      input(
        type="search"
        ref="autocomplete"
        v-model="input"
        v-bind="$attrs"
        @blur="onBlur"
        @focus="onFocus"
        @keyup.esc.prevent="$emit('key:escape', $refs.autocomplete)"
        @keydown.tab.prevent="$emit('key:tab', $refs.autocomplete)"
        @keydown.enter.prevent="$emit('key:enter', $refs.autocomplete)"
        @keydown.up.prevent="$emit('key:up', $refs.autocomplete)"
        @keydown.down.prevent="$emit('key:down', $refs.autocomplete)"
        :class="inputClass")
      slot(name="afterInput")
    slot(
      name="results"
      :query="input"
      :results="entries"
      :loading="loading"
      :firstFetch="firstFetch"
      :selectPrediction="selectPrediction")
      div(v-for="prediction in entries")
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
  params: any
  cors: boolean
  inputClass: string,
  inputWrapperClass: string,
  mainWrapperClass: string,
  focus: boolean
}

@Component
export default class CustomGoogleAutocomplete extends Vue {
  @Prop({ type: Object, default: (): Options => ({
    apiKey: '',
    deepSearch: true,
    cors: false,
    params: {},
    inputClass: '',
    inputWrapperClass: '',
    mainWrapperClass: '',
    focus: false
  }) }) private options!: Options
  @Prop({ type: String }) private value!: string

  private api = new Api()
  private input: string = ''
  private debounceTime: number = 400
  private fetchingPredictions = false
  private predictions: any[] = []
  private isInputFromUser: boolean = false
  private firstFetch: boolean = false
  private sessionToken: string = uuid()
  private isDropdownActive: boolean = false
  private intervalSessionTokenID: number = -1

  // tslint:disable-next-line
  @Watch('input')
  updateSearch = debounce(this.triggerSearch, this.debounceTime)

  get entries(): any {
    return this.predictions
  }

  get loading(): boolean {
    return this.fetchingPredictions
  }

  get inputClass(): string {
    return this.options.inputClass
  }

  get inputWrapperClass(): string {
    return this.options.inputWrapperClass
  }

  get mainWrapperClass(): string {
    return this.options.mainWrapperClass
  }

  async triggerSearch(input: string): Promise<void> {
    if (!this.isInputFromUser) { return }
    try {
      this.$emit('loading', true)
      this.firstFetch = true
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
    console.log(prediction)
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

  onFocus() {
    this.isInputFromUser = true
    this.$emit('focus', this.$refs.autocomplete)
  }

  async onBlur() {
    await this.$nextTick()
    setTimeout(() => {
      this.$emit('blur', this.$refs.autocomplete)
    }, 500)
  }

  created(): void {
    this.input = this.value
  }

  mounted(): void {
    this.intervalSessionTokenID = window.setInterval(this.resetSessionToken, 180000)
    if (this.options.focus) {
      (this.$refs.autocomplete as HTMLElement).focus()
    }
  }

  beforeDestroy(): void {
    window.clearInterval(this.intervalSessionTokenID)
  }
}
</script>
