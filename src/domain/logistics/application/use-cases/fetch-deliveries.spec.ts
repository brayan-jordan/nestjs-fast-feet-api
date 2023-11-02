import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { FetchDeliveriesUseCase } from './fetch-deliveries'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: FetchDeliveriesUseCase

describe('Fetch deliveries use case', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new FetchDeliveriesUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to fetch deliveries', async () => {
    const delivery1 = makeDelivery()
    const delivery2 = makeDelivery()

    inMemoryDeliveriesRepository.items.push(delivery1)
    inMemoryDeliveriesRepository.items.push(delivery2)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value.deliveries).toHaveLength(2)
  })
})
