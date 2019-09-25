import { AxiosError } from 'axios'

export default class Error {
  type!: number
  message!: string
  axiosError!: any
  data!: any
  errors!: []

  constructor(error: any) {
    this.axiosError = error
    if (!error.response) {
      return
    } else {
      this.errors = error.response.data.errors
      this.type = error.response.status
    }
  }
}
