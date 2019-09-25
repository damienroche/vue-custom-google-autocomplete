import { shallowMount } from '@vue/test-utils'
import CustomGooglePlaceAutocomplete from '@/components/CustomGooglePlaceAutocomplete.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(CustomGooglePlaceAutocomplete, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
