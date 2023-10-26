import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { DeleteDeliveryUseCase } from './delete-delivery'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: DeleteDeliveryUseCase

describe('Delete delivery use case', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new DeleteDeliveryUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to delete a delivery', async () => {
    const delivery = makeDelivery()

    inMemoryDeliveriesRepository.items.push(delivery)

    const result = await sut.execute({
      deliveryId: delivery.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliveriesRepository.items).toHaveLength(0)
  })
})
