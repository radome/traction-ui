/*
TODO:
  - implement update and destroy as higher order functions and
    turn into map ( problem with what is returned for multiple, only seem to get first response)
  - implement url for each call as method
*/

import axios from 'axios'

export default {
  name: 'Request',
  props: {
    baseURL: {
      type: String,
      required: true
    },
    apiNamespace: {
      type: String,
      required: true
    },
    resource: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default: () => {
        return {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        }
      }
    },
    filters: {
      type: Object,
      default: () => {
        return { }
      }
    },
    include: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      api:  {},
      loading: false
    }
  },
  computed: {
    rootURL () {
      return `${this.baseURL}/${this.apiNamespace}`
    },
    query () {
      if (Object.keys(this.filters).length === 0 && this.include.length === 0) return ''

      let query = '?'

      if (Object.keys(this.filters).length > 0) {
        query += Object.keys(this.filters).map(key => `filter[${key}]=${this.filters[key]}`).join('&')
      }

      if (this.include.length > 0) {
        if (Object.keys(this.filters).length > 0) {
          query += '&'
        }
        query += `include=${this.include}`
      }

      return query

    }
  },
  methods: {
    async execute(type, ...params) {
      if (this.loading) return
      this.loading = true
      let response
      try {
        response = await this.api[type](...params)
      } catch(resp) {
        response = resp
      }
      this.loading = false
      return response
    },
    get () {
      return this.execute('get', `${this.resource}${this.query}`)
    },
    find (id) {
      return this.execute('get', `${this.resource}/${id}`)
    },
    create (data) {
      return this.execute('post', this.resource, data)
    },
    async update (data) {
      let response = []
      for (let item of (Array.isArray(data) ? data : [data])) {
        response.push(await this.execute('patch', `${this.resource}/${item.data.id}`, item))
      }
      return response
    },
    async destroy (ids) {
      let response = []
      for (let item of (Array.isArray(ids) ? ids : [ids])) {
        response.push(await this.execute('delete', `${this.resource}/${item}`))
      }
      return response
    }
  },
  created () {
    this.api = axios.create({ baseURL: this.rootURL, headers: this.headers })
  }
}
