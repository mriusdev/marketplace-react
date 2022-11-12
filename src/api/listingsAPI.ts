import { api } from "."

export default {
  getAll() {
    return api.get('/listings')
  }
}