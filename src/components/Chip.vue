<template>
  <b-container class="chip">
    <b-form-input id="barcode" v-model="localBarcode" type="text" placeholder="Chip barcode" @change="updateChip" />
    <flowcell v-for="(flowcell, index) in flowcells" v-bind="flowcell" v-bind:key="index" @alert="alert"></flowcell>
  </b-container>
</template>

<script>

import Flowcell from '@/components/Flowcell'
import Api from '@/mixins/Api'
import handlePromise from '@/api/PromiseHelper'

export default {
  name: 'Chip',
  mixins: [Api],
  props: {
    id: {
      type: [Number, String]
    },
    barcode: {
      type: String
    },
    flowcells: {
      type: Array,
      default: () => {
        return [ {}, {} ]
      }
    }
  },
  data () {
    return {
      localBarcode: this.barcode,
      message: ''
    }
  },
  methods: {
    async updateChip () {
      let promise = this.chipRequest.update(this.payload)
      let response = await handlePromise(promise[0])

      if (response.successful) {
        this.alert('Chip updated')
      } else {
        this.alert('There was an error: ' + response.errors.message)
      }
    },
    alert (message) {
      this.$emit('alert', message)
    },
  },
  computed: {
    chipRequest () {
      return this.api.traction.chips
    },
    payload () {
      return {
        data: {
          id: this.id,
          type: 'chips',
          attributes: {
            barcode: this.localBarcode
          }
        }
      }
    }
  },
  components: {
    Flowcell
  }

}
</script>
