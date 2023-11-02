import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { FetchNearbyDeliveriesUseCase } from './fetch-nearby-deliveries'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: FetchNearbyDeliveriesUseCase

describe('Fetch nearby deliveries use case', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new FetchNearbyDeliveriesUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to fetch nearby deliveries', async () => {
    const delivery1 = makeDelivery({
      latitude: -28.6554539,
      longitude: -28.6554539,
      courierId: new UniqueEntityID('courier-1'),
    })

    inMemoryDeliveriesRepository.items.push(delivery1)

    const delivery2 = makeDelivery({
      latitude: -27.6554539,
      longitude: -27.6554539,
      courierId: new UniqueEntityID('courier-1'),
    })

    inMemoryDeliveriesRepository.items.push(delivery2)

    const result = await sut.execute({
      latitude: -28.6554539,
      longitude: -28.6554539,
      courierId: 'courier-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value.deliveries).toEqual([
      expect.objectContaining({
        id: delivery1.id,
      }),
    ])
  })
})
