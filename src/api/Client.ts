import axios, { Method } from 'axios'

const timeout: number = 30000

export default abstract class Client {
  get cors() {
    return process.env.NODE_ENV !== 'production'
      ? 'https://cors-anywhere.herokuapp.com/'
      : ''
  }

  get headers() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  request(method: Method, uri: string, params: any) {
    const url = `${this.cors}${uri}`
    return axios({ method, headers: this.headers, timeout, url, params })
  }
}
