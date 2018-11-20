import SampleTable from '@/components/SampleTable'
import { mount } from '@vue/test-utils'
import Samples from '../data/samples.json'

describe('SampleTable.vue', () => {

  let cmp, sampleTable, samples

  beforeEach(() => {
    samples = Samples.requests
    cmp = mount(SampleTable, { propsData: { samples: samples }})
    sampleTable = cmp.vm
  })

  it('will have a name', () => {
    expect(cmp.name()).toEqual('SampleTable')
  })

  it('will have some samples', () => {
    expect(sampleTable.samples.length).toEqual(samples.length)
  })

  it('will have a table', () => {
    expect(cmp.contains('table')).toBe(true)
  })

  it('will have a table with sample rows', () => {
    expect(sampleTable.$el.querySelector('table').querySelectorAll('tr').length).toEqual(5)
  })

  it('will have a table the correct data', () => {
    expect(sampleTable.$el.querySelector('table').querySelectorAll('tr')[0].querySelectorAll('td')[0].textContent).toEqual(samples[0].id.toString())
    expect(sampleTable.$el.querySelector('table').querySelectorAll('tr')[0].querySelectorAll('td')[1].textContent).toEqual(samples[0].name)
  })

})