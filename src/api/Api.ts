import Client from './Client'
import Error from './Error'

export default class Api extends Client {
  async fetchPredictions(params: any) {
    try {
      return await this.request('get', 'https://maps.googleapis.com/maps/api/place/autocomplete/json' params)
    } catch (error) {
      throw new Error(error)
    }
  }

  async fetchPlace(params: any) {
    try {
      return await this.request('get', 'https://maps.googleapis.com/maps/api/place/details/json', params)
    } catch (error) {
      throw new Error(error)
    }
  }
}
