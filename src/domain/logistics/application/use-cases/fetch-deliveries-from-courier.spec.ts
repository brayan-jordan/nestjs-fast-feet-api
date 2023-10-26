import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { FetchDeliveriesFromCourierUseCase } from './fetch-deliveries-from-courier'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: FetchDeliveriesFromCourierUseCase

describe('Fetch deliveries from courier use case', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new FetchDeliveriesFromCourierUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to fetch deliveries from courier', async () => {
    const courierId1 = new UniqueEntityID()
    const courierId2 = new UniqueEntityID()

    const delivery1 = makeDelivery({
      courierId: courierId1,
    })

    inMemoryDeliveriesRepository.items.push(delivery1)

    const delivery2 = makeDelivery({
      courierId: courierId2,
    })

    inMemoryDeliveriesRepository.items.push(delivery2)

    const result = await sut.execute({
      courierId: courierId1.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value.deliveries).toEqual([
      expect.objectContaining({
        id: delivery1.id,
      }),
    ])
  })
})
