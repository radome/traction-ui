import { mount, localVue } from '../testHelper'
import flushPromises from 'flush-promises'
import DataModel from '@/api/DataModel'

describe('DataModel', () => {

  let wrapper, dataModel, data, response

  beforeEach(() => {
    wrapper = mount(DataModel, { mocks: localVue, propsData: { resource: 'samples' } })
    dataModel = wrapper.vm
    dataModel.execute = jest.fn()
  })

  describe('post', () => {

    it('returns an appropriate response', () => {
      data = { data: { attributes: { samples: [{ id: 1, name: 'sample1', species: 'dog'}] }}}
      response = {data: {status: 201}}
      dataModel.execute.mockReturnValue(response)
      expect(dataModel.create(data)).toEqual(response)
      expect(dataModel.execute).toBeCalledWith('post', dataModel.endpoint, data)
    })

  })

  describe('patch', () => {

    it('returns an appropriate response', () => {
      data = { data: { attributes: { requests: [{ id: 1, name: 'sample1', species: 'dog'}] }}}
      response = {status: 200}
      dataModel.execute.mockReturnValue(response)
      expect(dataModel.update(data)).toEqual(response)
      expect(dataModel.execute).toBeCalledWith('patch', dataModel.endpoint, data)
    })

  })

  describe('find', () => {

    it('returns an appropriate response', () => {
      let id = 123
      response = {status: 200}
      dataModel.execute.mockReturnValue(response)
      expect(dataModel.find(id)).toEqual(response)
      expect(dataModel.execute).toBeCalledWith('get', `${dataModel.endpoint}/${id}`)
    })

  })

  describe('destroy', () => {

    it('returns an appropriate response', () => {
      let id = 123
      response = {status: 200}
      dataModel.execute.mockReturnValue(response)
      expect(dataModel.destroy(id)).toEqual(response)
      expect(dataModel.execute).toBeCalledWith('delete', `${dataModel.endpoint}/${id}`)
    })

  })

})