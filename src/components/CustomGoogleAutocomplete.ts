import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { debounce } from 'lodash'
import uuid from 'uuid/v4'

import Api from '@/api/Api'
import mapData from '@/helpers'

import { Options } from '@/interfaces'

@Component
export default class CustomGoogleAutocomplete extends Vue {
  @Prop({ type: Object, default: (): Options => ({
    apiKey: '',
    deepSearch: true,
    cors: false,
    debounceTime: 400,
    params: {},
    focus: false
  }) }) private options!: Options
  @Prop({ type: String }) private value!: string

  private api = new Api()
  private search: string = ''
  private searching: boolean = false
  private fetchingPredictions = false
  private predictions: any[] = []
  private isInputFromUser: boolean = false
  private firstFetch: boolean = false
  private sessionToken: string = uuid()
  private isDropdownActive: boolean = false
  private intervalID: number = -1

  // tslint:disable-next-line
  @Watch('search')
  updateSearch = debounce(this.triggerSearch, this.debounceTime, { leading: !this.firstFetch })

  @Watch('search')
  updateSearching(value: string) {
    if (value && this.isInputFromUser) {
      this.searching = true
    }
  }

  get entries(): any {
    return this.predictions
  }

  get loading(): boolean {
    return this.fetchingPredictions || this.searching
  }

  get debounceTime(): number {
    return this.options.debounceTime || 400
  }

  get apiKey(): string {
    return this.options.apiKey || ''
  }

  get params(): any {
    return this.options.params || {}
  }

  get cors(): boolean {
    return this.options.cors || false
  }

  get deepSearch(): boolean {
    return this.options.deepSearch || false
  }

  get hasResults(): boolean {
    return this.entries ? this.entries.length : false
  }

  async triggerSearch(input: string): Promise<void> {
    if (!this.isInputFromUser) { return }
    try {
      this.searching = false
      this.fetchingPredictions = true
      const res = await this.api.fetchPredictions({
        key: this.apiKey,
        input,
        sessiontoken: this.sessionToken,
        ...this.params
      }, this.cors)
      this.predictions = mapData(res.data.predictions, true)
    } finally {
      this.firstFetch = true
      this.fetchingPredictions = false
    }
  }

  async selectPrediction(prediction: any): Promise<void> {
    this.isInputFromUser = false
    this.search = prediction.description

    if (this.deepSearch) {
      const res = await this.api.fetchPlace({
        key: this.apiKey,
        placeid: prediction.placeId,
        sessiontoken: this.sessionToken,
        ...this.params
      }, this.cors)
      this.$emit('select', res.data && res.data.result ? mapData(res.data.result, true) : prediction)
    } else {
      this.$emit('select', prediction)
    }
  }

  resetSessionToken(): void {
    this.sessionToken = uuid()
  }

  created(): void {
    this.search = this.value
  }

  mounted(): void {
    this.intervalID = window.setInterval(this.resetSessionToken, 180000)
  }

  beforeDestroy(): void {
    window.clearInterval(this.intervalID)
  }

  render() {
    // @ts-ignore
    return this.$scopedSlots.default({
      results: this.entries,
      loading: this.loading,
      selectPrediction: this.selectPrediction,
      hasResults: this.hasResults,
      query: this.search,
      inputAttrs: {
        value: this.search
      },
      inputEvents: {
        input: (e: any) => { this.search = e.target.value },
        keydown: () => {
          this.isInputFromUser = true
        }
      }
    })
  }
}
