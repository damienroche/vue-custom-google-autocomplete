# vue-custom-google-autocomplete

<p align="center">
  <img src="./img/vue-custom-google-autocomplete.png" alt="Custom Google Autcomplete using Place API">
</p>

## Installation

You need [Vue.js](https://vuejs.org/) **version 2.0+** and an [Google PLACE API](https://developers.google.com/places/web-service/get-api-key) key. This plugin comes without any css, the main goal is to use it with differents framework. To do this, you can pass multiple classes in options and custom the results template (See examples section).

### 1 Install via npm

```bash
npm install vue-custom-google-autocomplete
yarn add vue-custom-google-autocomplete
```

### 2 Import and use

```javascript
import Vue from 'vue'
import CustomGoogleAutocomplete from 'vue-custom-google-autocomplete'

...

Vue.use(CustomGoogleAutocomplete)
```

## Props

| Name          | Type    | Default                                         | Description                                            |
|---------------|---------|-------------------------------------------------|--------------------------------------------------------|
| `options`     | Object  | see options section                             | Plugin options (see options section)                   |
| `value`       | String  | null                                            | Input value (can be use with v-model)                  |

You can also pass all props available on an input (placeholder, name..)

## Options

```javascript
options = {
  apiKey: YOUR_API_KEY,
  deepSearch: true,
  cors: false,
  params: {},
  inputClass: '',
  inputWrapperClass: '',
  mainWrapperClass: '',
  focus: false
}
```

| Name                 | Type    | Default                      | Description                                                            |
|----------------------|---------|------------------------------|------------------------------------------------------------------------|
| `apiKey`             | String  | null                         | Your Google PLACE Api key (REQUIRED)                                   |
| `deepSearch`         | Boolean | true                         | Get more informations about selected place (geometry etc..)            |
| `cors`               | Boolean | false                        | Set to true when project is running locally                            |
| `params`             | Object  | {}                           | Google Autocomplete optional parameters                                |
| `inputClass`.        | String  | ''                           | Input class to match with                                              |
| `inputWrapperClass`  | String  | ''                           | Input Wrapper class.                                                   |
| `mainWrapperClass`   | String  | ''                           | Input Wrapper class                                                    |
| `focus`              | Boolean | false                        | Focus input                                                            |
| `debounceTime`       | Number  | 400                          | Time in ms before trigger a new Google api call                        |

Params object is useful to refine predictions, for example if you want to get first predictions near to a location within a radius distance in a certain language you can set params like this :
```javascript
params = {
  location: `${lat},${lng}`,
  radius: 1000,
  language: 'fr'
}
```
See [Optional parameters](https://developers.google.com/places/web-service/autocomplete) section for more informations

## Events

The input part emits three events @blur @focus and @key:value
All three send the Input Element reference
@key values are :escape :tab :enter :up :down

The results part emits two events @loading and @select
@loading is triggered when Google API is requested.
@select is triggered when a prediction is selected it send an object with datas about the location

## Template and slot

In order to be more flexbile, you are able to make your own results template with `slot-scope`
This template is accessible via the `results` slot

```javascript
props = {
  firstFetch: Boolean,
  query: String,
  results: Array,
  loading: Boolean,
  selectPrediction: Function
}
```

Also two slots are available before and after the input `beforeInput` `afterInput`

## Examples

The following example show how you can adapt this plugin with the Bulma dropdown markup.

<img src="./img/example-bulma-dropdown.gif" alt="Custom Google Autcomplete Example with Bulma Dropdown">

```vue
<template>
  <custom-google-autocomplete
    class="dropdown"
    :value="query"
    :options="options"
    :class="{'is-active': dropdownActive }"
    @select="selectedPlace = $event"
    @focus="dropdownActive = true"
    @blur="dropdownActive = false"
  >
    <template slot="results" slot-scope="props">
      <div class="dropdown-menu">
        <div class="dropdown-content">
          <div class="dropdown-item" style="font-size: 12px;"> Please enter an address </div>
          <hr class="dropdown-divider" v-if="props.firstFetch" />
          <div class="dropdown-item" v-if="props.loading">
            <span> Loading </span>
          </div>
          <a href="!#" class="dropdown-item"
            v-if="props.results.length && !props.loading"
            v-for="(prediction, index) in props.results"
            :key="index"
            @click.prevent="props.selectPrediction(prediction)"
          >
            <span> {{ prediction.description }} </span>
          </a>
        </div>
      </div>
    </template>
  </custom-google-autocomplete>
</template>

<script>

export default {
  data() {
    return {
      selectedPlace: null,
      dropdownActive: false,
      query: '',
      options: {
        apiKey: process.env.VUE_APP_PLACE_API_KEY,
        deepSearch: true,
        cors: true,
        focus: false,
        inputClass: 'input',
        inputWrapperClass: 'dropdown-trigger',
        params: {
          location: '43.3,5.4',
          radius: 1000,
          language: 'fr'
        }
      }
    }
  }
}
</script>
```

The following example show how you can adapt this plugin with the Bootstrap dropdown markup.

<img src="./img/example-bootstrap.png" alt="Custom Google Autcomplete Example with Bootstrap Dropdown">


