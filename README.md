# vue-custom-google-autocomplete

<p align="center">
  <img src="./img/example.gif" alt="Custom Google Autcomplete Example with Bulma Dropdown">
</p>

## Installation

You need [Vue.js](https://vuejs.org/) **version 2.0+**.

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
| `value`       | String  | null                                            | Input value                                            |


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

Params object is useful to refine predictions, for example if you want to get first predictions near to a location within a radius distance in a certain language you can set params like this :
```javascript
params = {
  location: `${lat},${lng}`,
  radius: 1000,
  language: 'fr'
}
```
(https://developers.google.com/places/web-service/autocomplete) See Optional parameters section for more informations
