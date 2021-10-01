import Client from './Client'
import Error from './Error'

export default class Api extends Client {
  async fetchPredictions(params: any, cors: boolean, corsBaseUrl: string) {
    try {
      return await this.request('get', 'https://maps.googleapis.com/maps/api/place/autocomplete/json', params, cors, corsBaseUrl)
    } catch (error) {
      throw new Error(error)
    }
  }

  async fetchPlace(params: any, cors: boolean, corsBaseUrl: string) {
    try {
      return await this.request('get', 'https://maps.googleapis.com/maps/api/place/details/json', params, cors, corsBaseUrl)
    } catch (error) {
      throw new Error(error)
    }
  }
}
